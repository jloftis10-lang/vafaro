import type { ReadinessCategoryKey } from "@/lib/assessment/types";

/**
 * Weights per the Valuation Intelligence + Deal Readiness V1 spec; must sum
 * to 1. Starting weights, mapped from the prior 7-category model's own
 * weights rather than picked cosmetically:
 * revenueQuality 25% = old revenueQuality (15%) + growthMarketPosition (10%)
 * earningsQuality 30% = old financialReadiness (25%, bumped)
 * transferability 30% = old ownerIndependence (20%) + managementOperations (15%, trimmed from 35%)
 * concentrationRisk 15% = old customerCommercialRisk (10%, bumped)
 */
export const CATEGORY_WEIGHTS: Record<ReadinessCategoryKey, number> = {
  earningsQuality: 0.3,
  revenueQuality: 0.25,
  transferability: 0.3,
  concentrationRisk: 0.15,
};

export const CATEGORY_LABELS: Record<ReadinessCategoryKey, string> = {
  revenueQuality: "Revenue Quality",
  earningsQuality: "Earnings Quality",
  transferability: "Transferability",
  concentrationRisk: "Concentration Risk",
};

export const READINESS_CATEGORY_ORDER: ReadinessCategoryKey[] = [
  "revenueQuality",
  "earningsQuality",
  "transferability",
  "concentrationRisk",
];
