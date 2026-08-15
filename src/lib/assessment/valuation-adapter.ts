import type {
  CustomerConcentrationOption,
  OwnerInvolvementOption,
  TrendOption,
  ValuationInputs,
} from "@/lib/types";
import type { AssessmentAnswers } from "@/lib/assessment/types";

/**
 * Bridges the new, richer 5-step assessment answers down to the legacy
 * ValuationInputs shape the existing (untouched) calculateValuation() in
 * src/lib/valuation.ts expects. The valuation engine's multiple math is
 * preserved as-is; this adapter just collapses the assessment's finer-grained
 * answers into the 3–4 bucket enums that engine was built around.
 *
 * The richer, un-collapsed answers (e.g. the full 5-bucket customer
 * concentration) still flow into the Deal Readiness / risk-flag engines,
 * which need that extra granularity and are not constrained by this mapping.
 */
export function toValuationInputs(answers: AssessmentAnswers): ValuationInputs {
  return {
    industryId: answers.industryId,
    revenue: answers.revenue,
    metricType: answers.metricType,
    metricValue: answers.metricValue,
    trend: mapTrend(answers.revenueGrowth),
    ownerInvolvement: mapOwnerInvolvement(answers.ownerAbsenceImpact),
    customerConcentration: mapCustomerConcentration(answers.largestCustomerPct),
    recurringRevenuePct: answers.recurringRevenuePct,
  };
}

function mapTrend(revenueGrowth: AssessmentAnswers["revenueGrowth"]): TrendOption {
  switch (revenueGrowth) {
    case "declining":
      return "declining";
    case "flat":
      return "flat";
    case "growing_1_10":
      return "growing_0_10";
    case "growing_10_20":
    case "growing_20_plus":
      return "growing_10_plus";
  }
}

function mapOwnerInvolvement(
  ownerAbsenceImpact: AssessmentAnswers["ownerAbsenceImpact"],
): OwnerInvolvementOption {
  switch (ownerAbsenceImpact) {
    case "normal_operation":
      return "runs_without_owner";
    case "minor_disruption":
    case "decisions_wait":
      return "owner_part_time";
    case "significant_disruption":
    case "could_not_operate":
      return "owner_essential";
  }
}

function mapCustomerConcentration(
  largestCustomerPct: AssessmentAnswers["largestCustomerPct"],
): CustomerConcentrationOption {
  switch (largestCustomerPct) {
    case "under_10":
      return "under_10";
    case "between_10_20":
      return "between_10_25";
    case "between_20_30":
    case "between_30_50":
    case "over_50":
      return "over_25";
  }
}
