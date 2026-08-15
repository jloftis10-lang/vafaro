import type { AssessmentAnswers, CTAResult, ReadinessResult } from "@/lib/assessment/types";

/**
 * Set NEXT_PUBLIC_BOOKING_URL to your actual scheduling link once it
 * exists. Falls back to the email-capture anchor on the same page so the
 * button always does something sensible in the meantime.
 */
const EMAIL_ANCHOR = "#assessment-email-report";

function bookingHref(): string {
  return process.env.NEXT_PUBLIC_BOOKING_URL || EMAIL_ANCHOR;
}

/**
 * Three tiers, per spec:
 *  - strong + near-term timeline -> direct booking CTA
 *  - everything else with real upside -> "get my exit prep plan"
 *  - early-stage AND no urgency -> softest, no-pressure framing
 * Deliberately keyed off readiness + timeline only (not the internal lead
 * score) — this logic drives user-facing copy, and should stay auditable
 * against the same two signals a reviewer can see on the results page.
 */
export function determineCTA(readiness: ReadinessResult, answers: AssessmentAnswers): CTAResult {
  const isNearTerm = answers.saleTimeline === "now" || answers.saleTimeline === "within_12_months";
  const isEarlyStage = readiness.band === "Early-Stage Readiness";

  if (isNearTerm && readiness.totalScore >= 70) {
    return {
      headline: "Your business may be ready for market.",
      subhead:
        "Your results suggest it may be worth having a confidential conversation about buyer appetite, positioning, and potential next steps.",
      buttonLabel: "Schedule a Confidential Conversation",
      buttonHref: bookingHref(),
    };
  }

  if (isEarlyStage && !isNearTerm) {
    return {
      headline: "Keep this assessment for when you're ready.",
      subhead:
        "There's no immediate pressure to act. Save your results and revisit this assessment as your plans take shape.",
      buttonLabel: "Email Me These Results",
      buttonHref: EMAIL_ANCHOR,
    };
  }

  return {
    headline: "You have time to strengthen your position.",
    subhead:
      "Based on your results, focusing on the actions below over the next year or two could meaningfully improve both your value and your readiness.",
    buttonLabel: "Get My Exit Preparation Plan",
    buttonHref: EMAIL_ANCHOR,
  };
}
