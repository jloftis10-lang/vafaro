import { describe, expect, it } from "vitest";

import { calculateLeadScore } from "@/lib/assessment/lead-score";
import { calculateReadiness } from "@/lib/assessment/readiness";
import { smallExcellentAnswers, strongAnswers } from "@/lib/assessment/__tests__/fixtures";
import type { AssessmentAnswers } from "@/lib/assessment/types";

function score(answers: AssessmentAnswers) {
  return calculateLeadScore(answers, calculateReadiness(answers));
}

describe("calculateLeadScore", () => {
  it("never shows up in the readiness result — it's a fully separate computation", () => {
    const readiness = calculateReadiness(strongAnswers);
    expect(readiness).not.toHaveProperty("score");
    expect(readiness).not.toHaveProperty("classification");
  });

  it("classifies a small business with excellent readiness lower than an A-tier lead", () => {
    const result = score(smallExcellentAnswers);
    expect(result.classification).not.toBe("A");
  });

  it("favors deal size over readiness alone: a large, underprepared business can outscore a small, excellent one", () => {
    const smallExcellent = score(smallExcellentAnswers);

    const largeUnprepared: AssessmentAnswers = {
      ...strongAnswers,
      metricValue: 4_000_000,
      revenue: 20_000_000,
      ownerHoursPerWeek: "over_50",
      ownerAbsenceImpact: "could_not_operate",
      managementDepth: "owner_manages_everything",
      financialStatementQuality: "needs_cleanup",
      recordsCurrency: "more_than_six_months_behind",
    };
    const largeUnpreparedScore = score(largeUnprepared);

    expect(largeUnpreparedScore.score).toBeGreaterThan(smallExcellent.score);
  });

  it("gives a strong business ready now a near-term-friendly timing component", () => {
    const readyNow = score({ ...strongAnswers, saleTimeline: "now" });
    const farOut = score({ ...strongAnswers, saleTimeline: "three_to_five_years" });
    expect(readyNow.components.transactionTiming).toBeGreaterThan(farOut.components.transactionTiming);
    expect(readyNow.score).toBeGreaterThan(farOut.score);
  });

  it("weights components according to the configured split (sums to 100% of the total)", () => {
    const result = score(strongAnswers);
    const {
      financialAttractiveness,
      transactionTiming,
      dealReadiness,
      industryFit,
      growth,
      intent,
    } = result.components;

    const recomputed = Math.round(
      financialAttractiveness * 0.35 +
        transactionTiming * 0.25 +
        dealReadiness * 0.15 +
        industryFit * 0.1 +
        growth * 0.1 +
        intent * 0.05,
    );
    expect(result.score).toBe(recomputed);
  });

  it("every component and the total score stay within 0-100", () => {
    const result = score(strongAnswers);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    for (const value of Object.values(result.components)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });
});
