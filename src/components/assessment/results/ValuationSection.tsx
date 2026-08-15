import Link from "next/link";

import { formatCurrency, formatMultiple } from "@/lib/format";
import type { ValuationResult } from "@/lib/types";
import type { EstimateConfidenceLevel } from "@/lib/valuation/confidence";

interface ValuationSectionProps {
  metricType: "sde" | "ebitda";
  valuation: ValuationResult;
}

const CONFIDENCE_LABEL: Record<EstimateConfidenceLevel, string> = {
  higher: "Higher",
  moderate: "Moderate",
  limited: "Limited",
};

export function ValuationSection({ metricType, valuation }: ValuationSectionProps) {
  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent">
        Estimated market value
      </p>
      <p className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">
        {formatCurrency(valuation.valuationLow)} – {formatCurrency(valuation.valuationHigh)}
      </p>
      <p className="mt-2 text-sm text-muted">
        {valuation.isIndustrySpecific ? (
          <>
            Based on approximately {formatMultiple(valuation.multipleLow)} –{" "}
            {formatMultiple(valuation.multipleHigh)} adjusted {metricType.toUpperCase()}.
          </>
        ) : (
          <>
            Directional planning range based on reported {metricType.toUpperCase()} and broad,
            provisional assumptions&mdash;not a current industry transaction benchmark.
          </>
        )}
      </p>
      <div className="mt-5 rounded-md border border-line bg-canvas px-4 py-3">
        <p className="text-sm font-medium text-ink">
          Estimate confidence: {CONFIDENCE_LABEL[valuation.estimateConfidence.level]}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{valuation.estimateConfidence.explanation}</p>
      </div>
      <p className="mt-6 leading-relaxed text-ink">{valuation.commentary}</p>
      <Link
        href="/resources/ebitda-multiple"
        className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Learn why multiples vary this much between businesses →
      </Link>

      <details className="mt-6 rounded-md border border-line">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-ink">
          Why this valuation?
        </summary>
        <dl className="space-y-4 border-t border-line px-4 py-4 text-sm">
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Market Segment</dt>
            <dd className="mt-1 text-ink">{valuation.marketSegment}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Valuation Basis</dt>
            <dd className="mt-1 text-ink">{metricType.toUpperCase()}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Market Evidence</dt>
            <dd className="mt-1 text-ink">
              {valuation.industryLabel}
              {valuation.isIndustrySpecific ? "" : " — broad-market planning range"}, based on {formatMultiple(valuation.benchmarkLow)}–{formatMultiple(valuation.benchmarkHigh)} {metricType.toUpperCase()}.
            </dd>
          </div>
          {valuation.positiveFactors.length > 0 && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
                Factors Supporting the Range
              </dt>
              <dd className="mt-1 text-ink">
                <ul className="list-inside list-disc space-y-0.5">
                  {valuation.positiveFactors.map((factor) => (
                    <li key={factor}>{factor}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {valuation.negativeFactors.length > 0 && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
                Factors Creating Pressure
              </dt>
              <dd className="mt-1 text-ink">
                <ul className="list-inside list-disc space-y-0.5">
                  {valuation.negativeFactors.map((factor) => (
                    <li key={factor}>{factor}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Estimate Confidence</dt>
            <dd className="mt-1 text-ink">{CONFIDENCE_LABEL[valuation.estimateConfidence.level]}</dd>
          </div>
        </dl>
      </details>

      <p className="mt-6 rounded-md bg-canvas px-4 py-3 text-xs leading-relaxed text-muted">
        Assumption basis: {valuation.assumptionBasis}
      </p>
      <p className="mt-3 rounded-md bg-canvas px-4 py-3 text-xs leading-relaxed text-muted">
        This is a directional estimate for planning purposes only. It is not a formal
        business valuation, appraisal, or fairness opinion, and shouldn&apos;t be relied
        on for tax, legal, or transaction purposes.
      </p>
    </section>
  );
}
