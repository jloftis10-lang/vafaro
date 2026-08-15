import { CATEGORY_LABELS, CATEGORY_WEIGHTS, READINESS_CATEGORY_ORDER } from "@/lib/assessment/categories";
import { average, REVENUE_GROWTH_ORDER, scoreFromOrderedOptions } from "@/lib/assessment/scoring-utils";
import type {
  AddBackDocumentation,
  AssessmentAnswers,
  CategoryScore,
  CustomerProtection,
  CustomerRelationshipOwnership,
  ExpenseSeparation,
  FinancialHistoryYears,
  FinancialStatementQuality,
  LargestCustomerPct,
  ManagementDepth,
  OwnerAbsenceImpact,
  OwnerHoursPerWeek,
  ProcessDocumentation,
  ProfitabilityTrend,
  ReadinessBand,
  ReadinessCategoryKey,
  ReadinessResult,
  RecordsCurrency,
  RecurringRevenuePct,
  SuccessorReadiness,
} from "@/lib/assessment/types";

// ---------------------------------------------------------------------------
// Ordinal scales, best option first. Only used within this engine — shared
// scales (revenue growth, sale timeline) live in scoring-utils.ts.
// ---------------------------------------------------------------------------

const FINANCIAL_STATEMENT_QUALITY_ORDER: readonly FinancialStatementQuality[] = [
  "audited_reviewed",
  "cpa_prepared",
  "professional_accrual",
  "internal_cash_basis",
  "needs_cleanup",
];

const RECORDS_CURRENCY_ORDER: readonly RecordsCurrency[] = [
  "through_last_month",
  "within_one_quarter",
  "within_six_months",
  "more_than_six_months_behind",
];

const FINANCIAL_HISTORY_YEARS_ORDER: readonly FinancialHistoryYears[] = [
  "three_plus_plus_ytd",
  "two_years",
  "one_year",
  "less_than_one_year",
];

const ADD_BACK_DOCUMENTATION_ORDER: readonly AddBackDocumentation[] = [
  "well_documented",
  "mostly_documented",
  "somewhat_documented",
  "poorly_documented",
];

const EXPENSE_SEPARATION_ORDER: readonly ExpenseSeparation[] = [
  "completely",
  "mostly",
  "significant_mixing",
];

const OWNER_HOURS_ORDER: readonly OwnerHoursPerWeek[] = [
  "under_10",
  "between_10_20",
  "between_20_30",
  "between_30_50",
  "over_50",
];

const OWNER_ABSENCE_ORDER: readonly OwnerAbsenceImpact[] = [
  "normal_operation",
  "minor_disruption",
  "decisions_wait",
  "significant_disruption",
  "could_not_operate",
];

const CUSTOMER_RELATIONSHIP_OWNERSHIP_ORDER: readonly CustomerRelationshipOwnership[] = [
  "sales_team",
  "multiple_employees_plus_owner",
  "primarily_owner_transferable",
  "primarily_owner_difficult",
];

const SUCCESSOR_READINESS_ORDER: readonly SuccessorReadiness[] = ["yes", "somewhat", "no"];

const MANAGEMENT_DEPTH_ORDER: readonly ManagementDepth[] = [
  "strong_team",
  "several_capable_managers",
  "one_key_manager",
  "informal_supervisors",
  "owner_manages_everything",
];

const PROCESS_DOCUMENTATION_ORDER: readonly ProcessDocumentation[] = [
  "formal_sops",
  "most_documented",
  "some_documentation",
  "tribal_knowledge",
];

const RECURRING_REVENUE_ORDER: readonly RecurringRevenuePct[] = [
  "majority_30_plus",
  "under_30",
  "none",
];

const PROFITABILITY_TREND_ORDER: readonly ProfitabilityTrend[] = [
  "improving",
  "stable",
  "declining",
];

const LARGEST_CUSTOMER_ORDER: readonly LargestCustomerPct[] = [
  "under_10",
  "between_10_20",
  "between_20_30",
  "between_30_50",
  "over_50",
];

const CUSTOMER_PROTECTION_ORDER: readonly CustomerProtection[] = [
  "long_term_contract",
  "long_standing_relationship",
  "no_protection",
];

// ---------------------------------------------------------------------------
// Per-category scoring. Sub-questions within a category are weighted evenly
// — a simple, defensible starting point; easy to bias later if one turns
// out to matter more than another.
// ---------------------------------------------------------------------------

/**
 * Earnings Quality: how credible, sustainable, and supportable the reported
 * earnings appear — not a Quality of Earnings analysis OwnerGauge performs
 * itself, just a readiness read on documentation and reporting quality.
 * (Formerly "Financial Readiness" — same inputs, renamed to match the
 * Buyer Lens vocabulary.)
 */
function scoreEarningsQuality(a: AssessmentAnswers): number {
  return average([
    scoreFromOrderedOptions(a.financialStatementQuality, FINANCIAL_STATEMENT_QUALITY_ORDER),
    scoreFromOrderedOptions(a.recordsCurrency, RECORDS_CURRENCY_ORDER),
    scoreFromOrderedOptions(a.financialHistoryYears, FINANCIAL_HISTORY_YEARS_ORDER),
    scoreFromOrderedOptions(a.addBackDocumentation, ADD_BACK_DOCUMENTATION_ORDER),
    scoreFromOrderedOptions(a.expenseSeparation, EXPENSE_SEPARATION_ORDER),
  ]);
}

/** Longer operating history is a secondary signal of market position, when provided. */
function scoreFromYearsInBusiness(years: number): number {
  if (years >= 10) return 100;
  if (years >= 5) return 75;
  if (years >= 2) return 50;
  return 25;
}

/**
 * Revenue Quality: predictability, durability, and trajectory of revenue.
 * Merges the old revenueQuality (recurring revenue, profitability trend)
 * and growthMarketPosition (revenue growth, years in business) categories —
 * their combined weight (15% + 10%) lands exactly on this category's new
 * 25% weight, so nothing here is a cosmetic reshuffle.
 */
function scoreRevenueQuality(a: AssessmentAnswers): number {
  const scores = [
    scoreFromOrderedOptions(a.recurringRevenuePct, RECURRING_REVENUE_ORDER),
    scoreFromOrderedOptions(a.profitabilityTrend, PROFITABILITY_TREND_ORDER),
    scoreFromOrderedOptions(a.revenueGrowth, REVENUE_GROWTH_ORDER),
  ];
  if (typeof a.yearsInBusiness === "number") {
    scores.push(scoreFromYearsInBusiness(a.yearsInBusiness));
  }
  return average(scores);
}

/**
 * Transferability: how well the business retains its economics without the
 * current owner. Merges the old ownerIndependence (hours, absence impact,
 * customer relationship ownership, successor readiness) and
 * managementOperations (management depth, process documentation) categories
 * — this is deliberately the largest single category (30%), since owner
 * dependency is the single most common critical risk OwnerGauge sees.
 */
function scoreTransferability(a: AssessmentAnswers): number {
  const scores = [
    scoreFromOrderedOptions(a.ownerHoursPerWeek, OWNER_HOURS_ORDER),
    scoreFromOrderedOptions(a.ownerAbsenceImpact, OWNER_ABSENCE_ORDER),
    scoreFromOrderedOptions(a.customerRelationshipOwnership, CUSTOMER_RELATIONSHIP_OWNERSHIP_ORDER),
    scoreFromOrderedOptions(a.managementDepth, MANAGEMENT_DEPTH_ORDER),
    scoreFromOrderedOptions(a.processDocumentation, PROCESS_DOCUMENTATION_ORDER),
  ];
  if (a.successorReadiness) {
    scores.push(scoreFromOrderedOptions(a.successorReadiness, SUCCESSOR_READINESS_ORDER));
  }
  return average(scores);
}

/** Top-5 concentration, when provided, is scored on its own bracket rather than the 5-bucket largest-customer scale. */
function scoreFromTop5Concentration(pct: number): number {
  if (pct < 30) return 100;
  if (pct < 50) return 75;
  if (pct < 70) return 50;
  if (pct < 90) return 25;
  return 0;
}

/**
 * Concentration Risk: currently customer concentration only. The broader
 * knowledge model (producer, payer/referral, supplier, vendor, end-market
 * concentration) stays industry-conditional future scope — see
 * docs/valuation-benchmark-policy.md — not scored here in V1.
 * (Formerly "Customer / Commercial Risk" — same inputs, renamed.)
 */
function scoreConcentrationRisk(a: AssessmentAnswers): number {
  const scores = [scoreFromOrderedOptions(a.largestCustomerPct, LARGEST_CUSTOMER_ORDER)];
  if (a.largestCustomerProtection) {
    scores.push(scoreFromOrderedOptions(a.largestCustomerProtection, CUSTOMER_PROTECTION_ORDER));
  }
  if (typeof a.top5CustomersPct === "number") {
    scores.push(scoreFromTop5Concentration(a.top5CustomersPct));
  }
  return average(scores);
}

const CATEGORY_SCORERS: Record<ReadinessCategoryKey, (a: AssessmentAnswers) => number> = {
  revenueQuality: scoreRevenueQuality,
  earningsQuality: scoreEarningsQuality,
  transferability: scoreTransferability,
  concentrationRisk: scoreConcentrationRisk,
};

function readinessBand(score: number): ReadinessBand {
  if (score >= 85) return "Highly Prepared";
  if (score >= 70) return "Generally Ready";
  if (score >= 55) return "Preparing for Market";
  if (score >= 40) return "Significant Preparation Needed";
  return "Early-Stage Readiness";
}

const SEVERE_RISK_SCORE_CAP = 54;

function readinessCapReasons(a: AssessmentAnswers): string[] {
  const reasons: string[] = [];
  if (a.financialStatementQuality === "needs_cleanup" && a.recordsCurrency === "more_than_six_months_behind") {
    reasons.push("Financial records need cleanup and are more than six months behind.");
  }
  if (a.ownerAbsenceImpact === "could_not_operate") {
    reasons.push("The business could not operate effectively through a 90-day owner absence.");
  }
  if (a.largestCustomerPct === "over_50") {
    reasons.push("One customer represents more than half of revenue.");
  }
  // Industry module (Phase E) — a required license or certification that
  // exists only with the exiting owner.
  if (
    (a.industryId === "hvac-mechanical" && a.licenseHolderBeyondOwner === "no") ||
    (a.industryId === "engineering-consulting" && a.licensedStaffBeyondOwner === "no_owner_only") ||
    (a.industryId === "accounting-firms" && a.staffCpaDepth === "owner_only_licensed")
  ) {
    reasons.push("A license or professional credential the business depends on exists only with the owner.");
  }
  // Industry module (Phase E) — majority of revenue personally produced by
  // the owner in a professional-services model.
  if (a.industryId === "accounting-firms" && a.ownerProducedRevenuePct === "over_75") {
    reasons.push("Over 75% of billings are personally produced by the owner.");
  }
  return reasons;
}

/**
 * Deterministic, templated explanation of why the score landed where it
 * did — mirrors the non-AI commentary pattern in src/lib/valuation.ts.
 * Compares the highest- and lowest-scoring categories rather than trying
 * to summarize all four at once.
 */
function generateReadinessSummary(
  band: ReadinessBand,
  categories: CategoryScore[],
  capReasons: string[],
): string {
  const sorted = [...categories].sort((a, b) => b.score - a.score);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const sentences: string[] = [
    capReasons.length > 0
      ? `Your business falls in the "${band}" range — the headline score is capped by the severe risk noted above, independent of how strong the rest of the profile is.`
      : `Your business falls in the "${band}" range.`,
  ];

  if (strongest.score - weakest.score >= 15) {
    sentences.push(
      `${strongest.label} is the strongest factor in this result, while ${weakest.label} is the area most likely to slow down or complicate a real transaction process.`,
    );
  } else {
    sentences.push(
      "Your scores are fairly even across categories — no single factor is dominating this result in either direction.",
    );
  }

  return sentences.join(" ");
}

export function calculateReadiness(answers: AssessmentAnswers): ReadinessResult {
  const categories: CategoryScore[] = READINESS_CATEGORY_ORDER.map((key) => {
    const score = Math.round(CATEGORY_SCORERS[key](answers));
    const weight = CATEGORY_WEIGHTS[key];
    return {
      key,
      label: CATEGORY_LABELS[key],
      score,
      weight,
      weightedScore: Math.round(score * weight * 100) / 100,
    };
  });

  const scoreBeforeRiskCaps = Math.round(
    categories.reduce((sum, category) => sum + category.score * category.weight, 0),
  );
  const capReasons = readinessCapReasons(answers);
  const totalScore = capReasons.length > 0
    ? Math.min(scoreBeforeRiskCaps, SEVERE_RISK_SCORE_CAP)
    : scoreBeforeRiskCaps;
  const band = readinessBand(totalScore);

  return {
    totalScore,
    scoreBeforeRiskCaps,
    capReasons,
    band,
    categories,
    summary: generateReadinessSummary(band, categories, capReasons),
  };
}
