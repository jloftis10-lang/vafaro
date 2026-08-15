import { describe, expect, it } from "vitest";

import { calculateValuation } from "@/lib/valuation";
import type { ValuationInputs } from "@/lib/types";

const baseInputs: ValuationInputs = {
  industryId: "hvac-mechanical",
  revenue: 3_000_000,
  metricType: "ebitda",
  metricValue: 500_000,
  trend: "flat",
  ownerInvolvement: "owner_part_time",
  customerConcentration: "under_10",
  recurringRevenuePct: "under_30",
};

const strongInputs: ValuationInputs = {
  ...baseInputs,
  trend: "growing_10_plus",
  ownerInvolvement: "runs_without_owner",
  customerConcentration: "under_10",
  recurringRevenuePct: "majority_30_plus",
};

const weakInputs: ValuationInputs = {
  ...baseInputs,
  trend: "declining",
  ownerInvolvement: "owner_essential",
  customerConcentration: "over_25",
  recurringRevenuePct: "none",
};

describe("calculateValuation — benchmark-driven range selection", () => {
  it("anchors the range to the selected benchmark's own low/high multiple, not a hardcoded constant", () => {
    const hvac = calculateValuation(baseInputs);
    const accounting = calculateValuation({ ...baseInputs, industryId: "accounting-firms" });

    // HVAC and accounting have deliberately different EBITDA profiles in
    // valuation-assumptions.ts (5.0-7.5x vs 3.5-5.5x) — different
    // industries must produce different benchmark-anchored ranges.
    expect(hvac.benchmarkLow).not.toBe(accounting.benchmarkLow);
    expect(hvac.benchmarkHigh).not.toBe(accounting.benchmarkHigh);
    expect(hvac.benchmarkLow).toBe(5.0);
    expect(hvac.benchmarkHigh).toBe(7.5);
  });

  it("records which benchmark(s) determined the range on the result, for audit", () => {
    const result = calculateValuation(baseInputs);
    expect(result.benchmarkIdsUsed.length).toBeGreaterThan(0);
    expect(result.benchmarkIdsUsed[0]).toContain("hvac-mechanical");
  });

  it("an SDE query never produces an EBITDA-scale multiple range (metric never mixed)", () => {
    const sdeResult = calculateValuation({ ...baseInputs, metricType: "sde", metricValue: 250_000 });
    const ebitdaResult = calculateValuation(baseInputs);
    // hvac SDE profile is 2.75-3.75x vs EBITDA 5.0-7.5x — SDE range must
    // stay in its own metric's scale, not drift into EBITDA territory.
    expect(sdeResult.benchmarkHigh).toBeLessThan(ebitdaResult.benchmarkLow);
  });
});

describe("calculateValuation — quality positioning replaces additive adjustments", () => {
  it("positions a stronger company higher within the benchmark range than a weaker one", () => {
    const strong = calculateValuation(strongInputs);
    const weak = calculateValuation(weakInputs);

    expect(strong.qualityPositionFraction).toBeGreaterThan(weak.qualityPositionFraction);
    expect(strong.multipleLow).toBeGreaterThan(weak.multipleLow);
    expect(strong.qualityPositionLabel).toBe("upper");
    expect(weak.qualityPositionLabel).toBe("lower");
  });

  it("surfaces deterministic positive/negative factor labels matching the position", () => {
    const strong = calculateValuation(strongInputs);
    const weak = calculateValuation(weakInputs);

    expect(strong.positiveFactors.length).toBeGreaterThan(0);
    expect(strong.negativeFactors).toHaveLength(0);
    expect(weak.negativeFactors.length).toBeGreaterThan(0);
    expect(weak.positiveFactors).toHaveLength(0);
  });

  it("never pushes the range far outside the benchmark's own bounds — quality moves position within the range, not an unbounded shift", () => {
    const strong = calculateValuation(strongInputs);
    const weak = calculateValuation(weakInputs);

    // Clamp padding is 0.5x on each side of the benchmark's own low/high.
    expect(strong.multipleHigh).toBeLessThanOrEqual(strong.benchmarkHigh + 0.5);
    expect(weak.multipleLow).toBeGreaterThanOrEqual(weak.benchmarkLow - 0.5);
  });

  it("a neutral/flat input profile lands in the middle of the range, not skewed by default", () => {
    const neutral = calculateValuation({
      ...baseInputs,
      trend: "flat",
      ownerInvolvement: "owner_part_time",
      recurringRevenuePct: "under_30",
    });
    expect(neutral.qualityPositionFraction).toBeGreaterThan(0.3);
    expect(neutral.qualityPositionFraction).toBeLessThan(0.8);
  });
});

describe("calculateValuation — context-only benchmarks never alter the number", () => {
  it("a small HVAC business's range never reaches the GF Data PE-platform dataset's 10.0x high (context-only, never allowed to anchor or widen)", () => {
    const result = calculateValuation(baseInputs);
    expect(result.multipleHigh).toBeLessThan(10.0);
    expect(result.benchmarkIdsUsed).not.toContain("gf-data-h1-2025-ebitda-10m-500m");
  });
});

describe("calculateValuation — fallback hierarchy for unrecognized industries", () => {
  it("falls back to the broad-market benchmark for the 'other' industry, with lower confidence and an honest fallbackLevel", () => {
    const industrySpecific = calculateValuation(baseInputs);
    const fallback = calculateValuation({ ...baseInputs, industryId: "other" });

    expect(fallback.isIndustrySpecific).toBe(false);
    expect(fallback.fallbackLevel).toBe("broad-market");
    expect(industrySpecific.isIndustrySpecific).toBe(true);
    expect(industrySpecific.fallbackLevel).toBe("industry-specific");
    // Broad-market fallback has no industry-specific evidence behind it, so
    // confidence must never read "higher" the way a matched benchmark could.
    expect(fallback.estimateConfidence.level).toBe("limited");
  });

  it("fails clearly (not silently) for an industry id absent from the taxonomy entirely", () => {
    expect(() => calculateValuation({ ...baseInputs, industryId: "not-a-real-industry" })).toThrow(
      /Unknown industry id/,
    );
  });
});

describe("calculateValuation — Estimate Confidence reflects evidence, not company quality", () => {
  it("a poorly-run company in a well-evidenced industry gets the same confidence level as a strong one", () => {
    const strong = calculateValuation(strongInputs);
    const weak = calculateValuation(weakInputs);
    expect(strong.estimateConfidence.level).toBe(weak.estimateConfidence.level);
  });
});
