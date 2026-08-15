import Link from "next/link";

import type { ReadinessResult } from "@/lib/assessment/types";

interface ReadinessSectionProps {
  readiness: ReadinessResult;
}

/**
 * "Concentration Risk — 92" reads ambiguously: is 92 good or bad, given the
 * category label itself says "Risk"? The score is 0-100 with higher always
 * better, same as every other category, so it needs a qualitative
 * risk-framed readout here rather than the bare number (master prompt
 * section 30). Same score, same 4-category model — only the display for
 * this one category changes.
 */
function concentrationRiskReadout(score: number): string {
  if (score >= 70) return "Low";
  if (score >= 40) return "Moderate";
  return "Elevated";
}

export function ReadinessSection({ readiness }: ReadinessSectionProps) {
  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent">
        Deal readiness
      </p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-4xl font-semibold text-primary sm:text-5xl">
          {readiness.totalScore}
        </span>
        <span className="text-lg text-muted">/ 100</span>
        <span className="text-lg font-medium text-ink">{readiness.band}</span>
      </div>
      <p className="mt-2 text-sm text-muted">
        A directional read on how prepared your business looks for a sale process,
        based on your answers below.
      </p>
      <p className="mt-4 leading-relaxed text-ink">{readiness.summary}</p>
      {readiness.capReasons.length > 0 && (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">Headline score limited by a severe transaction risk</p>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-red-800">
            {readiness.capReasons.map((reason) => <li key={reason}>— {reason}</li>)}
          </ul>
          <p className="mt-2 text-xs text-red-700">Strong scores elsewhere do not offset these issues in a real sale process.</p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {readiness.categories.map((category) => (
          <div key={category.key}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">{category.label}</span>
              <span className="text-muted">
                {category.key === "concentrationRisk"
                  ? `${concentrationRiskReadout(category.score)} (${category.score})`
                  : category.score}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${category.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/sell-your-business"
        className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        See what a real sale process actually involves →
      </Link>
    </section>
  );
}
