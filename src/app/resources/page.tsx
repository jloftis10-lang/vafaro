import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { RESOURCE_ARTICLES } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources | OwnerGauge",
  description:
    "Plain-English explanations of the M&A concepts that come up when you're exploring a sale — SDE vs. EBITDA, multiples, add-backs, LOIs, and due diligence.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndexPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
            Resources
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            Understanding the M&amp;A Process
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Plain-English explanations of the terms and concepts that come up
            once you start exploring a sale.
          </p>

          <div className="mt-12 space-y-6">
            {RESOURCE_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-muted-soft"
              >
                <p className="font-display text-xl text-primary">{article.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{article.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
