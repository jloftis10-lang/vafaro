import Link from "next/link";

import { AuthoritySection } from "@/components/home/AuthoritySection";
import { PrepareSection } from "@/components/home/PrepareSection";
import { SaleProcessSection } from "@/components/home/SaleProcessSection";
import { WhatYouReceiveSection } from "@/components/home/WhatYouReceiveSection";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BRAND } from "@/lib/content/brand";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <div className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
              Free &amp; confidential
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              Know What Your Business Is Worth — And What Could Stand Between You
              and a Successful Sale
            </h1>
            <p className="mt-3 text-base italic text-muted-soft">{BRAND.tagline}</p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Get a directional market value estimate, assess your deal
              readiness, and identify the issues a buyer is likely to care
              about — before you enter a formal sale process.
            </p>

            <div className="mt-10">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Get Your Free Assessment
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted">
              Confidential · No documents required · Results in minutes
            </p>
          </div>
        </div>

        <WhatYouReceiveSection />
        <SaleProcessSection />
        <PrepareSection />
        <AuthoritySection />
      </main>

      <Footer />
    </div>
  );
}
