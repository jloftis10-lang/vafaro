import Link from "next/link";

import { CATEGORY_WEIGHTS } from "@/lib/assessment/categories";
import type { RiskFlag, RiskSeverity } from "@/lib/assessment/types";

interface RisksSectionProps {
  risks: RiskFlag[];
}

/**
 * One link per Buyer Lens category — all four now have a real target page
 * (transferability folds in both owner-dependency and management-depth
 * risk rules, so it links to the more central of the two; that article
 * cross-links to the other in its own relatedSlugs).
 */
const CATEGORY_RESOURCE_LINK: Partial<
  Record<RiskFlag["category"], { href: string; label: string }>
> = {
  earningsQuality: {
    href: "/resources/quality-of-earnings",
    label: "Learn why documented, defensible financials matter to buyers",
  },
  transferability: {
    href: "/resources/owner-dependency",
    label: "Learn why owner dependency is the single biggest lever on valuation",
  },
  concentrationRisk: {
    href: "/resources/customer-concentration",
    label: "Learn why buyers draw the line around 20% concentration",
  },
  revenueQuality: {
    href: "/resources/recurring-revenue",
    label: "Learn why recurring revenue commands a premium",
  },
};

const SEVERITY_RANK: Record<RiskSeverity, number> = { critical: 0, important: 1, opportunity: 2 };

const SEVERITY_LABEL: Record<RiskSeverity, string> = {
  critical: "Critical",
  important: "Important",
  opportunity: "Opportunity",
};

const SEVERITY_STYLES: Record<RiskSeverity, string> = {
  critical: "border-red-200 bg-red-50 text-red-800",
  important: "border-accent/30 bg-accent-soft text-accent",
  opportunity: "border-line bg-canvas text-muted",
};

const MAX_RISKS_SHOWN = 5;

export function RisksSection({ risks }: RisksSectionProps) {
  const holdBacks = risks
    .filter((risk) => risk.severity === "critical" || risk.severity === "important")
    .sort((a, b) => {
      const severityDiff = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
      if (severityDiff !== 0) return severityDiff;
      return CATEGORY_WEIGHTS[b.category] - CATEGORY_WEIGHTS[a.category];
    })
    .slice(0, MAX_RISKS_SHOWN);

  if (holdBacks.length === 0) return null;

  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-primary">
        What Buyers May Question
      </h2>
      <div className="mt-5 space-y-4">
        {holdBacks.map((risk) => (
          <div key={risk.id} className="rounded-md border border-line p-4">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${SEVERITY_STYLES[risk.severity]}`}
              >
                {SEVERITY_LABEL[risk.severity]}
              </span>
              <p className="text-sm font-medium text-ink">{risk.title}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              <span className="font-medium text-ink">What we found: </span>{risk.explanation}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              <span className="font-medium text-ink">Why buyers care: </span>
              {risk.whyBuyersCare}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              <span className="font-medium text-ink">What to do: </span>
              {risk.recommendedAction}
            </p>
            {CATEGORY_RESOURCE_LINK[risk.category] && (
              <Link
                href={CATEGORY_RESOURCE_LINK[risk.category]!.href}
                className="mt-2 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {CATEGORY_RESOURCE_LINK[risk.category]!.label} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
