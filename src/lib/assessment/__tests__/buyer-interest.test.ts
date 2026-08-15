import { describe, expect, it } from "vitest";

import { buildBuyerInterestNarrative } from "@/lib/assessment/buyer-interest";
import { strongAnswers } from "@/lib/assessment/__tests__/fixtures";

describe("buildBuyerInterestNarrative", () => {
  it("returns null for an industry with no question module", () => {
    const result = buildBuyerInterestNarrative({ ...strongAnswers, industryId: "waste-recycling" });
    expect(result).toBeNull();
  });

  it("returns null for a priority industry when no positive industry signal was answered", () => {
    const result = buildBuyerInterestNarrative({
      ...strongAnswers,
      industryId: "accounting-firms",
      recurringComplianceRevenuePct: undefined,
      staffCpaDepth: undefined,
    });
    expect(result).toBeNull();
  });

  it("builds a sentence from qualifying accounting-firm signals", () => {
    const result = buildBuyerInterestNarrative({
      ...strongAnswers,
      industryId: "accounting-firms",
      recurringComplianceRevenuePct: "over_70",
      staffCpaDepth: "multiple_licensed_staff",
    });
    expect(result).toContain("recurring compliance and advisory revenue");
    expect(result).toContain("bench of licensed staff");
    expect(result).toMatch(/^Your combination of/);
  });

  it("does not crash and returns null for an unrecognized industry id", () => {
    expect(() =>
      buildBuyerInterestNarrative({ ...strongAnswers, industryId: "not-a-real-industry" }),
    ).not.toThrow();
    expect(buildBuyerInterestNarrative({ ...strongAnswers, industryId: "not-a-real-industry" })).toBeNull();
  });
});
