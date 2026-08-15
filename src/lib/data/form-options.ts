import type {
  CustomerConcentrationOption,
  OwnerInvolvementOption,
  RecurringRevenueOption,
  TrendOption,
} from "@/lib/types";

interface Option<T extends string> {
  value: T;
  label: string;
}

export const TREND_OPTIONS: Option<TrendOption>[] = [
  { value: "declining", label: "Declining" },
  { value: "flat", label: "Flat" },
  { value: "growing_0_10", label: "Growing 0–10% per year" },
  { value: "growing_10_plus", label: "Growing 10%+ per year" },
];

export const OWNER_INVOLVEMENT_OPTIONS: Option<OwnerInvolvementOption>[] = [
  {
    value: "owner_essential",
    label: "Owner is essential day-to-day",
  },
  {
    value: "owner_part_time",
    label: "Owner works part-time in the business",
  },
  {
    value: "runs_without_owner",
    label: "Business runs without the owner",
  },
];

export const CUSTOMER_CONCENTRATION_OPTIONS: Option<CustomerConcentrationOption>[] =
  [
    { value: "under_10", label: "Top customer is under 10% of revenue" },
    { value: "between_10_25", label: "Top customer is 10–25% of revenue" },
    { value: "over_25", label: "Top customer is 25%+ of revenue" },
  ];

export const RECURRING_REVENUE_OPTIONS: Option<RecurringRevenueOption>[] = [
  { value: "none", label: "None" },
  { value: "under_30", label: "Some, under 30% of revenue" },
  { value: "majority_30_plus", label: "Majority, 30%+ of revenue" },
];
