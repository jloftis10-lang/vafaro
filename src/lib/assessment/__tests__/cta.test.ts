import { describe, expect, it } from "vitest";

import { determineCTA } from "@/lib/assessment/cta";
import { calculateReadiness } from "@/lib/assessment/readiness";
import { strongAnswers, veryWeakAnswers } from "@/lib/assessment/__tests__/fixtures";

describe("determineCTA", () => {
  it("shows the booking CTA for a strong, ready-now business", () => {
    const answers = { ...strongAnswers, saleTimeline: "now" as const };
    const cta = determineCTA(calculateReadiness(answers), answers);
    expect(cta.buttonLabel).toBe("Schedule a Confidential Conversation");
  });

  it("does not show the booking CTA for a strong business that's 3-5 years out", () => {
    const answers = { ...strongAnswers, saleTimeline: "three_to_five_years" as const };
    const cta = determineCTA(calculateReadiness(answers), answers);
    expect(cta.buttonLabel).not.toBe("Schedule a Confidential Conversation");
    expect(cta.buttonLabel).toBe("Get My Exit Preparation Plan");
  });

  it("uses soft, no-pressure language for an early-stage business with no urgency", () => {
    const answers = { ...veryWeakAnswers, saleTimeline: "no_specific_timeline" as const };
    const cta = determineCTA(calculateReadiness(answers), answers);
    expect(cta.buttonLabel).toBe("Email Me These Results");
    expect(cta.buttonLabel).not.toBe("Schedule a Confidential Conversation");
  });

  it("never shows the booking CTA for an early-stage business, even if they say they're ready now", () => {
    const answers = { ...veryWeakAnswers, saleTimeline: "now" as const };
    const cta = determineCTA(calculateReadiness(answers), answers);
    expect(cta.buttonLabel).not.toBe("Schedule a Confidential Conversation");
  });
});
