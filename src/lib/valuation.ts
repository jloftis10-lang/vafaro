import { getIndustryById } from "@/lib/data/industries";
import { selectBenchmarks, type BenchmarkMetric, type SelectedBenchmark } from "@/lib/data/valuation-benchmarks";
import type { ValuationInputs, ValuationResult } from "@/lib/types";
import { calculateEstimateConfidence } from "@/lib/valuation/confidence";
import { getMarketSegment } from "@/lib/valuation/market-segment";
import { computeQualityPosition, type QualityPosition } from "@/lib/valuation/quality-position";

/** Final displayed range = the quality-positioned multiple ± this spread. */
const VALUATION_MULTIPLE_SPREAD = 0.4;

/** The displayed range is clamped to the benchmark range widened by this much on each side. */
const CLAMP_PADDING = 0.5;

function roundDirectionalValue(value: number): number {
  const increment = value < 1_000_000 ? 10_000 : value < 10_000_000 ? 50_000 : 100_000;
  return Math.round(value / increment) * increment;
}

function pickPrimaryBenchmark(matches: SelectedBenchmark[]): SelectedBenchmark | undefined {
  return matches.find(
    (m) => m.benchmark.calculatorUsage === "allowed" && m.benchmark.lowMultiple !== undefined && m.benchmark.highMultiple !== undefined,
  );
}

/**
 * "supporting" benchmarks may widen the primary range (master prompt section
 * 15) but never anchor it alone; "context-only" and "prohibited" records
 * (e.g. the GF Data PE-platform dataset) never touch the number, no matter
 * how strong their evidence quality — that enforcement lives here, not in
 * developer discipline.
 */
function widenWithSupporting(
  low: number,
  high: number,
  matches: SelectedBenchmark[],
): { low: number; high: number; supportingIds: string[] } {
  const supporting = matches.filter(
    (m) => m.benchmark.calculatorUsage === "supporting" && m.applicability !== "low",
  );
  let widenedLow = low;
  let widenedHigh = high;
  const supportingIds: string[] = [];
  for (const match of supporting) {
    if (match.benchmark.lowMultiple !== undefined) widenedLow = Math.min(widenedLow, match.benchmark.lowMultiple);
    if (match.benchmark.highMultiple !== undefined) widenedHigh = Math.max(widenedHigh, match.benchmark.highMultiple);
    supportingIds.push(match.benchmark.id);
  }
  return { low: widenedLow, high: widenedHigh, supportingIds };
}

/**
 * Pure calculation — no I/O, no AI. Given a completed set of form inputs,
 * returns the multiple math and a templated explanation of the result.
 * Safe to call from both client and server code.
 *
 * Mechanism (master prompt sections 2-3, 18-19): selects the applicable
 * market benchmark(s) for the industry+metric via selectBenchmarks(), then
 * positions the company within that benchmark's supported multiple range
 * using computeQualityPosition() — replacing the prior approach of
 * shifting a fixed industry midpoint by arbitrary additive amounts. The
 * benchmark-selection architecture now determines the valuation range
 * itself, not just confidence/metadata alongside it.
 */
export function calculateValuation(inputs: ValuationInputs): ValuationResult {
  const industry = getIndustryById(inputs.industryId);
  if (!industry) {
    throw new Error(`Unknown industry id: ${inputs.industryId}`);
  }

  const metric: BenchmarkMetric = inputs.metricType === "sde" ? "SDE" : "EBITDA";

  const matches = selectBenchmarks({ industryId: inputs.industryId, metric });
  const primary = pickPrimaryBenchmark(matches);
  if (!primary) {
    throw new Error(`No usable (calculatorUsage: "allowed") benchmark for industry ${inputs.industryId} / ${metric}`);
  }

  const { low: benchmarkLow, high: benchmarkHigh, supportingIds } = widenWithSupporting(
    primary.benchmark.lowMultiple!,
    primary.benchmark.highMultiple!,
    matches,
  );

  const qualityPosition = computeQualityPosition(inputs);
  const positionedMultiple = benchmarkLow + qualityPosition.fraction * (benchmarkHigh - benchmarkLow);

  const clampLow = benchmarkLow - CLAMP_PADDING;
  const clampHigh = benchmarkHigh + CLAMP_PADDING;
  const multipleLow = Math.max(positionedMultiple - VALUATION_MULTIPLE_SPREAD, clampLow);
  const multipleHigh = Math.min(positionedMultiple + VALUATION_MULTIPLE_SPREAD, clampHigh);

  const valuationLow = roundDirectionalValue(Math.max(inputs.metricValue * multipleLow, 0));
  const valuationHigh = roundDirectionalValue(Math.max(inputs.metricValue * multipleHigh, 0));
  const estimatedEnterpriseValue = (valuationLow + valuationHigh) / 2;

  const isIndustrySpecific = primary.benchmark.industry === inputs.industryId;

  return {
    industryLabel: industry.label,
    isIndustrySpecific,
    fallbackLevel: isIndustrySpecific ? "industry-specific" : "broad-market",
    assumptionBasis: primary.benchmark.notes[0] ?? `Directional ${metric} planning range.`,
    benchmarkLow,
    benchmarkHigh,
    benchmarkIdsUsed: [primary.benchmark.id, ...supportingIds],
    qualityPositionFraction: Math.round(qualityPosition.fraction * 100) / 100,
    qualityPositionLabel: qualityPosition.label,
    positiveFactors: qualityPosition.positiveFactors,
    negativeFactors: qualityPosition.negativeFactors,
    multipleLow,
    multipleHigh,
    valuationLow,
    valuationHigh,
    commentary: generateCommentary(inputs, industry.label, qualityPosition, isIndustrySpecific),
    marketSegment: getMarketSegment(inputs.revenue),
    estimateConfidence: calculateEstimateConfidence(inputs.industryId, metric, estimatedEnterpriseValue),
  };
}

const POSITION_SENTENCE: Record<QualityPosition["label"], string> = {
  upper: "Your business falls toward the upper part of that range.",
  middle: "Your business falls in the middle of that range.",
  lower: "Your business falls toward the lower part of that range.",
};

function generateCommentary(
  inputs: ValuationInputs,
  industryLabel: string,
  quality: QualityPosition,
  isIndustrySpecific: boolean,
): string {
  const metricLabel = inputs.metricType === "sde" ? "SDE" : "EBITDA";
  const basis = isIndustrySpecific
    ? `This range starts from the market evidence OwnerGauge has for ${industryLabel} businesses, applied to your reported ${metricLabel}.`
    : `This directional range uses a broad ${metricLabel} planning benchmark applied to your reported earnings. It is not an industry-specific transaction benchmark for ${industryLabel}.`;

  return `${basis} ${POSITION_SENTENCE[quality.label]}`;
}
