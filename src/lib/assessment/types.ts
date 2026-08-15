import type { MetricType } from "@/lib/types";

// ---------------------------------------------------------------------------
// Assessment answers — the full 15–18 question, 5-step Deal Readiness intake.
// This is distinct from (and a superset of) the legacy ValuationInputs in
// src/lib/types.ts, which the original 2-step calculator still uses.
// ---------------------------------------------------------------------------

export type RevenueGrowth =
  | "growing_20_plus"
  | "growing_10_20"
  | "growing_1_10"
  | "flat"
  | "declining";

export type ProfitabilityTrend = "improving" | "stable" | "declining";

export type RecurringRevenuePct = "none" | "under_30" | "majority_30_plus";

export type LargestCustomerPct =
  | "under_10"
  | "between_10_20"
  | "between_20_30"
  | "between_30_50"
  | "over_50";

export type CustomerProtection =
  | "long_term_contract"
  | "long_standing_relationship"
  | "no_protection";

export type OwnerHoursPerWeek =
  | "under_10"
  | "between_10_20"
  | "between_20_30"
  | "between_30_50"
  | "over_50";

export type OwnerAbsenceImpact =
  | "normal_operation"
  | "minor_disruption"
  | "decisions_wait"
  | "significant_disruption"
  | "could_not_operate";

export type CustomerRelationshipOwnership =
  | "sales_team"
  | "multiple_employees_plus_owner"
  | "primarily_owner_transferable"
  | "primarily_owner_difficult";

export type ManagementDepth =
  | "strong_team"
  | "several_capable_managers"
  | "one_key_manager"
  | "informal_supervisors"
  | "owner_manages_everything";

export type ProcessDocumentation =
  | "formal_sops"
  | "most_documented"
  | "some_documentation"
  | "tribal_knowledge";

export type SuccessorReadiness = "yes" | "somewhat" | "no";

export type FinancialStatementQuality =
  | "audited_reviewed"
  | "cpa_prepared"
  | "professional_accrual"
  | "internal_cash_basis"
  | "needs_cleanup";

export type RecordsCurrency =
  | "through_last_month"
  | "within_one_quarter"
  | "within_six_months"
  | "more_than_six_months_behind";

export type FinancialHistoryYears =
  | "three_plus_plus_ytd"
  | "two_years"
  | "one_year"
  | "less_than_one_year";

export type AddBackDocumentation =
  | "well_documented"
  | "mostly_documented"
  | "somewhat_documented"
  | "poorly_documented";

export type ExpenseSeparation = "completely" | "mostly" | "significant_mixing";

export type SaleTimeline =
  | "now"
  | "within_12_months"
  | "one_to_two_years"
  | "three_to_five_years"
  | "no_specific_timeline";

export type TransactionPriority =
  | "max_price"
  | "employee_continuity"
  | "protecting_legacy"
  | "keeping_management"
  | "speed_certainty"
  | "retaining_equity"
  | "stepping_away";

export interface AssessmentAnswers {
  // Step 1 — Your Business
  industryId: string;
  revenue: number;
  metricType: MetricType;
  metricValue: number;
  yearsInBusiness?: number;

  // Step 2 — Performance & Revenue Quality
  revenueGrowth: RevenueGrowth;
  profitabilityTrend: ProfitabilityTrend;
  recurringRevenuePct: RecurringRevenuePct;
  largestCustomerPct: LargestCustomerPct;
  top5CustomersPct?: number;
  /** Conditional: only asked when largestCustomerPct is 20%+. */
  largestCustomerProtection?: CustomerProtection;

  // Step 3 — Owner Independence & Transferability
  ownerHoursPerWeek: OwnerHoursPerWeek;
  ownerAbsenceImpact: OwnerAbsenceImpact;
  customerRelationshipOwnership: CustomerRelationshipOwnership;
  managementDepth: ManagementDepth;
  processDocumentation: ProcessDocumentation;
  /** Conditional: only asked when ownerHoursPerWeek is 30+. */
  successorReadiness?: SuccessorReadiness;

  // Step 4 — Financial Readiness
  financialStatementQuality: FinancialStatementQuality;
  recordsCurrency: RecordsCurrency;
  financialHistoryYears: FinancialHistoryYears;
  addBackDocumentation: AddBackDocumentation;
  expenseSeparation: ExpenseSeparation;

  // Step 5 — Owner Plans (lead qualification, lightly weighted in scoring)
  saleTimeline: SaleTimeline;
  transactionPriorities: TransactionPriority[];

  // Industry module — 2-4 conditional questions per the first five priority
  // industries (src/lib/assessment/industry-questions.ts), asked inline in
  // Step 1 once the matching industry is selected. Every field supports
  // "not_sure" and none are required, per the "do not force fake precision"
  // question-design principle.
  backlogMonths?: BacklogMonths;
  endMarketConcentration?: EndMarketConcentration;
  capexOutlook?: CapexOutlook;
  largestSupplierPct?: LargestSupplierPct;
  territoryProtection?: TerritoryProtection;
  reorderRevenuePct?: ReorderRevenuePct;
  contractedBacklogMonths?: ContractedBacklogMonths;
  licensedStaffBeyondOwner?: LicensedStaffBeyondOwner;
  serviceVsInstallMix?: ServiceVsInstallMix;
  maintenanceAgreementRevenuePct?: MaintenanceAgreementRevenuePct;
  licenseHolderBeyondOwner?: LicenseHolderBeyondOwner;
  recurringComplianceRevenuePct?: RecurringComplianceRevenuePct;
  ownerProducedRevenuePct?: OwnerProducedRevenuePct;
  staffCpaDepth?: StaffCpaDepth;
}

// ---------------------------------------------------------------------------
// Industry module option types (Phase E — see src/lib/assessment/industry-questions.ts)
// ---------------------------------------------------------------------------

/** Specialty Manufacturing */
export type BacklogMonths = "less_than_1" | "1_to_3" | "3_to_6" | "6_plus" | "not_sure";
export type EndMarketConcentration = "single_end_market" | "two_to_three" | "diversified" | "not_sure";
export type CapexOutlook = "major_replacement_expected" | "normal_maintenance" | "recently_upgraded" | "not_sure";

/** Specialty Distribution */
export type LargestSupplierPct = "under_20" | "20_to_40" | "40_to_60" | "over_60" | "not_sure";
export type TerritoryProtection = "exclusive_protected" | "some_protection" | "open_competitive" | "not_sure";
export type ReorderRevenuePct = "majority_repeat" | "mixed" | "mostly_new" | "not_sure";

/** Engineering & Technical Consulting */
export type ContractedBacklogMonths = "less_than_3" | "3_to_6" | "6_to_12" | "12_plus" | "not_sure";
export type LicensedStaffBeyondOwner = "yes_multiple" | "yes_one" | "no_owner_only" | "not_sure";

/** HVAC & Mechanical Services */
export type ServiceVsInstallMix = "mostly_service" | "balanced" | "mostly_install" | "not_sure";
export type MaintenanceAgreementRevenuePct = "none" | "under_15" | "15_to_30" | "over_30" | "not_sure";
export type LicenseHolderBeyondOwner = "yes" | "no" | "not_sure";

/** Accounting / CPA Firms */
export type RecurringComplianceRevenuePct = "under_40" | "40_to_70" | "over_70" | "not_sure";
export type OwnerProducedRevenuePct = "under_25" | "25_to_50" | "50_to_75" | "over_75" | "not_sure";
export type StaffCpaDepth = "multiple_licensed_staff" | "one_other_licensed" | "owner_only_licensed" | "not_sure";

// ---------------------------------------------------------------------------
// Deal Readiness scoring — implemented in Phase 2 (src/lib/assessment/readiness.ts).
// Types defined now so the question flow and later engines share one contract.
// ---------------------------------------------------------------------------

/**
 * Buyer Lens is the underlying structure of Deal Readiness — not a parallel
 * score. These four categories merge the earlier 7-category model:
 * revenueQuality <- old revenueQuality + growthMarketPosition
 * earningsQuality <- old financialReadiness
 * transferability <- old ownerIndependence + managementOperations
 * concentrationRisk <- old customerCommercialRisk
 * (old transactionPreparedness dropped — it never generated a risk-flag
 * rule and had no natural home in the new four; see readiness.ts)
 */
export type ReadinessCategoryKey =
  | "revenueQuality"
  | "earningsQuality"
  | "transferability"
  | "concentrationRisk";

export interface CategoryScore {
  key: ReadinessCategoryKey;
  label: string;
  /** Normalized 0–100, before weighting. */
  score: number;
  /** 0–1, sums to 1 across all categories. */
  weight: number;
  /** score * weight, on a 0–100 scale. */
  weightedScore: number;
}

export type ReadinessBand =
  | "Highly Prepared"
  | "Generally Ready"
  | "Preparing for Market"
  | "Significant Preparation Needed"
  | "Early-Stage Readiness";

export interface ReadinessResult {
  /** 0–100. */
  totalScore: number;
  /** Weighted score before any severe-risk ceiling is applied. */
  scoreBeforeRiskCaps: number;
  /** Plain-language reasons a severe issue limited the headline score. */
  capReasons: string[];
  band: ReadinessBand;
  categories: CategoryScore[];
  /** Deterministic, templated prose explaining why the score landed where it did — same non-AI pattern as ValuationResult.commentary. */
  summary: string;
}

// ---------------------------------------------------------------------------
// Risk flags — implemented in Phase 2 (src/lib/assessment/risks.ts).
// ---------------------------------------------------------------------------

export type RiskSeverity = "critical" | "important" | "opportunity";

export interface RiskFlag {
  id: string;
  category: ReadinessCategoryKey;
  severity: RiskSeverity;
  title: string;
  explanation: string;
  whyBuyersCare: string;
  recommendedAction: string;
}

// ---------------------------------------------------------------------------
// Recommendations — implemented in Phase 2 (src/lib/assessment/recommendations.ts).
// ---------------------------------------------------------------------------

export interface Recommendation {
  id: string;
  /** 1-based rank; only the top 3 are surfaced to the user. */
  rank: number;
  title: string;
  detail: string;
  sourceRiskId?: string;
}

// ---------------------------------------------------------------------------
// Internal lead score — implemented in Phase 2 (src/lib/assessment/leadScore.ts).
// Never shown to the user; stored server-side only.
// ---------------------------------------------------------------------------

export type LeadClassification = "A" | "B" | "C" | "D";

export interface LeadScoreComponents {
  financialAttractiveness: number;
  transactionTiming: number;
  dealReadiness: number;
  industryFit: number;
  growth: number;
  intent: number;
}

export interface LeadScoreResult {
  /** 0–100, internal only. */
  score: number;
  classification: LeadClassification;
  components: LeadScoreComponents;
}

// ---------------------------------------------------------------------------
// Call to action — implemented in Phase 3 (src/lib/assessment/cta.ts).
// ---------------------------------------------------------------------------

export interface CTAResult {
  headline: string;
  subhead: string;
  buttonLabel: string;
  buttonHref: string;
}
