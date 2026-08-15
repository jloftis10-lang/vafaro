import type { EstimateConfidence } from "@/lib/valuation/confidence";
import type { MarketSegment } from "@/lib/valuation/market-segment";

export type MetricType = "sde" | "ebitda";

export type TrendOption =
  | "declining"
  | "flat"
  | "growing_0_10"
  | "growing_10_plus";

export type OwnerInvolvementOption =
  | "owner_essential"
  | "owner_part_time"
  | "runs_without_owner";

export type CustomerConcentrationOption =
  | "under_10"
  | "between_10_25"
  | "over_25";

export type RecurringRevenueOption = "none" | "under_30" | "majority_30_plus";

export interface ValuationInputs {
  industryId: string;
  revenue: number;
  metricType: MetricType;
  metricValue: number;
  trend: TrendOption;
  ownerInvolvement: OwnerInvolvementOption;
  customerConcentration: CustomerConcentrationOption;
  recurringRevenuePct: RecurringRevenueOption;
}

export interface ValuationResult {
  industryLabel: string;
  /** True when the selected benchmark is specific to this industry rather than the broad-market ("*") fallback. */
  isIndustrySpecific: boolean;
  fallbackLevel: "industry-specific" | "broad-market";
  assumptionBasis: string;
  /** The benchmark's own low/high multiple, before quality positioning and the display spread are applied. */
  benchmarkLow: number;
  benchmarkHigh: number;
  /** Ids of every benchmark that determined the range — the primary anchor plus any range-widening "supporting" records. Audit trail, not shown verbatim in the UI. */
  benchmarkIdsUsed: string[];
  /** Where the company falls within [benchmarkLow, benchmarkHigh]: 0 = bottom, 1 = top. */
  qualityPositionFraction: number;
  qualityPositionLabel: "lower" | "middle" | "upper";
  /** Deterministic, templated factor labels — drives the "Why this valuation?" explanation. */
  positiveFactors: string[];
  negativeFactors: string[];
  multipleLow: number;
  multipleHigh: number;
  valuationLow: number;
  valuationHigh: number;
  commentary: string;
  marketSegment: MarketSegment;
  estimateConfidence: EstimateConfidence;
}
