export type IndustryQuestionField =
  | "backlogMonths"
  | "endMarketConcentration"
  | "capexOutlook"
  | "largestSupplierPct"
  | "territoryProtection"
  | "reorderRevenuePct"
  | "contractedBacklogMonths"
  | "licensedStaffBeyondOwner"
  | "serviceVsInstallMix"
  | "maintenanceAgreementRevenuePct"
  | "licenseHolderBeyondOwner"
  | "recurringComplianceRevenuePct"
  | "ownerProducedRevenuePct"
  | "staffCpaDepth";

export interface IndustryQuestionOption {
  value: string;
  label: string;
}

export interface IndustryQuestion {
  /** Key on AssessmentAnswers/AssessmentFormState this question writes to. */
  field: IndustryQuestionField;
  label: string;
  options: IndustryQuestionOption[];
}

const NOT_SURE: IndustryQuestionOption = { value: "not_sure", label: "Not sure" };

/**
 * The 2-4 highest-value industry-specific questions per the first five
 * priority industries (master prompt section 29-32). Every question
 * supports "Not sure" and none are required — industry selection alone
 * should never force fake precision out of an owner. Rendered inline in
 * StepBusiness.tsx once the matching industry is selected; scored by the
 * industry-conditional risk rules in risks.ts.
 */
export const INDUSTRY_QUESTIONS: Record<string, IndustryQuestion[]> = {
  "specialty-manufacturing": [
    {
      field: "backlogMonths",
      label: "About how many months of confirmed backlog does the business currently have?",
      options: [
        { value: "less_than_1", label: "Less than 1 month" },
        { value: "1_to_3", label: "1–3 months" },
        { value: "3_to_6", label: "3–6 months" },
        { value: "6_plus", label: "6+ months" },
        NOT_SURE,
      ],
    },
    {
      field: "endMarketConcentration",
      label: "How concentrated is revenue in a single end market (e.g. mostly automotive, mostly aerospace)?",
      options: [
        { value: "single_end_market", label: "Mostly one end market" },
        { value: "two_to_three", label: "Spread across 2–3 end markets" },
        { value: "diversified", label: "Diversified across several end markets" },
        NOT_SURE,
      ],
    },
    {
      field: "capexOutlook",
      label: "Over the next 3 years, do you expect major equipment replacement to require unusually large spending?",
      options: [
        { value: "major_replacement_expected", label: "Yes, a major replacement is likely" },
        { value: "normal_maintenance", label: "No, just normal maintenance" },
        { value: "recently_upgraded", label: "No, equipment was recently upgraded" },
        NOT_SURE,
      ],
    },
  ],

  "specialty-distribution": [
    {
      field: "largestSupplierPct",
      label: "About what share of what you purchase comes from your single largest supplier?",
      options: [
        { value: "under_20", label: "Under 20%" },
        { value: "20_to_40", label: "20–40%" },
        { value: "40_to_60", label: "40–60%" },
        { value: "over_60", label: "Over 60%" },
        NOT_SURE,
      ],
    },
    {
      field: "territoryProtection",
      label: "Do you have exclusive or protected territories or supplier agreements?",
      options: [
        { value: "exclusive_protected", label: "Yes, exclusive/protected" },
        { value: "some_protection", label: "Some protection, not exclusive" },
        { value: "open_competitive", label: "No, open and competitive" },
        NOT_SURE,
      ],
    },
    {
      field: "reorderRevenuePct",
      label: "About what share of revenue comes from repeat orders versus new customers?",
      options: [
        { value: "majority_repeat", label: "Mostly repeat/reorder business" },
        { value: "mixed", label: "A mix of repeat and new" },
        { value: "mostly_new", label: "Mostly new customers" },
        NOT_SURE,
      ],
    },
  ],

  "engineering-consulting": [
    {
      field: "contractedBacklogMonths",
      label: "About how many months of signed, contracted backlog does the firm have?",
      options: [
        { value: "less_than_3", label: "Less than 3 months" },
        { value: "3_to_6", label: "3–6 months" },
        { value: "6_to_12", label: "6–12 months" },
        { value: "12_plus", label: "12+ months" },
        NOT_SURE,
      ],
    },
    {
      field: "licensedStaffBeyondOwner",
      label: "Beyond yourself, do you have licensed professionals (PE, RA, or equivalent) who can stamp/sign off on projects?",
      options: [
        { value: "yes_multiple", label: "Yes, multiple licensed staff" },
        { value: "yes_one", label: "Yes, one other licensed professional" },
        { value: "no_owner_only", label: "No, I'm the only licensed professional" },
        NOT_SURE,
      ],
    },
  ],

  "hvac-mechanical": [
    {
      field: "serviceVsInstallMix",
      label: "Is revenue mostly service/repair calls, mostly new installation, or a balance of both?",
      options: [
        { value: "mostly_service", label: "Mostly service/repair" },
        { value: "balanced", label: "A balance of both" },
        { value: "mostly_install", label: "Mostly new installation" },
        NOT_SURE,
      ],
    },
    {
      field: "maintenanceAgreementRevenuePct",
      label: "About what share of revenue comes from ongoing maintenance agreements?",
      options: [
        { value: "none", label: "None" },
        { value: "under_15", label: "Under 15%" },
        { value: "15_to_30", label: "15–30%" },
        { value: "over_30", label: "Over 30%" },
        NOT_SURE,
      ],
    },
    {
      field: "licenseHolderBeyondOwner",
      label: "Does anyone besides you hold the master license the business operates under?",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No, only me" },
        NOT_SURE,
      ],
    },
  ],

  "accounting-firms": [
    {
      field: "recurringComplianceRevenuePct",
      label: "About what share of revenue is recurring compliance/tax/bookkeeping work versus one-off advisory projects?",
      options: [
        { value: "under_40", label: "Under 40% recurring" },
        { value: "40_to_70", label: "40–70% recurring" },
        { value: "over_70", label: "Over 70% recurring" },
        NOT_SURE,
      ],
    },
    {
      field: "ownerProducedRevenuePct",
      label: "About what share of billings do you personally produce, versus staff or other partners?",
      options: [
        { value: "under_25", label: "Under 25%" },
        { value: "25_to_50", label: "25–50%" },
        { value: "50_to_75", label: "50–75%" },
        { value: "over_75", label: "Over 75%" },
        NOT_SURE,
      ],
    },
    {
      field: "staffCpaDepth",
      label: "Beyond yourself, how many licensed CPAs/EAs work at the firm?",
      options: [
        { value: "multiple_licensed_staff", label: "Multiple" },
        { value: "one_other_licensed", label: "One other" },
        { value: "owner_only_licensed", label: "None — I'm the only one" },
        NOT_SURE,
      ],
    },
  ],
};

export function getIndustryQuestions(industryId: string): IndustryQuestion[] {
  return INDUSTRY_QUESTIONS[industryId] ?? [];
}
