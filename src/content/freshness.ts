export type ReviewCadence = "quarterly" | "semiannual" | "annual" | "evergreen";

export interface ContentFreshness {
  /** The period the page's cited data reflects, e.g. "Q4 2025" — distinct from when the page itself was last edited. */
  dataAsOf?: string;
  /** ISO date (YYYY-MM-DD) — when this content is next due for a human review pass. Omit for "evergreen" content with no time-sensitive claims. */
  nextReviewAt?: string;
  reviewCadence: ReviewCadence;
}

export interface PillarMetadata extends ContentFreshness {
  title: string;
  description: string;
  slug: string;
  knowledgeCenter:
    | "valuation"
    | "deal-readiness"
    | "value-drivers"
    | "buyer-intelligence"
    | "selling-process"
    | "deal-terms"
    | "due-diligence"
    | "industry-ma";
  author: string;
  reviewer?: string;
  publishedAt: string;
  updatedAt: string;
  /** Ids into RESEARCH_SOURCES (src/content/sources.ts). */
  sources: string[];
  relatedResources?: string[];
  relatedIndustries?: string[];
  primaryCTA?: string;
}

export interface StaleContentReport {
  slug: string;
  title: string;
  nextReviewAt: string;
  daysOverdue: number;
}

/**
 * Dev-time visibility only — never blocks a build. Call this from a small
 * script (see package.json's `check:content`) or log it manually; it's not
 * wired into the build pipeline on purpose, per the standing instruction
 * that one overdue article shouldn't be able to fail CI.
 */
export function findStaleContent(
  items: Pick<PillarMetadata, "slug" | "title" | "nextReviewAt">[],
  today: Date = new Date(),
): StaleContentReport[] {
  return items
    .filter((item): item is typeof item & { nextReviewAt: string } => Boolean(item.nextReviewAt))
    .filter((item) => new Date(item.nextReviewAt) < today)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      nextReviewAt: item.nextReviewAt,
      daysOverdue: Math.floor(
        (today.getTime() - new Date(item.nextReviewAt).getTime()) / (1000 * 60 * 60 * 24),
      ),
    }));
}
