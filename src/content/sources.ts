export interface ResearchSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  publishedAt?: string;
  /** The period the data describes, e.g. "Q4 2025" or "H1 2025" — distinct from publishedAt. */
  dataAsOf?: string;
  accessedAt?: string;
  sourceType:
    | "market-report"
    | "survey"
    | "transaction-data"
    | "professional-guidance"
    | "regulatory"
    | "other";
  notes?: string;
}

/**
 * Every third-party statistic cited on the site must reference an entry
 * here rather than a hardcoded string in JSX — keeps attribution, URLs, and
 * data periods correct and centrally updatable. Only add a source once
 * you've actually verified the figure it backs (via WebSearch or a direct
 * read of the report) — never add a source as a placeholder for a number
 * you intend to fill in "later."
 */
export const RESEARCH_SOURCES: Record<string, ResearchSource> = {
  "ibba-market-pulse-q4-2025": {
    id: "ibba-market-pulse-q4-2025",
    publisher: "IBBA & M&A Source",
    title: "Market Pulse Survey — Q4 2025",
    url: "https://www.prnewswire.com/news-releases/the-ibba-and-ma-source-announce-the-market-pulse-q4-2025-survey-results-302691992.html",
    dataAsOf: "Q4 2025",
    sourceType: "survey",
    notes:
      "Quarterly survey of business brokers and M&A advisors on closed transactions across Main Street through lower-middle-market deal sizes.",
  },
  "gf-data-small-deal-resilience-h1-2025": {
    id: "gf-data-small-deal-resilience-h1-2025",
    publisher: "GF Data",
    title: "Small-Deal Resilience: Why the Under $25 Million Tier Still Moves in H1 2025",
    url: "https://gfdata.com/small-deal-resilience-h1-2025/",
    dataAsOf: "H1 2025",
    sourceType: "transaction-data",
    notes:
      "Aggregated private-equity-sponsored transaction data by enterprise value band, contributed by PE sponsors and their advisors.",
  },
};

export function getResearchSource(id: string): ResearchSource {
  const source = RESEARCH_SOURCES[id];
  if (!source) {
    throw new Error(`Unknown research source id: ${id}`);
  }
  return source;
}
