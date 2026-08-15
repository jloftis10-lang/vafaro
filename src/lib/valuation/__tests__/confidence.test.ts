import { describe, expect, it } from "vitest";

import { calculateEstimateConfidence } from "@/lib/valuation/confidence";

describe("calculateEstimateConfidence", () => {
  it("returns 'moderate' (never 'higher') for a named industry, since no A/B allowed benchmark exists yet", () => {
    const result = calculateEstimateConfidence("hvac-mechanical", "EBITDA", 3_000_000);
    expect(result.level).toBe("moderate");
    expect(result.level).not.toBe("higher");
    expect(result.benchmarkIds.length).toBeGreaterThan(0);
  });

  it("returns 'limited' for 'other' (no industry-specific benchmark at all)", () => {
    const result = calculateEstimateConfidence("other", "EBITDA", 2_000_000);
    expect(result.level).toBe("limited");
  });

  it("returns 'limited' for a company size large enough that only the context-only broad-market record would apply", () => {
    // Even at $150M EV where the GF Data record's applicability is "high",
    // confidence must not become "higher" — that record's calculatorUsage
    // is "context-only", and confidence only counts allowed/supporting
    // records. This is the core "evidence quality != applicability != usage
    // permission" guarantee from the master prompt.
    const result = calculateEstimateConfidence("not-a-real-industry", "EBITDA", 150_000_000);
    expect(result.level).toBe("limited");
  });

  it("never derives confidence from business quality — same industry/metric/size always yields the same confidence regardless of caller", () => {
    const a = calculateEstimateConfidence("hvac-mechanical", "SDE", 500_000);
    const b = calculateEstimateConfidence("hvac-mechanical", "SDE", 500_000);
    expect(a.level).toBe(b.level);
    expect(a.benchmarkIds).toEqual(b.benchmarkIds);
  });

  it("explanation is honest that a OwnerGauge-inference-only match isn't verified institutional evidence", () => {
    const result = calculateEstimateConfidence("hvac-mechanical", "EBITDA", 3_000_000);
    // Should disclaim institutional-grade evidence, not claim it — the
    // "higher" tier's explanation (which this must not match) is the one
    // that would claim strong, directly relevant market evidence.
    expect(result.explanation.toLowerCase()).toContain("rather than a verified institutional");
    expect(result.explanation.toLowerCase()).toContain("ownergauge");
  });
});
