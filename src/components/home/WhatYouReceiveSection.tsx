const OUTPUTS = [
  {
    title: "Estimated Market Value",
    description:
      "A directional market value range based on earnings, industry characteristics, and company-specific factors.",
  },
  {
    title: "Deal Readiness Score",
    description:
      "An assessment of how prepared the business appears to be for buyer scrutiny and transaction diligence.",
  },
  {
    title: "Transaction Risks",
    description:
      "Issues such as owner dependency, customer concentration, financial documentation quality, and management depth.",
  },
  {
    title: "Three Priority Actions",
    description: "What may be worth addressing before going to market, ranked by impact.",
  },
];

export function WhatYouReceiveSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
          What you receive
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-primary">
          More than a number
        </h2>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {OUTPUTS.map((output) => (
          <div key={output.title} className="border-t border-line pt-5">
            <dt className="font-display text-lg text-primary">{output.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{output.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
