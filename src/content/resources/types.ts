import type { DisclaimerType } from "@/components/content/Disclaimer";

export interface ResourceArticleSection {
  heading: string;
  paragraphs: string[];
  /** Renders a short, contextual <Disclaimer /> right after this section's paragraphs — e.g. "tax" on a taxes section. */
  disclaimer?: DisclaimerType;
}

export interface ResourceArticle {
  slug: string;
  title: string;
  metaDescription: string;
  dek: string;
  sections: ResourceArticleSection[];
  /** Slugs of other resource articles worth reading next. */
  relatedSlugs: string[];
  /** Links to other site sections (methodology, sell-your-business), not other resource articles. */
  siteLinks?: { href: string; label: string }[];
  /** The period any cited third-party data reflects — shown via <DataFreshness />. Omit for evergreen articles with no time-sensitive stats. */
  dataAsOf?: string;
  /** Ids into RESEARCH_SOURCES (src/content/sources.ts) — rendered as a "Sources & Methodology" block. */
  sourceIds?: string[];
  /** The "factors that help / factors that hurt" two-column callout, e.g. on the multiples article. */
  valuationFactors?: {
    supportingHeading: string;
    supporting: string[];
    pressureHeading: string;
    pressure: string[];
  };
  /** Rendered as a labeled grid, positioned after `sections` — e.g. buyer-type breakdown. */
  buyerTypes?: { name: string; description: string }[];
  /** More heading+paragraphs sections, rendered after `buyerTypes` — split out only so buyerTypes can be interleaved between the two groups. */
  additionalSections?: ResourceArticleSection[];
  /** Renders <ProceedsWaterfall /> right after the intro dek — the enterprise-value-vs-proceeds flagship visual. */
  showProceedsWaterfall?: boolean;
}
