import { describe, expect, it } from "vitest";

import { rankRecommendations } from "@/lib/assessment/recommendations";
import { evaluateRiskFlags } from "@/lib/assessment/risks";
import { ownerDependentAnswers, poorFinancialRecordsAnswers, strongAnswers } from "@/lib/assessment/__tests__/fixtures";

describe("rankRecommendations", () => {
  it("returns at most 3 recommendations, ranked 1-3", () => {
    const flags = evaluateRiskFlags(poorFinancialRecordsAnswers);
    const recs = rankRecommendations(flags);
    expect(recs.length).toBeLessThanOrEqual(3);
    expect(recs.map((r) => r.rank)).toEqual(recs.map((_, i) => i + 1));
  });

  it("ranks every critical flag ahead of every important flag, ahead of every opportunity flag", () => {
    const flags = evaluateRiskFlags(ownerDependentAnswers);
    const recs = rankRecommendations(flags);
    const severityOf = (id: string) => flags.find((f) => f.id === id.replace(/^rec-/, ""))!.severity;

    const severities = recs.map((r) => severityOf(r.sourceRiskId!));
    const rank = { critical: 0, important: 1, opportunity: 2 } as const;
    for (let i = 1; i < severities.length; i++) {
      expect(rank[severities[i]]).toBeGreaterThanOrEqual(rank[severities[i - 1]]);
    }
  });

  it("returns an empty list when there are no risk flags", () => {
    expect(rankRecommendations(evaluateRiskFlags(strongAnswers).filter((f) => f.severity !== "opportunity"))).toEqual(
      [],
    );
  });

  it("gives every recommendation a specific, non-generic detail (not just a category name)", () => {
    const flags = evaluateRiskFlags(ownerDependentAnswers);
    const recs = rankRecommendations(flags);
    for (const rec of recs) {
      expect(rec.detail.split(" ").length).toBeGreaterThan(5);
    }
  });
});
