import { describe, expect, it } from "vitest";

import { selectBenchmarks, VALUATION_BENCHMARKS } from "@/lib/data/valuation-benchmarks";

describe("VALUATION_BENCHMARKS", () => {
  it("every record traces to a real source or is honestly marked ownergauge-inference", () => {
    for (const b of VALUATION_BENCHMARKS) {
      if (b.evidenceType === "ownergauge-inference") {
        expect(b.evidenceQuality).toBe("E");
        expect(b.sourceId).toBeUndefined();
      } else {
        expect(b.sourceId).toBeTruthy();
        expect(b.evidenceQuality).not.toBe("E");
      }
    }
  });

  it("no benchmark is calculatorUsage 'allowed' unless it's at least OwnerGauge-inference grade with a documented basis", () => {
    for (const b of VALUATION_BENCHMARKS.filter((b) => b.calculatorUsage === "allowed")) {
      expect(b.notes.length).toBeGreaterThan(0);
    }
  });
});

describe("selectBenchmarks", () => {
  it("never returns a prohibited benchmark", () => {
    const results = selectBenchmarks({ industryId: "hvac-mechanical", metric: "EBITDA" });
    expect(results.every((r) => r.benchmark.calculatorUsage !== "prohibited")).toBe(true);
  });

  it("an SDE query never returns an EBITDA-only benchmark (metric never mixed)", () => {
    const results = selectBenchmarks({ industryId: "hvac-mechanical", metric: "SDE" });
    expect(results.every((r) => r.benchmark.metric === "SDE")).toBe(true);
    expect(results.some((r) => r.benchmark.industry === "hvac-mechanical")).toBe(true);
  });

  it("ranks the exact industry match ahead of the broad-market ('*') fallback", () => {
    const results = selectBenchmarks({ industryId: "hvac-mechanical", metric: "EBITDA" });
    const industryIndex = results.findIndex((r) => r.benchmark.industry === "hvac-mechanical");
    const broadIndex = results.findIndex((r) => r.benchmark.industry === "*");
    expect(industryIndex).toBeGreaterThanOrEqual(0);
    if (broadIndex >= 0) expect(industryIndex).toBeLessThan(broadIndex);
  });

  it("a $2M EBITDA owner-operated business gets low applicability against the $10M-$500M PE-platform dataset", () => {
    const results = selectBenchmarks({ industryId: "hvac-mechanical", metric: "EBITDA", enterpriseValue: 2_000_000 });
    const gfData = results.find((r) => r.benchmark.id === "gf-data-h1-2025-ebitda-10m-500m")!;
    expect(gfData).toBeDefined();
    expect(gfData.applicability).toBe("low");
    // Low applicability or not, this record's own calculatorUsage is
    // "context-only" — it must never be able to drive the valuation
    // regardless of how a caller mis-scores applicability.
    expect(gfData.benchmark.calculatorUsage).toBe("context-only");
  });

  it("a $150M enterprise value business falls inside the dataset's own EV band (unlike the $2M case) — but usage is still context-only, not allowed", () => {
    const results = selectBenchmarks({ industryId: "hvac-mechanical", metric: "EBITDA", enterpriseValue: 150_000_000 });
    const gfData = results.find((r) => r.benchmark.id === "gf-data-h1-2025-ebitda-10m-500m")!;
    // Within-band applicability uses the record's own declared default
    // ("medium" — PE-platform aggregate data is never "high" applicability
    // for one specific company, even one that's the right size), rather
    // than being auto-upgraded just for falling inside the band.
    expect(gfData.applicability).toBe("medium");
    expect(gfData.benchmark.calculatorUsage).toBe("context-only");
  });

  it("an unknown industry id returns only the broad-market fallback, not a crash", () => {
    expect(() => selectBenchmarks({ industryId: "not-a-real-industry", metric: "EBITDA" })).not.toThrow();
    const results = selectBenchmarks({ industryId: "not-a-real-industry", metric: "EBITDA" });
    expect(results.every((r) => r.benchmark.industry === "*")).toBe(true);
  });
});
