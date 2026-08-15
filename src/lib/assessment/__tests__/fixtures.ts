import type { AssessmentAnswers } from "@/lib/assessment/types";

/** A strong, well-prepared business — the baseline every test variant starts from. */
export const strongAnswers: AssessmentAnswers = {
  industryId: "accounting-firms",
  revenue: 2_000_000,
  metricType: "sde",
  metricValue: 400_000,
  yearsInBusiness: 12,

  revenueGrowth: "growing_10_20",
  profitabilityTrend: "improving",
  recurringRevenuePct: "majority_30_plus",
  largestCustomerPct: "under_10",
  top5CustomersPct: 25,

  ownerHoursPerWeek: "under_10",
  ownerAbsenceImpact: "normal_operation",
  customerRelationshipOwnership: "sales_team",
  managementDepth: "strong_team",
  processDocumentation: "formal_sops",

  financialStatementQuality: "audited_reviewed",
  recordsCurrency: "through_last_month",
  financialHistoryYears: "three_plus_plus_ytd",
  addBackDocumentation: "well_documented",
  expenseSeparation: "completely",

  saleTimeline: "now",
  transactionPriorities: ["max_price"],
};

export const ownerDependentAnswers: AssessmentAnswers = {
  ...strongAnswers,
  ownerHoursPerWeek: "over_50",
  ownerAbsenceImpact: "could_not_operate",
  customerRelationshipOwnership: "primarily_owner_difficult",
  managementDepth: "owner_manages_everything",
};

export const highCustomerConcentrationAnswers: AssessmentAnswers = {
  ...strongAnswers,
  largestCustomerPct: "over_50",
  largestCustomerProtection: "no_protection",
  // Unset so this fixture isolates the concentration signal cleanly,
  // rather than mixing in strongAnswers' unrelated top5CustomersPct=25.
  top5CustomersPct: undefined,
};

export const poorFinancialRecordsAnswers: AssessmentAnswers = {
  ...strongAnswers,
  financialStatementQuality: "needs_cleanup",
  recordsCurrency: "more_than_six_months_behind",
  financialHistoryYears: "less_than_one_year",
  addBackDocumentation: "poorly_documented",
  expenseSeparation: "significant_mixing",
};

export const decliningAnswers: AssessmentAnswers = {
  ...strongAnswers,
  revenueGrowth: "declining",
  profitabilityTrend: "declining",
};

export const smallExcellentAnswers: AssessmentAnswers = {
  ...strongAnswers,
  revenue: 300_000,
  metricValue: 60_000,
};

/** Weak across every category — used to confirm the strengths engine can legitimately return 0. */
export const veryWeakAnswers: AssessmentAnswers = {
  ...strongAnswers,
  revenueGrowth: "declining",
  profitabilityTrend: "declining",
  recurringRevenuePct: "none",
  largestCustomerPct: "over_50",
  ownerHoursPerWeek: "over_50",
  ownerAbsenceImpact: "could_not_operate",
  customerRelationshipOwnership: "primarily_owner_difficult",
  managementDepth: "owner_manages_everything",
  processDocumentation: "tribal_knowledge",
  financialStatementQuality: "needs_cleanup",
  recordsCurrency: "more_than_six_months_behind",
  financialHistoryYears: "less_than_one_year",
  addBackDocumentation: "poorly_documented",
  expenseSeparation: "significant_mixing",
};
