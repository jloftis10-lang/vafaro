import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import jamesLoftisPhoto from "@/assets/james-loftis.jpg";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { FOUNDER_CONTENT } from "@/lib/content/founder";

export const metadata: Metadata = {
  title: "About | OwnerGauge",
  description:
    "Why OwnerGauge exists, who built it, and the philosophy behind a pre-sale diagnostic for business owners considering a transaction.",
  alternates: { canonical: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FOUNDER_CONTENT.name,
  jobTitle: FOUNDER_CONTENT.title,
  ...(FOUNDER_CONTENT.firm && {
    worksFor: { "@type": "Organization", name: FOUNDER_CONTENT.firm },
  }),
};

export default function AboutPage() {
  const credentialLine = [FOUNDER_CONTENT.title, FOUNDER_CONTENT.firm]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">About</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Why OwnerGauge Exists
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Owners often begin asking what their business is worth — and whether
            it&apos;s ready to sell — years before they are prepared to hire an
            investment banker, M&amp;A advisor, or business broker.
          </p>
          <p className="mt-4 leading-relaxed text-ink">
            OwnerGauge was built to give those owners a better starting point: a
            confidential, self-directed way to understand estimated market
            value, transaction readiness, and the issues a buyer is likely to
            care about — before committing to a formal sale process.
          </p>

          <div className="mt-16 border-t border-line pt-12">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
              Behind OwnerGauge
            </p>
            <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Image
                src={jamesLoftisPhoto}
                alt={FOUNDER_CONTENT.name}
                width={88}
                height={88}
                className="flex-none rounded-full border border-line object-cover"
              />
              <div>
                <p className="font-display text-xl text-primary">{FOUNDER_CONTENT.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {credentialLine}
                  {FOUNDER_CONTENT.credentials.length > 0 &&
                    ` · ${FOUNDER_CONTENT.credentials.join(", ")}`}
                </p>
                <p className="mt-1 text-sm text-muted">{FOUNDER_CONTENT.location}</p>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-ink">{FOUNDER_CONTENT.bio}</p>
          </div>

          <div className="mt-16 border-t border-line pt-12">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
              Philosophy
            </p>
            <ul className="mt-6 space-y-4">
              {FOUNDER_CONTENT.philosophy.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-ink">
                  <span aria-hidden className="mt-1 text-accent">
                    —
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

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
