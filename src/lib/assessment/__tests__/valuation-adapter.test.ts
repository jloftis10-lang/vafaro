import { describe, expect, it } from "vitest";

import { toValuationInputs } from "@/lib/assessment/valuation-adapter";
import { strongAnswers } from "@/lib/assessment/__tests__/fixtures";
import type { AssessmentAnswers } from "@/lib/assessment/types";

describe("toValuationInputs", () => {
  it("passes industry, revenue, metric type/value, and recurring revenue through unchanged", () => {
    const inputs = toValuationInputs(strongAnswers);
    expect(inputs.industryId).toBe(strongAnswers.industryId);
    expect(inputs.revenue).toBe(strongAnswers.revenue);
    expect(inputs.metricType).toBe(strongAnswers.metricType);
    expect(inputs.metricValue).toBe(strongAnswers.metricValue);
    expect(inputs.recurringRevenuePct).toBe(strongAnswers.recurringRevenuePct);
  });

  it.each([
    ["declining", "declining"],
    ["flat", "flat"],
    ["growing_1_10", "growing_0_10"],
    ["growing_10_20", "growing_10_plus"],
    ["growing_20_plus", "growing_10_plus"],
  ] as const)("maps revenueGrowth %s to trend %s", (revenueGrowth, expected) => {
    const inputs = toValuationInputs({ ...strongAnswers, revenueGrowth });
    expect(inputs.trend).toBe(expected);
  });

  it.each([
    ["normal_operation", "runs_without_owner"],
    ["minor_disruption", "owner_part_time"],
    ["decisions_wait", "owner_part_time"],
    ["significant_disruption", "owner_essential"],
    ["could_not_operate", "owner_essential"],
  ] as const)("maps ownerAbsenceImpact %s to ownerInvolvement %s", (ownerAbsenceImpact, expected) => {
    const inputs = toValuationInputs({ ...strongAnswers, ownerAbsenceImpact });
    expect(inputs.ownerInvolvement).toBe(expected);
  });

  it.each([
    ["under_10", "under_10"],
    ["between_10_20", "between_10_25"],
    ["between_20_30", "over_25"],
    ["between_30_50", "over_25"],
    ["over_50", "over_25"],
  ] as const)("maps largestCustomerPct %s to customerConcentration %s", (largestCustomerPct, expected) => {
    const inputs = toValuationInputs({ ...strongAnswers, largestCustomerPct });
    expect(inputs.customerConcentration).toBe(expected);
  });

  it("handles every combination without throwing", () => {
    const growths: AssessmentAnswers["revenueGrowth"][] = [
      "growing_20_plus",
      "growing_10_20",
      "growing_1_10",
      "flat",
      "declining",
    ];
    for (const revenueGrowth of growths) {
      expect(() => toValuationInputs({ ...strongAnswers, revenueGrowth })).not.toThrow();
    }
  });
});
