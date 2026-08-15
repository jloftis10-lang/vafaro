/**
 * Size-first segmentation (master prompt section 14) — a $1M owner-operated
 * company shouldn't be compared directly with a $100M PE platform merely
 * because both are in the same industry. Bands use standard M&A market
 * terminology, not arbitrary breakpoints. Based on trailing revenue, which
 * is available as a direct input (unlike enterprise value, which is the
 * thing being estimated).
 */
export type MarketSegment = "Micro" | "Small / Main Street" | "Lower Middle Market" | "Middle Market";

export function getMarketSegment(revenue: number): MarketSegment {
  if (revenue < 1_000_000) return "Micro";
  if (revenue < 5_000_000) return "Small / Main Street";
  if (revenue < 50_000_000) return "Lower Middle Market";
  return "Middle Market";
}
