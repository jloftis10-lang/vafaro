import { z } from "zod";
import { INDUSTRIES } from "@/lib/data/industries";

/**
 * Shared validation for a completed assessment + email capture. Used by
 * the /api/assessment/submit route and exercised directly in
 * schema.test.ts so "reject negative revenue / impossible percentages /
 * non-finite numbers" is testable without spinning up a request.
 *
 * REVENUE_CAP / METRIC_VALUE_CAP are sanity ceilings, not real business
 * limits — they exist to reject obvious garbage/typos (e.g. an extra zero)
 * rather than to cap legitimate large businesses. Raise them if a real
 * seller ever legitimately hits one.
 */
const REVENUE_CAP = 1_000_000_000;
const METRIC_VALUE_CAP = 1_000_000_000;
const MAX_YEARS_IN_BUSINESS = 150;

const money = (cap: number) => z.number().finite().positive().max(cap);
const percent = () => z.number().finite().min(0).max(100);

export const assessmentSubmissionSchema = z.object({
  email: z.string().trim().email(),
  // Honeypot — real users never see this field; bots that fill every input will.
  company: z.string().optional(),

  industryId: z.string().refine((value) => INDUSTRIES.some((industry) => industry.id === value), {
    message: "Select a recognized industry.",
  }),
  revenue: money(REVENUE_CAP),
  metricType: z.enum(["sde", "ebitda"]),
  metricValue: money(METRIC_VALUE_CAP),
  yearsInBusiness: z.number().finite().nonnegative().max(MAX_YEARS_IN_BUSINESS).optional(),

  revenueGrowth: z.enum(["growing_20_plus", "growing_10_20", "growing_1_10", "flat", "declining"]),
  profitabilityTrend: z.enum(["improving", "stable", "declining"]),
  recurringRevenuePct: z.enum(["none", "under_30", "majority_30_plus"]),
  largestCustomerPct: z.enum(["under_10", "between_10_20", "between_20_30", "between_30_50", "over_50"]),
  top5CustomersPct: percent().optional(),
  largestCustomerProtection: z
    .enum(["long_term_contract", "long_standing_relationship", "no_protection"])
    .optional(),

  ownerHoursPerWeek: z.enum(["under_10", "between_10_20", "between_20_30", "between_30_50", "over_50"]),
  ownerAbsenceImpact: z.enum([
    "normal_operation",
    "minor_disruption",
    "decisions_wait",
    "significant_disruption",
    "could_not_operate",
  ]),
  customerRelationshipOwnership: z.enum([
    "sales_team",
    "multiple_employees_plus_owner",
    "primarily_owner_transferable",
    "primarily_owner_difficult",
  ]),
  managementDepth: z.enum([
    "strong_team",
    "several_capable_managers",
    "one_key_manager",
    "informal_supervisors",
    "owner_manages_everything",
  ]),
  processDocumentation: z.enum(["formal_sops", "most_documented", "some_documentation", "tribal_knowledge"]),
  successorReadiness: z.enum(["yes", "somewhat", "no"]).optional(),

  financialStatementQuality: z.enum([
    "audited_reviewed",
    "cpa_prepared",
    "professional_accrual",
    "internal_cash_basis",
    "needs_cleanup",
  ]),
  recordsCurrency: z.enum([
    "through_last_month",
    "within_one_quarter",
    "within_six_months",
    "more_than_six_months_behind",
  ]),
  financialHistoryYears: z.enum(["three_plus_plus_ytd", "two_years", "one_year", "less_than_one_year"]),
  addBackDocumentation: z.enum(["well_documented", "mostly_documented", "somewhat_documented", "poorly_documented"]),
  expenseSeparation: z.enum(["completely", "mostly", "significant_mixing"]),

  saleTimeline: z.enum(["now", "within_12_months", "one_to_two_years", "three_to_five_years", "no_specific_timeline"]),
  transactionPriorities: z
    .array(
      z.enum([
        "max_price",
        "employee_continuity",
        "protecting_legacy",
        "keeping_management",
        "speed_certainty",
        "retaining_equity",
        "stepping_away",
      ]),
    )
    .min(1),

  // Industry module (Phase E) — all optional/"not_sure"-supporting, see
  // src/lib/assessment/industry-questions.ts for the question copy.
  backlogMonths: z.enum(["less_than_1", "1_to_3", "3_to_6", "6_plus", "not_sure"]).optional(),
  endMarketConcentration: z.enum(["single_end_market", "two_to_three", "diversified", "not_sure"]).optional(),
  capexOutlook: z.enum(["major_replacement_expected", "normal_maintenance", "recently_upgraded", "not_sure"]).optional(),
  largestSupplierPct: z.enum(["under_20", "20_to_40", "40_to_60", "over_60", "not_sure"]).optional(),
  territoryProtection: z.enum(["exclusive_protected", "some_protection", "open_competitive", "not_sure"]).optional(),
  reorderRevenuePct: z.enum(["majority_repeat", "mixed", "mostly_new", "not_sure"]).optional(),
  contractedBacklogMonths: z.enum(["less_than_3", "3_to_6", "6_to_12", "12_plus", "not_sure"]).optional(),
  licensedStaffBeyondOwner: z.enum(["yes_multiple", "yes_one", "no_owner_only", "not_sure"]).optional(),
  serviceVsInstallMix: z.enum(["mostly_service", "balanced", "mostly_install", "not_sure"]).optional(),
  maintenanceAgreementRevenuePct: z.enum(["none", "under_15", "15_to_30", "over_30", "not_sure"]).optional(),
  licenseHolderBeyondOwner: z.enum(["yes", "no", "not_sure"]).optional(),
  recurringComplianceRevenuePct: z.enum(["under_40", "40_to_70", "over_70", "not_sure"]).optional(),
  ownerProducedRevenuePct: z.enum(["under_25", "25_to_50", "50_to_75", "over_75", "not_sure"]).optional(),
  staffCpaDepth: z.enum(["multiple_licensed_staff", "one_other_licensed", "owner_only_licensed", "not_sure"]).optional(),
}).superRefine((data, ctx) => {
  if (data.metricValue > data.revenue) {
    ctx.addIssue({ code: "custom", path: ["metricValue"], message: "Earnings cannot exceed revenue." });
  }
  const concentrated = ["between_20_30", "between_30_50", "over_50"].includes(data.largestCustomerPct);
  if (concentrated && !data.largestCustomerProtection) {
    ctx.addIssue({ code: "custom", path: ["largestCustomerProtection"], message: "Describe protection for the largest customer." });
  }
  const ownerHeavy = data.ownerHoursPerWeek === "between_30_50" || data.ownerHoursPerWeek === "over_50";
  if (ownerHeavy && !data.successorReadiness) {
    ctx.addIssue({ code: "custom", path: ["successorReadiness"], message: "Describe successor readiness." });
  }
});

export type AssessmentSubmission = z.infer<typeof assessmentSubmissionSchema>;
