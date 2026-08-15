import Link from "next/link";

const STAGES = [
  "Prepare",
  "Valuation",
  "Positioning",
  "Marketing",
  "Buyer Outreach",
  "LOI",
  "Due Diligence",
  "Closing",
];

export function SaleProcessSection() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
            The process
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-primary">
            Selling a business is a process — not an event
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Most owners have never gone through a sale before. Knowing the stages ahead of
            time — and where you currently stand — makes the eventual process far less
            uncertain.
          </p>
        </div>

        <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
          {STAGES.map((stage, index) => (
            <li key={stage} className="flex items-center gap-2">
              <span className="rounded-full border border-line bg-canvas px-4 py-1.5 text-sm font-medium text-ink">
                {stage}
              </span>
              {index < STAGES.length - 1 && (
                <span aria-hidden className="text-muted">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 text-center">
          <Link
            href="/sell-your-business"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See how each stage works →
          </Link>
        </div>
      </div>
    </section>
  );
}
