import { describe, expect, it } from "vitest";

import { renderAssessmentReportEmail } from "@/lib/assessment/email-template";
import { calculateReadiness } from "@/lib/assessment/readiness";
import { rankRecommendations } from "@/lib/assessment/recommendations";
import { evaluateRiskFlags } from "@/lib/assessment/risks";
import { evaluateStrengths } from "@/lib/assessment/strengths";
import { toValuationInputs } from "@/lib/assessment/valuation-adapter";
import { strongAnswers } from "@/lib/assessment/__tests__/fixtures";
import { calculateValuation } from "@/lib/valuation";
import { determineCTA } from "@/lib/assessment/cta";

describe("renderAssessmentReportEmail", () => {
  it("renders without throwing and reflects an industry-specific multiple when one applies", () => {
    const valuation = calculateValuation(toValuationInputs(strongAnswers));
    const readiness = calculateReadiness(strongAnswers);
    const risks = evaluateRiskFlags(strongAnswers);
    const strengths = evaluateStrengths(strongAnswers);
    const recommendations = rankRecommendations(risks);
    const cta = determineCTA(readiness, strongAnswers);

    expect(valuation.isIndustrySpecific).toBe(true);

    const html = renderAssessmentReportEmail({
      answers: strongAnswers,
      valuation,
      readiness,
      strengths,
      risks,
      recommendations,
      cta,
    });

    expect(html).toContain(readiness.summary);
    expect(html).not.toContain("not an industry-specific transaction benchmark");
    expect(html).toContain("Based on approximately");
    expect(html).toContain("Estimate confidence: Moderate");
    expect(html).toContain(valuation.estimateConfidence.explanation);
  });
});
