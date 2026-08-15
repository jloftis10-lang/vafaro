import { CATEGORY_WEIGHTS } from "@/lib/assessment/categories";
import { ACTION_TITLES_BY_RISK_ID } from "@/lib/assessment/risks";
import type { Recommendation, RiskFlag, RiskSeverity } from "@/lib/assessment/types";

const SEVERITY_RANK: Record<RiskSeverity, number> = {
  critical: 0,
  important: 1,
  opportunity: 2,
};

const MAX_RECOMMENDATIONS = 3;

/**
 * Surfaces the top 3 highest-impact actions: all critical risks outrank all
 * important risks, which outrank all opportunities. Ties within the same
 * severity break toward the higher-weighted readiness category, since a
 * critical issue in Financial Readiness (25%) is more consequential than
 * one in a lighter-weighted category.
 */
export function rankRecommendations(flags: RiskFlag[]): Recommendation[] {
  const sorted = [...flags].sort((a, b) => {
    const severityDiff = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return CATEGORY_WEIGHTS[b.category] - CATEGORY_WEIGHTS[a.category];
  });

  return sorted.slice(0, MAX_RECOMMENDATIONS).map((flag, index) => ({
    id: `rec-${flag.id}`,
    rank: index + 1,
    title: ACTION_TITLES_BY_RISK_ID[flag.id] ?? flag.title,
    detail: flag.recommendedAction,
    sourceRiskId: flag.id,
  }));
}
