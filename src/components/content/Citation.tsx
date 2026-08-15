import { getResearchSource } from "@/content/sources";

interface CitationProps {
  sourceId: string;
  children: React.ReactNode;
}

/**
 * Wraps a claim in an inline link to its source, e.g.
 * <Citation sourceId="ibba-market-pulse-q4-2025">IBBA & M&A Source's Q4 2025 Market Pulse survey</Citation>
 * Never hardcode a source name/URL directly in page copy — route it through
 * RESEARCH_SOURCES so every citation of the same source stays consistent
 * and updatable in one place.
 */
export function Citation({ sourceId, children }: CitationProps) {
  const source = getResearchSource(sourceId);

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-line decoration-1 underline-offset-2 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  );
}

interface SourcesListProps {
  sourceIds: string[];
}

/** Renders the compact "Sources & Methodology" block for the bottom of a stat-heavy page. */
export function SourcesList({ sourceIds }: SourcesListProps) {
  if (sourceIds.length === 0) return null;
  const sources = sourceIds.map(getResearchSource);

  return (
    <section className="mt-14 border-t border-line pt-8">
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent">
        Sources &amp; Methodology
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
        {sources.map((source) => (
          <li key={source.id}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line decoration-1 underline-offset-2 transition-colors hover:decoration-accent"
            >
              {source.publisher} — {source.title}
            </a>
            {source.dataAsOf && <span> (data as of {source.dataAsOf})</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
