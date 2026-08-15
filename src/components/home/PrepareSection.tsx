import Link from "next/link";

const FACTORS = [
  "Owner dependency",
  "Financial reporting quality",
  "Customer concentration",
  "Management depth",
  "Recurring revenue",
  "Documented systems",
];

export function PrepareSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Timing</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-primary">
        The best time to prepare for a sale is before you need to sell
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Buyers evaluate more than your top-line numbers. The factors below shape both your
        valuation and how smoothly a transaction goes.
      </p>

      <ul className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2">
        {FACTORS.map((factor) => (
          <li
            key={factor}
            className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink"
          >
            {factor}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          See How Ready Your Business Is
        </Link>
      </div>
    </section>
  );
}
