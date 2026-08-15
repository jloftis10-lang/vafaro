import { selectBenchmarks, type BenchmarkMetric, type SelectedBenchmark } from "@/lib/data/valuation-benchmarks";

export type EstimateConfidenceLevel = "higher" | "moderate" | "limited";

export interface EstimateConfidence {
  level: EstimateConfidenceLevel;
  explanation: string;
  /** Ids of the benchmarks that determined this confidence level — audit trail, not shown in the UI. */
  benchmarkIds: string[];
}

/**
 * Confidence means confidence in market-data applicability, not confidence
 * that this is a great company — a poorly-prepared business can still get
 * a "Higher" confidence range if the comparable-market evidence is strong,
 * and a well-run business in an under-researched industry gets "Limited"
 * regardless of how good the business itself is. Never computed from
 * Deal Readiness or any business-quality signal.
 */
export function calculateEstimateConfidence(
  industryId: string,
  metric: BenchmarkMetric,
  enterpriseValue?: number,
): EstimateConfidence {
  const matches = selectBenchmarks({ industryId, metric, enterpriseValue });
  const usable = matches.filter((m) => m.benchmark.calculatorUsage === "allowed" || m.benchmark.calculatorUsage === "supporting");

  const isHighQuality = (m: SelectedBenchmark) =>
    (m.benchmark.evidenceQuality === "A" || m.benchmark.evidenceQuality === "B") && m.applicability === "high";

  const industrySpecific = usable.filter((m) => m.benchmark.industry === industryId);
  const highQualityMatch = industrySpecific.find(isHighQuality);

  if (highQualityMatch) {
    return {
      level: "higher",
      explanation:
        "Strong, directly relevant private-market transaction evidence exists for businesses with similar characteristics.",
      benchmarkIds: [highQualityMatch.benchmark.id],
    };
  }

  if (industrySpecific.length > 0) {
    return {
      level: "moderate",
      explanation:
        "Directional market evidence exists for this industry, but it's based on OwnerGauge's own research and analysis rather than a verified institutional transaction dataset — treat the range as informed, not certified.",
      benchmarkIds: industrySpecific.map((m) => m.benchmark.id),
    };
  }

  return {
    level: "limited",
    explanation:
      "No industry-specific benchmark is available for this business, so the estimate relies on a broad planning range rather than sector-specific market evidence.",
    benchmarkIds: usable.map((m) => m.benchmark.id),
  };
}
