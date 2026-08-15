import type { ReadinessCategoryKey, ReadinessResult } from "@/lib/assessment/types";

export type SnapshotTone = "strong" | "moderate" | "risk";

export interface SnapshotItem {
  label: string;
  value: string;
  tone: SnapshotTone;
}

function categoryScore(readiness: ReadinessResult, key: ReadinessCategoryKey): number {
  return readiness.categories.find((c) => c.key === key)?.score ?? 50;
}

/** For categories where a higher score is unambiguously good (quality, depth, durability). */
function positiveBand(score: number): { value: string; tone: SnapshotTone } {
  if (score >= 70) return { value: "Strong", tone: "strong" };
  if (score >= 40) return { value: "Moderate", tone: "moderate" };
  return { value: "Needs Attention", tone: "risk" };
}

/** For categories framed as a risk to the buyer (dependency, concentration) — same underlying score, inverted label. */
function riskBand(score: number): { value: string; tone: SnapshotTone } {
  if (score >= 70) return { value: "Low Risk", tone: "strong" };
  if (score >= 40) return { value: "Moderate Risk", tone: "moderate" };
  return { value: "Elevated Risk", tone: "risk" };
}

/**
 * A one-glance summary row for the results report — one qualitative label
 * per Buyer Lens category, derived from the same readiness category scores
 * already computed, not a new scoring model. Purely presentational.
 */
export function buildTransactionSnapshot(readiness: ReadinessResult): SnapshotItem[] {
  return [
    { label: "Revenue Quality", ...positiveBand(categoryScore(readiness, "revenueQuality")) },
    { label: "Earnings Quality", ...positiveBand(categoryScore(readiness, "earningsQuality")) },
    { label: "Transferability", ...riskBand(categoryScore(readiness, "transferability")) },
    { label: "Concentration Risk", ...riskBand(categoryScore(readiness, "concentrationRisk")) },
  ];
}
