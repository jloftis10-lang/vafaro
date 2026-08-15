import { buildTransactionSnapshot, type SnapshotTone } from "@/lib/assessment/snapshot";
import type { ReadinessResult } from "@/lib/assessment/types";

interface TransactionSnapshotSectionProps {
  readiness: ReadinessResult;
}

const TONE_STYLES: Record<SnapshotTone, string> = {
  strong: "text-primary",
  moderate: "text-accent",
  risk: "text-red-700",
};

export function TransactionSnapshotSection({ readiness }: TransactionSnapshotSectionProps) {
  const items = buildTransactionSnapshot(readiness);

  return (
    <section className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-xl font-semibold text-primary">Transaction Snapshot</h2>
      <p className="mt-1 text-sm text-muted">A quick read on your profile, at a glance.</p>
      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-md border border-line px-4 py-3"
          >
            <dt className="text-sm text-ink">{item.label}</dt>
            <dd className={`text-sm font-medium ${TONE_STYLES[item.tone]}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
