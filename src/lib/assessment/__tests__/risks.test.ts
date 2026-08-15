import { describe, expect, it } from "vitest";

import { evaluateRiskFlags } from "@/lib/assessment/risks";
import {
  decliningAnswers,
  highCustomerConcentrationAnswers,
  ownerDependentAnswers,
  poorFinancialRecordsAnswers,
  strongAnswers,
} from "@/lib/assessment/__tests__/fixtures";

function ids(flags: ReturnType<typeof evaluateRiskFlags>): string[] {
  return flags.map((f) => f.id);
}

describe("evaluateRiskFlags", () => {
  it("flags nothing critical or important for an extremely strong company", () => {
    const flags = evaluateRiskFlags(strongAnswers);
    expect(flags.filter((f) => f.severity === "critical")).toHaveLength(0);
    expect(flags.filter((f) => f.severity === "important")).toHaveLength(0);
  });

  it("flags extreme owner dependency as critical for a highly owner-dependent company", () => {
    const flags = evaluateRiskFlags(ownerDependentAnswers);
    expect(ids(flags)).toContain("extreme-owner-dependency");
    expect(ids(flags)).toContain("owner-essential-to-operate");
    expect(ids(flags)).toContain("owner-owns-key-relationships");
    expect(flags.find((f) => f.id === "extreme-owner-dependency")?.severity).toBe("critical");
  });

  it("flags severe customer concentration as critical above 50%", () => {
    const flags = evaluateRiskFlags(highCustomerConcentrationAnswers);
    const flag = flags.find((f) => f.id === "customer-concentration-critical");
    expect(flag).toBeDefined();
    expect(flag?.severity).toBe("critical");
    expect(flag?.explanation).toContain("no contract");
  });

  it("flags 20-50% concentration as important, not critical", () => {
    const flags = evaluateRiskFlags({ ...strongAnswers, largestCustomerPct: "between_30_50" });
    expect(ids(flags)).toContain("customer-concentration-important");
    expect(ids(flags)).not.toContain("customer-concentration-critical");
  });

  it("flags stale, poorly documented financials as critical", () => {
    const flags = evaluateRiskFlags(poorFinancialRecordsAnswers);
    expect(ids(flags)).toContain("stale-and-weak-financials");
    expect(ids(flags)).toContain("no-usable-financial-history");
  });

  it("flags declining revenue and profitability together in one flag", () => {
    const flags = evaluateRiskFlags(decliningAnswers);
    const declining = flags.filter((f) => f.id === "declining-trend");
    expect(declining).toHaveLength(1);
    expect(declining[0].explanation).toContain("revenue and profitability");
  });

  it("every flag has non-empty required fields", () => {
    const flags = evaluateRiskFlags(ownerDependentAnswers);
    expect(flags.length).toBeGreaterThan(0);
    for (const flag of flags) {
      expect(flag.title.length).toBeGreaterThan(0);
      expect(flag.explanation.length).toBeGreaterThan(0);
      expect(flag.whyBuyersCare.length).toBeGreaterThan(0);
      expect(flag.recommendedAction.length).toBeGreaterThan(0);
    }
  });

  it("does not crash and surfaces the visibility opportunity flag when optional fields are missing", () => {
    const { top5CustomersPct, ...rest } = strongAnswers;
    void top5CustomersPct;
    const flags = evaluateRiskFlags(rest);
    expect(ids(flags)).toContain("limited-revenue-visibility");
  });

  describe("industry module (Phase E)", () => {
    it("flags an accounting firm as critical when the owner is the only licensed CPA and produces most billings", () => {
      const flags = evaluateRiskFlags({
        ...strongAnswers,
        industryId: "accounting-firms",
        staffCpaDepth: "owner_only_licensed",
        ownerProducedRevenuePct: "over_75",
      });
      expect(ids(flags)).toContain("sole-licensed-cpa");
      expect(ids(flags)).toContain("owner-produced-revenue-concentration");
      expect(flags.find((f) => f.id === "sole-licensed-cpa")?.severity).toBe("critical");
    });

    it("never fires an industry-module rule for an industry it doesn't apply to, even with a matching-looking answer", () => {
      // hvac-mechanical has no staffCpaDepth question at all in practice, but
      // even if a stray value were present, the rule must stay scoped to
      // accounting-firms specifically — the applies() check is industryId-gated,
      // not just field-presence-gated.
      const flags = evaluateRiskFlags({
        ...strongAnswers,
        industryId: "hvac-mechanical",
        staffCpaDepth: "owner_only_licensed",
      } as typeof strongAnswers);
      expect(ids(flags)).not.toContain("sole-licensed-cpa");
    });

    it("flags HVAC-specific risks only for hvac-mechanical, and doesn't crash for an unrelated industry", () => {
      const hvacFlags = evaluateRiskFlags({
        ...strongAnswers,
        industryId: "hvac-mechanical",
        maintenanceAgreementRevenuePct: "none",
        licenseHolderBeyondOwner: "no",
      });
      expect(ids(hvacFlags)).toContain("no-maintenance-agreement-revenue");
      expect(ids(hvacFlags)).toContain("sole-license-holder-hvac");

      expect(() =>
        evaluateRiskFlags({ ...strongAnswers, industryId: "not-a-real-industry" }),
      ).not.toThrow();
      const unknownFlags = evaluateRiskFlags({ ...strongAnswers, industryId: "not-a-real-industry" });
      expect(ids(unknownFlags).some((id) => id.includes("hvac") || id === "no-maintenance-agreement-revenue")).toBe(
        false,
      );
    });

    it("flags manufacturing and distribution risks only when their industry-specific answers are concerning", () => {
      const manufacturingFlags = evaluateRiskFlags({
        ...strongAnswers,
        industryId: "specialty-manufacturing",
        backlogMonths: "less_than_1",
        endMarketConcentration: "single_end_market",
      });
      expect(ids(manufacturingFlags)).toContain("limited-manufacturing-backlog");
      expect(ids(manufacturingFlags)).toContain("single-end-market-concentration");

      const distributionFlags = evaluateRiskFlags({
        ...strongAnswers,
        industryId: "specialty-distribution",
        largestSupplierPct: "over_60",
      });
      expect(ids(distributionFlags)).toContain("heavy-supplier-concentration");
    });
  });
});
