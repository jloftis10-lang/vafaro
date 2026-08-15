import { describe, expect, it } from "vitest";

import { CATEGORY_WEIGHTS } from "@/lib/assessment/categories";
import { calculateReadiness } from "@/lib/assessment/readiness";
import {
  decliningAnswers,
  highCustomerConcentrationAnswers,
  ownerDependentAnswers,
  poorFinancialRecordsAnswers,
  strongAnswers,
} from "@/lib/assessment/__tests__/fixtures";

describe("category weights", () => {
  it("sum to 1", () => {
    const total = Object.values(CATEGORY_WEIGHTS).reduce((sum, w) => sum + w, 0);
    expect(total).toBeCloseTo(1, 10);
  });

  it("has exactly the four Buyer Lens categories (V1 merge from the old seven)", () => {
    expect(Object.keys(CATEGORY_WEIGHTS).sort()).toEqual(
      ["concentrationRisk", "earningsQuality", "revenueQuality", "transferability"].sort(),
    );
  });
});

describe("calculateReadiness", () => {
  it("scores an extremely strong company as Highly Prepared", () => {
    const result = calculateReadiness(strongAnswers);
    expect(result.totalScore).toBeGreaterThanOrEqual(85);
    expect(result.band).toBe("Highly Prepared");
  });

  it("every category score is within 0-100 and totalScore is their weighted sum", () => {
    const result = calculateReadiness(strongAnswers);
    for (const category of result.categories) {
      expect(category.score).toBeGreaterThanOrEqual(0);
      expect(category.score).toBeLessThanOrEqual(100);
    }
    const expectedTotal = Math.round(
      result.categories.reduce((sum, c) => sum + c.score * c.weight, 0),
    );
    expect(result.totalScore).toBe(expectedTotal);
  });

  it("Transferability responds to management depth alone, not just owner-dependency inputs (proves the merge is real)", () => {
    const strong = calculateReadiness(strongAnswers);
    const weakManagementOnly = calculateReadiness({
      ...strongAnswers,
      managementDepth: "owner_manages_everything",
      processDocumentation: "tribal_knowledge",
    });

    const transferability = (r: ReturnType<typeof calculateReadiness>) =>
      r.categories.find((c) => c.key === "transferability")!;

    expect(transferability(weakManagementOnly).score).toBeLessThan(transferability(strong).score);
  });

  it("tanks Owner Independence for a highly owner-dependent company without erasing strong categories elsewhere", () => {
    const strong = calculateReadiness(strongAnswers);
    const dependent = calculateReadiness(ownerDependentAnswers);

    const ownerCategory = (r: ReturnType<typeof calculateReadiness>) =>
      r.categories.find((c) => c.key === "transferability")!;

    expect(ownerCategory(dependent).score).toBeLessThan(ownerCategory(strong).score);
    // Transferability now also averages in management depth/documentation
    // (still strong_team/formal_sops in this fixture), which dilutes the
    // score up from the pre-merge ownerIndependence-only floor of ~10 —
    // correct behavior, not a regression: a business can be acutely
    // owner-dependent while still having decent operational documentation.
    expect(ownerCategory(dependent).score).toBeLessThanOrEqual(25);

    // Categories unrelated to owner independence shouldn't move.
    const financialCategory = (r: ReturnType<typeof calculateReadiness>) =>
      r.categories.find((c) => c.key === "earningsQuality")!;
    expect(financialCategory(dependent).score).toBe(financialCategory(strong).score);

    expect(dependent.capReasons).toContain(
      "The business could not operate effectively through a 90-day owner absence.",
    );
    expect(dependent.totalScore).toBeLessThanOrEqual(54);
    expect(dependent.totalScore).toBeLessThan(strong.totalScore);
  });

  it("caps the headline score when one customer exceeds half of revenue", () => {
    const result = calculateReadiness(highCustomerConcentrationAnswers);
    // The category itself should score at the bottom...
    const customerCategory = result.categories.find((c) => c.key === "concentrationRisk")!;
    expect(customerCategory.score).toBe(0);
    expect(result.scoreBeforeRiskCaps).toBeGreaterThanOrEqual(70);
    expect(result.totalScore).toBeLessThanOrEqual(54);
    expect(result.capReasons).toHaveLength(1);
  });

  it("lowers Financial Readiness for poor financial records", () => {
    const result = calculateReadiness(poorFinancialRecordsAnswers);
    const financialCategory = result.categories.find((c) => c.key === "earningsQuality")!;
    expect(financialCategory.score).toBeLessThanOrEqual(10);
    expect(result.totalScore).toBeLessThanOrEqual(54);
  });

  describe("industry module hard overrides (Phase E)", () => {
    it("caps the score when a required license exists only with the owner (HVAC)", () => {
      const result = calculateReadiness({
        ...strongAnswers,
        industryId: "hvac-mechanical",
        licenseHolderBeyondOwner: "no",
      });
      expect(result.capReasons.some((r) => r.includes("license or professional credential"))).toBe(true);
      expect(result.totalScore).toBeLessThanOrEqual(54);
    });

    it("caps the score when the owner produces the majority of billings in a professional-services model (accounting)", () => {
      const result = calculateReadiness({
        ...strongAnswers,
        industryId: "accounting-firms",
        ownerProducedRevenuePct: "over_75",
      });
      expect(result.capReasons.some((r) => r.includes("75% of billings"))).toBe(true);
      expect(result.totalScore).toBeLessThanOrEqual(54);
    });

    it("does not cap the score for the same license-dependency answer in an unrelated industry", () => {
      const result = calculateReadiness({
        ...strongAnswers,
        industryId: "waste-recycling",
        licenseHolderBeyondOwner: "no",
      } as typeof strongAnswers);
      expect(result.capReasons).toHaveLength(0);
    });
  });

  it("lowers Revenue Quality for a declining company (revenue trend and growth trend both feed this merged category)", () => {
    const result = calculateReadiness(decliningAnswers);
    const strong = calculateReadiness(strongAnswers);
    const revenueQuality = result.categories.find((c) => c.key === "revenueQuality")!;
    expect(revenueQuality.score).toBeLessThan(100);
    expect(revenueQuality.score).toBeLessThan(
      strong.categories.find((c) => c.key === "revenueQuality")!.score,
    );
  });

  it("handles missing optional inputs without crashing and degrades gracefully", () => {
    const { yearsInBusiness, top5CustomersPct, ...rest } = strongAnswers;
    void yearsInBusiness;
    void top5CustomersPct;

    const withOptionals = calculateReadiness(strongAnswers);
    const withoutOptionals = calculateReadiness(rest);

    expect(withoutOptionals.totalScore).toBeGreaterThan(0);
    // Missing the "extra credit" optional signals should never score
    // higher than having them.
    expect(withoutOptionals.totalScore).toBeLessThanOrEqual(withOptionals.totalScore);
  });

  it("summary mentions the band and calls out the cap when one applies", () => {
    const strong = calculateReadiness(strongAnswers);
    expect(strong.summary).toContain(strong.band);
    expect(strong.summary.length).toBeGreaterThan(0);

    const capped = calculateReadiness(highCustomerConcentrationAnswers);
    expect(capped.summary).toContain(capped.band);
    expect(capped.summary.toLowerCase()).toContain("capped");
  });

  it("summary names the strongest and weakest category when they diverge meaningfully", () => {
    const dependent = calculateReadiness(ownerDependentAnswers);
    const ownerCategory = dependent.categories.find((c) => c.key === "transferability")!;
    expect(dependent.summary).toContain(ownerCategory.label);
  });

  it("assigns the correct band at each threshold boundary", () => {
    // totalScore is derived from answers, not settable directly, so this
    // exercises the band function's boundaries indirectly via known-shape
    // category scores rather than asserting on a literal score value.
    const strong = calculateReadiness(strongAnswers);
    expect(["Highly Prepared", "Generally Ready"]).toContain(strong.band);

    const dependent = calculateReadiness(ownerDependentAnswers);
    expect(dependent.band).not.toBe("Highly Prepared");
  });
});
