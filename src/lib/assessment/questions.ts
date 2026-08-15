import type {
  AddBackDocumentation,
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
  RecordsCurrency,
  RecurringRevenuePct,
  RevenueGrowth,
  SaleTimeline,
  SuccessorReadiness,
  TransactionPriority,
} from "@/lib/assessment/types";

/**
 * Centralized copy for every question in the assessment. UI components read
 * from here rather than hardcoding labels/options in JSX, so review or
 * wording changes happen in one place.
 */

interface Option<T extends string> {
  value: T;
  label: string;
}

export const TOTAL_STEPS = 5;

export const STEP_TITLES: Record<number, string> = {
  1: "Your Business",
  2: "Performance & Revenue Quality",
  3: "Owner Independence & Transferability",
  4: "Financial Readiness",
  5: "Owner Plans",
};

// ---------------------------------------------------------------------------
// Step 1 — Your Business
// ---------------------------------------------------------------------------

export const METRIC_TYPE_HELP =
  "SDE (Seller's Discretionary Earnings) and EBITDA are both measures of a business's true profitability, adding back the owner's salary, one-time expenses, and other non-operating costs. Most businesses under a few million in revenue use SDE; larger or more institutionally run businesses typically use EBITDA. Use whichever you have.";

// ---------------------------------------------------------------------------
// Step 2 — Performance & Revenue Quality
// ---------------------------------------------------------------------------

export const REVENUE_GROWTH_OPTIONS: Option<RevenueGrowth>[] = [
  { value: "growing_20_plus", label: "Growing more than 20% annually" },
  { value: "growing_10_20", label: "Growing 10–20% annually" },
  { value: "growing_1_10", label: "Growing 1–10% annually" },
  { value: "flat", label: "Mostly flat" },
  { value: "declining", label: "Declining" },
];

export const PROFITABILITY_TREND_OPTIONS: Option<ProfitabilityTrend>[] = [
  { value: "improving", label: "Improving" },
  { value: "stable", label: "Stable" },
  { value: "declining", label: "Declining" },
];

export const RECURRING_REVENUE_OPTIONS: Option<RecurringRevenuePct>[] = [
  { value: "none", label: "None" },
  { value: "under_30", label: "Some, under 30% of revenue" },
  { value: "majority_30_plus", label: "Majority, 30%+ of revenue" },
];

export const RECURRING_REVENUE_HELP =
  "Recurring, contracted, or highly repeatable revenue — subscriptions, service contracts, or customers who reliably reorder — is typically valued more highly by buyers than one-off or project-based revenue.";

export const LARGEST_CUSTOMER_OPTIONS: Option<LargestCustomerPct>[] = [
  { value: "under_10", label: "Under 10% of revenue" },
  { value: "between_10_20", label: "10–20% of revenue" },
  { value: "between_20_30", label: "20–30% of revenue" },
  { value: "between_30_50", label: "30–50% of revenue" },
  { value: "over_50", label: "More than 50% of revenue" },
];

export const CUSTOMER_PROTECTION_OPTIONS: Option<CustomerProtection>[] = [
  { value: "long_term_contract", label: "Protected by a long-term contract" },
  {
    value: "long_standing_relationship",
    label: "No contract, but a long-standing recurring relationship",
  },
  { value: "no_protection", label: "No contract or long-standing pattern" },
];

/** Conditional: only shown when largestCustomerPct is 20%+. */
export function shouldAskCustomerProtection(
  largestCustomerPct: LargestCustomerPct | undefined,
): boolean {
  return (
    largestCustomerPct === "between_20_30" ||
    largestCustomerPct === "between_30_50" ||
    largestCustomerPct === "over_50"
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Owner Independence & Transferability
// ---------------------------------------------------------------------------

export const OWNER_HOURS_OPTIONS: Option<OwnerHoursPerWeek>[] = [
  { value: "under_10", label: "Less than 10 hours/week" },
  { value: "between_10_20", label: "10–20 hours/week" },
  { value: "between_20_30", label: "20–30 hours/week" },
  { value: "between_30_50", label: "30–50 hours/week" },
  { value: "over_50", label: "50+ hours/week" },
];

export const OWNER_ABSENCE_OPTIONS: Option<OwnerAbsenceImpact>[] = [
  { value: "normal_operation", label: "Business would operate normally" },
  { value: "minor_disruption", label: "Minor disruption" },
  { value: "decisions_wait", label: "Important decisions would wait" },
  { value: "significant_disruption", label: "Significant disruption" },
  {
    value: "could_not_operate",
    label: "Business could not operate effectively",
  },
];

export const OWNER_ABSENCE_HELP =
  "If you took a 90-day leave with no contact, what would realistically happen?";

export const CUSTOMER_RELATIONSHIP_OWNERSHIP_OPTIONS: Option<CustomerRelationshipOwnership>[] =
  [
    { value: "sales_team", label: "Sales/customer team" },
    {
      value: "multiple_employees_plus_owner",
      label: "Multiple employees plus owner",
    },
    {
      value: "primarily_owner_transferable",
      label: "Primarily owner, but transferable",
    },
    {
      value: "primarily_owner_difficult",
      label: "Primarily owner, and difficult to transfer",
    },
  ];

export const MANAGEMENT_DEPTH_OPTIONS: Option<ManagementDepth>[] = [
  {
    value: "strong_team",
    label: "Strong leadership team with clear responsibilities",
  },
  { value: "several_capable_managers", label: "Several capable managers" },
  { value: "one_key_manager", label: "One key manager" },
  { value: "informal_supervisors", label: "Informal supervisors" },
  { value: "owner_manages_everything", label: "Owner manages nearly everything" },
];

export const PROCESS_DOCUMENTATION_OPTIONS: Option<ProcessDocumentation>[] = [
  { value: "formal_sops", label: "Formal SOPs across major functions" },
  { value: "most_documented", label: "Most key processes documented" },
  { value: "some_documentation", label: "Some documentation" },
  { value: "tribal_knowledge", label: "Mostly tribal knowledge" },
];

export const SUCCESSOR_READINESS_OPTIONS: Option<SuccessorReadiness>[] = [
  { value: "yes", label: "Yes, someone could step in" },
  { value: "somewhat", label: "Somewhat — would need support" },
  { value: "no", label: "No one currently could" },
];

export const SUCCESSOR_READINESS_HELP =
  "Is there someone on the team capable of assuming day-to-day leadership if needed?";

/** Conditional: only shown when the owner works 30+ hours/week in the business. */
export function shouldAskSuccessorReadiness(
  ownerHoursPerWeek: OwnerHoursPerWeek | undefined,
): boolean {
  return ownerHoursPerWeek === "between_30_50" || ownerHoursPerWeek === "over_50";
}

// ---------------------------------------------------------------------------
// Step 4 — Financial Readiness
// ---------------------------------------------------------------------------

export const FINANCIAL_STATEMENT_QUALITY_OPTIONS: Option<FinancialStatementQuality>[] =
  [
    { value: "audited_reviewed", label: "Audited/reviewed CPA financials" },
    { value: "cpa_prepared", label: "CPA-prepared financial statements" },
    {
      value: "professional_accrual",
      label: "Professionally maintained accrual books",
    },
    {
      value: "internal_cash_basis",
      label: "Internally maintained / primarily cash basis",
    },
    { value: "needs_cleanup", label: "Books need significant cleanup" },
  ];

export const RECORDS_CURRENCY_OPTIONS: Option<RecordsCurrency>[] = [
  { value: "through_last_month", label: "Through the most recent month" },
  { value: "within_one_quarter", label: "Within one quarter" },
  { value: "within_six_months", label: "Within six months" },
  { value: "more_than_six_months_behind", label: "More than six months behind" },
];

export const FINANCIAL_HISTORY_YEARS_OPTIONS: Option<FinancialHistoryYears>[] = [
  { value: "three_plus_plus_ytd", label: "3+ years plus current YTD" },
  { value: "two_years", label: "2 years" },
  { value: "one_year", label: "1 year" },
  { value: "less_than_one_year", label: "Less than 1 complete year" },
];

export const ADD_BACK_DOCUMENTATION_OPTIONS: Option<AddBackDocumentation>[] = [
  { value: "well_documented", label: "Yes, well documented" },
  { value: "mostly_documented", label: "Mostly" },
  { value: "somewhat_documented", label: "Somewhat" },
  { value: "poorly_documented", label: "Mostly estimates / poorly documented" },
];

export const ADD_BACK_DOCUMENTATION_HELP =
  "Discretionary adjustments (\"add-backs\") are personal or one-time expenses run through the business — like a personal vehicle or one-off legal fees — that get added back to earnings. Buyers scrutinize these closely, so documentation matters.";

export const EXPENSE_SEPARATION_OPTIONS: Option<ExpenseSeparation>[] = [
  { value: "completely", label: "Completely separated" },
  { value: "mostly", label: "Mostly separated" },
  { value: "significant_mixing", label: "Significant mixing" },
];

// ---------------------------------------------------------------------------
// Step 5 — Owner Plans
// ---------------------------------------------------------------------------

export const SALE_TIMELINE_OPTIONS: Option<SaleTimeline>[] = [
  { value: "now", label: "Now" },
  { value: "within_12_months", label: "Within 12 months" },
  { value: "one_to_two_years", label: "1–2 years" },
  { value: "three_to_five_years", label: "3–5 years" },
  { value: "no_specific_timeline", label: "No specific timeline" },
];

export const TRANSACTION_PRIORITY_OPTIONS: Option<TransactionPriority>[] = [
  { value: "max_price", label: "Maximum price" },
  { value: "employee_continuity", label: "Employee continuity" },
  { value: "protecting_legacy", label: "Protecting company legacy" },
  { value: "keeping_management", label: "Keeping management in place" },
  { value: "speed_certainty", label: "Speed/certainty" },
  { value: "retaining_equity", label: "Retaining equity" },
  { value: "stepping_away", label: "Stepping away completely" },
];

export const TRANSACTION_PRIORITIES_HELP =
  "Select as many as apply. This helps us understand what matters most to you — it isn't weighted heavily in your readiness score.";
