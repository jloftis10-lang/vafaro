import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { INDUSTRY_GUIDES } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industry Guides | OwnerGauge",
  description:
    "Industry-specific guidance on how businesses are valued and what buyers evaluate before a sale.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndexPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
            Industries
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Industry Guides
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            What actually drives value and buyer confidence looks different
            from one industry to the next. These guides cover the factors
            specific to a few industries where we can offer genuinely useful
            detail — more are on the way.
          </p>

          <div className="mt-12 space-y-6">
            {INDUSTRY_GUIDES.map((guide) => {
              return (
                <Link
                  key={guide.slug}
                  href={`/industries/${guide.slug}`}
                  className="block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-muted-soft"
                >
                  <p className="font-display text-xl text-primary">{guide.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{guide.intro}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-accent">
                    Valuation · buyer diligence · sale preparation
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
