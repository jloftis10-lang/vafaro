import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Methodology | OwnerGauge",
  description:
    "How OwnerGauge estimates market value and evaluates deal readiness, and what the assessment is — and isn't.",
  alternates: { canonical: "/methodology" },
};

const READINESS_CATEGORIES = [
  {
    name: "Revenue Quality",
    description:
      "How predictable, durable, and trending your revenue is — recurring or contracted share, retention, and revenue/earnings trend over time.",
  },
  {
    name: "Earnings Quality",
    description:
      "How current, complete, and well-supported your reported earnings are — records currency, financial history, and documentation behind any add-backs.",
  },
  {
    name: "Transferability",
    description:
      "How well the business would keep running and retain its economics without you — owner hours, what happens in your absence, customer relationship ownership, and management/process depth beyond you.",
  },
  {
    name: "Concentration Risk",
    description: "How concentrated revenue is in your largest customer, and whether that relationship is protected.",
  },
];

const NOT_LIST = [
  "A certified business valuation",
  "A formal appraisal",
  "A fairness opinion",
  "An investment banking engagement",
  "Legal, accounting, or tax advice",
  "A guarantee of any transaction outcome or price",
];

export default function MethodologyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
            Methodology
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            How OwnerGauge&apos;s Assessment Works
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            The assessment produces two separate outputs — an estimated market
            value and a Deal Readiness score — plus a set of risk flags. They
            are kept separate deliberately: a valuable business can still be
            poorly prepared for a transaction, and a well-prepared business
            can still have a weaker valuation profile.
          </p>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-primary">
              How OwnerGauge Estimates Market Value
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              OwnerGauge first selects the applicable market benchmark for the
              industry and earnings metric you report — SDE (Seller&apos;s
              Discretionary Earnings) or EBITDA — from its underlying
              benchmark records, each carrying its own evidence quality,
              applicability, and approved use in the calculation. Rather than
              shifting a single starting multiple up or down by fixed
              amounts, OwnerGauge positions your business within that
              benchmark&apos;s supported multiple range based on
              company-specific quality factors — your revenue trend, how
              dependent the business is on you, customer concentration, and
              how much of your revenue is recurring. A stronger profile
              across those factors places the estimate toward the top of the
              range; a weaker profile places it toward the bottom. That
              positioned point is then applied to your earnings figure to
              produce a range rather than a single number.
            </p>
            <p className="mt-4 leading-relaxed text-ink">
              SDE is generally most useful for an owner-operated business because it
              includes the economic benefit available to one working owner. EBITDA is
              generally more relevant when the company has a management structure and
              owner compensation should be treated as a market-rate operating expense.
              They are not interchangeable, and a buyer may recast either figure.
            </p>
            <p className="mt-4 leading-relaxed text-ink">
              This logic is entirely rule-based — there is no AI model
              generating your valuation. The same inputs will always produce
              the same output, which is what makes it explainable and
              testable rather than a black box.
            </p>
            <Link
              href="/resources/sde-vs-ebitda"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Not sure which one applies to you? Read SDE vs. EBITDA →
            </Link>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Why Company Size Matters
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              A $1M revenue, owner-operated company and a $100M revenue
              platform in the same industry are not comparable businesses,
              even though they share a category label. OwnerGauge classifies
              every assessment into a broad market segment by revenue — Micro,
              Small / Main Street, Lower Middle Market, or Middle Market —
              specifically so a small business is never silently compared
              against transaction data collected from much larger deals.
            </p>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Why Buyer Type Matters
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              Individual buyers, strategic acquirers, private equity platforms
              and add-ons, family offices, and search funds all price the same
              business differently, because they&apos;re solving different
              problems. OwnerGauge&apos;s underlying benchmark data tracks which
              buyer population a given data point actually represents, so a
              multiple observed in PE-sponsored platform transactions is never
              silently applied as if it were representative of every buyer
              type.
            </p>
            <Link
              href="/resources/ebitda-multiple"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Read more on how buyer type and size change the multiple →
            </Link>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">
              What Estimate Confidence Means
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              Every valuation result includes an Estimate Confidence label —
              Higher, Moderate, or Limited. This measures confidence in the
              underlying market data&apos;s applicability to your business,
              not confidence that your business is well run. A poorly
              prepared business can still get a high-confidence range if
              strong comparable-market evidence exists; a well-run business in
              an under-researched industry can still get a limited-confidence
              range. As of this writing, no industry in OwnerGauge&apos;s taxonomy
              has verified institutional transaction data wired into the
              calculator yet — every result currently caps at Moderate
              confidence, built from OwnerGauge&apos;s own directional research
              rather than a certified third-party dataset. That&apos;s stated
              plainly in every report, not hidden behind a score.
            </p>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">
              How Deal Readiness Is Evaluated
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              Deal Readiness is scored across four categories, each
              normalized to a 0–100 scale and combined into a single
              weighted score:
            </p>
            <dl className="mt-6 space-y-4">
              {READINESS_CATEGORIES.map((category) => (
                <div key={category.name}>
                  <dt className="font-medium text-ink">{category.name}</dt>
                  <dd className="mt-1 text-sm text-muted">{category.description}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 leading-relaxed text-ink">
              Most weaknesses affect the weighted score in proportion to their
              category. Three severe conditions also place a ceiling on the
              headline score: unusable and stale financial records, inability
              to operate through an extended owner absence, or one customer
              representing more than half of revenue. The report still shows
              every category so the reason for the result remains visible.
            </p>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">Why Readiness Is Not Valuation</h2>
            <p className="mt-4 leading-relaxed text-ink">
              Value is an estimate of economic consideration; readiness is a diagnostic of
              evidence, transferability, and execution risk. Better preparation can improve
              buyer confidence and reduce avoidable friction, but a readiness score is not a
              valuation input and does not promise a higher purchase price.
            </p>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">Limits of a Directional Assessment</h2>
            <p className="mt-4 leading-relaxed text-ink">
              The assessment does not verify financial statements, normalize working capital,
              value real estate or excess assets, model debt or cash, distinguish enterprise
              value from equity proceeds, evaluate tax structure, or reflect current buyer
              demand and comparable transactions. Those questions require documents, context,
              current market evidence, and qualified professional judgment.
            </p>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">
              What the Assessment Is
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              A directional, educational tool. It&apos;s meant to help you
              understand your starting position — what your business might
              be worth, how prepared it looks for buyer scrutiny, and what
              would likely be worth addressing — before you engage in a
              formal sale process.
            </p>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">
              What It Is Not
            </h2>
            <ul className="mt-4 space-y-2">
              {NOT_LIST.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <span aria-hidden className="text-muted">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Every figure OwnerGauge produces is directional and based entirely
              on the information you provide. Submitting an assessment does
              not create an advisory relationship of any kind.
            </p>
          </section>

          <div className="mt-16 text-center">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
