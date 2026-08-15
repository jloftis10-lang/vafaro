function Arrow() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <span className="text-muted">↓</span>
    </div>
  );
}

function DeductionRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-md border border-line bg-canvas px-4 py-2 text-sm text-muted">
      <span aria-hidden>−</span>
      <span>{label}</span>
    </div>
  );
}

/**
 * The Flagship 1 visual: headline enterprise value flowing down through
 * deductions, splitting into guaranteed-vs-contingent consideration, then
 * summing to total potential consideration. Deliberately has no numbers —
 * this is a structural illustration, not a calculator (that's explicit
 * future scope per the content master prompt, not this phase).
 */
export function ProceedsWaterfall() {
  return (
    <figure className="my-10 rounded-lg border border-line bg-surface p-6 sm:p-8">
      <div className="mx-auto max-w-md text-center">
        <div className="rounded-md border border-primary bg-canvas px-4 py-3 font-display text-base font-semibold text-primary">
          Headline Enterprise Value
        </div>

        <Arrow />
        <DeductionRow label="Debt / debt-like items" />
        <Arrow />
        <DeductionRow label="Working-capital adjustment" />
        <Arrow />
        <DeductionRow label="Transaction expenses" />
        <Arrow />

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-accent">
          Splits into
        </p>

        <div className="grid grid-cols-2 gap-2 text-left sm:grid-cols-4">
          <div className="rounded-md border border-primary/40 bg-canvas p-2.5">
            <p className="text-xs font-semibold text-primary">Cash at Close</p>
            <p className="mt-1 text-[11px] leading-snug text-muted">Immediate, unconditional</p>
          </div>
          <div className="rounded-md border border-line bg-canvas p-2.5">
            <p className="text-xs font-semibold text-ink">Seller Note</p>
            <p className="mt-1 text-[11px] leading-snug text-muted">Repaid over time</p>
          </div>
          <div className="rounded-md border border-line bg-canvas p-2.5">
            <p className="text-xs font-semibold text-ink">Earnout</p>
            <p className="mt-1 text-[11px] leading-snug text-muted">Contingent on results</p>
          </div>
          <div className="rounded-md border border-line bg-canvas p-2.5">
            <p className="text-xs font-semibold text-ink">Rollover Equity</p>
            <p className="mt-1 text-[11px] leading-snug text-muted">Future, illiquid upside</p>
          </div>
        </div>

        <Arrow />
        <div className="rounded-md border border-primary bg-canvas px-4 py-3 font-display text-base font-semibold text-primary">
          Total Potential Consideration
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs leading-relaxed text-muted">
        Illustrative structure, not a calculation. Only Cash at Close is immediate and
        unconditional — everything to its right is real value the seller may never fully
        collect, or may collect later and at risk.
      </figcaption>
    </figure>
  );
}
