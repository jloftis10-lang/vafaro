interface DataFreshnessProps {
  dataAsOf?: string;
  updatedAt?: string;
}

/**
 * Restrained, editorial data-freshness line — "Market data through Q4 2025"
 * or "Last updated August 2026" — not a database timestamp dump. Use
 * sparingly: once near the top of a stat-heavy page, not on every section.
 */
export function DataFreshness({ dataAsOf, updatedAt }: DataFreshnessProps) {
  if (!dataAsOf && !updatedAt) return null;

  return (
    <p className="text-xs text-muted">
      {dataAsOf && <>Market data through {dataAsOf}</>}
      {dataAsOf && updatedAt && " · "}
      {updatedAt && <>Last updated {updatedAt}</>}
    </p>
  );
}
