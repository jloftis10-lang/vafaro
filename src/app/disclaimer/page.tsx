import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = {
  title: "Disclaimer | OwnerGauge",
  description: "What the OwnerGauge assessment is, and what it explicitly is not.",
};

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Disclaimer
          </h1>

          <section className="mt-10 space-y-4 leading-relaxed text-ink">
            <p>
              OwnerGauge&apos;s business valuation and deal readiness assessment
              produces a directional, educational estimate based entirely on
              the information you provide. It is generated using deterministic
              rule-based logic — not artificial intelligence — described in
              full on our{" "}
              <Link href="/methodology" className="text-primary underline-offset-4 hover:underline">
                Methodology
              </Link>{" "}
              page.
            </p>
            <p className="font-medium text-ink">This assessment is not:</p>
            <ul className="space-y-2">
              {[
                "A certified business valuation",
                "A formal appraisal",
                "A fairness opinion",
                "An investment banking engagement",
                "Legal, accounting, or tax advice",
                "A guarantee of any transaction outcome or price",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-muted">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Submitting an assessment, requesting a report by email, or
              otherwise using this site does not create an advisory,
              consulting, or fiduciary relationship of any kind. For
              decisions about an actual transaction, consult a qualified
              M&amp;A advisor, attorney, and accountant.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
