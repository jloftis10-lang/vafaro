import type {
  CustomerConcentrationOption,
  OwnerInvolvementOption,
  RecurringRevenueOption,
  TrendOption,
} from "@/lib/types";

/**
 * STUB VALUES — placeholder adjustment weights for V1.
 *
 * Each table maps a form option to how many "multiple points" it adds or
 * subtracts. Ranges per the spec: trend and owner involvement each span
 * -0.5x to +0.5x, customer concentration spans -0.5x to 0, and recurring
 * revenue spans 0 to +0.5x. Swap these numbers out once the real weights
 * are provided — the option keys (and the UI) don't need to change.
 */

export const TREND_ADJUSTMENTS: Record<TrendOption, number> = {
  declining: -0.5,
  flat: 0,
  growing_0_10: 0.25,
  growing_10_plus: 0.5,
};

export const OWNER_INVOLVEMENT_ADJUSTMENTS: Record<
  OwnerInvolvementOption,
  number
> = {
  owner_essential: -0.5,
  owner_part_time: 0,
  runs_without_owner: 0.5,
};

export const CUSTOMER_CONCENTRATION_ADJUSTMENTS: Record<
  CustomerConcentrationOption,
  number
> = {
  under_10: 0,
  between_10_25: -0.25,
  over_25: -0.5,
};

export const RECURRING_REVENUE_ADJUSTMENTS: Record<
  RecurringRevenueOption,
  number
> = {
  none: 0,
  under_30: 0.25,
  majority_30_plus: 0.5,
};
