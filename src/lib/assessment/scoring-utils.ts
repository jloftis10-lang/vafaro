import type { RevenueGrowth, SaleTimeline } from "@/lib/assessment/types";

/**
 * Scores a value 0–100 by its position in an array ordered best-to-worst.
 * Evenly spaced: first option scores 100, last scores 0. Used across the
 * readiness and lead-score engines so every ordinal question is scored the
 * same, defensible way.
 */
export function scoreFromOrderedOptions<T extends string>(
  value: T,
  orderedBestToWorst: readonly T[],
): number {
  const index = orderedBestToWorst.indexOf(value);
  if (index === -1 || orderedBestToWorst.length <= 1) return 50;
  return Math.round((100 * (orderedBestToWorst.length - 1 - index)) / (orderedBestToWorst.length - 1));
}

export function average(scores: number[]): number {
  if (scores.length === 0) return 50;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

// Shared across the readiness (Growth & Market Position) and lead-score
// (Growth, Transaction Timing) engines.

export const REVENUE_GROWTH_ORDER: readonly RevenueGrowth[] = [
  "growing_20_plus",
  "growing_10_20",
  "growing_1_10",
  "flat",
  "declining",
];

export const SALE_TIMELINE_ORDER: readonly SaleTimeline[] = [
  "now",
  "within_12_months",
  "one_to_two_years",
  "three_to_five_years",
  "no_specific_timeline",
];
