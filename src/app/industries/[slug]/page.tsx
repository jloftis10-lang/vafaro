import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getIndustryGuideBySlug, INDUSTRY_GUIDES } from "@/content/industries";
import { SITE_URL } from "@/lib/content/brand";
import { INDUSTRY_VALUATION_PROFILES } from "@/lib/data/valuation-assumptions";

interface IndustryGuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRY_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: IndustryGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getIndustryGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: `${guide.name} Valuation & Sale Guide | OwnerGauge`,
    description: guide.metaDescription,
    alternates: { canonical: `/industries/${guide.slug}` },
    openGraph: { title: `${guide.name} Valuation & Sale Guide`, description: guide.metaDescription, url: `/industries/${guide.slug}` },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-ink">
          <span aria-hidden className="mt-1 text-accent">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function IndustryGuidePage({ params }: IndustryGuidePageProps) {
  const { slug } = await params;
  const guide = getIndustryGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const hasReviewedMultiple = Boolean(INDUSTRY_VALUATION_PROFILES[guide.industryId]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.name,
        item: `${SITE_URL}/industries/${guide.slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/industries"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            ← All industries
          </Link>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-accent">
            Industry Guide
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            {guide.name}: Business Valuation &amp; Sale Guide
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{guide.intro}</p>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">
              How {guide.name} Companies Are Valued
            </h2>
            {guide.valuationParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-ink">
                {paragraph}
              </p>
            ))}
            <p className="mt-4 rounded-md bg-canvas px-4 py-3 text-sm leading-relaxed text-muted">
              {hasReviewedMultiple
                ? "The assessment applies a reviewed multiple range for this industry, informed by public benchmark data — it remains a directional planning estimate, not a transaction comp."
                : "OwnerGauge does not present an industry multiple here without a reviewed source and effective date. The assessment uses a broad planning range and clearly labels it as directional."}{" "}
              <Link href="/methodology" className="text-primary underline-offset-4 hover:underline">See our methodology →</Link>
            </p>
          </section>

          {guide.revenueQuality && <section className="mt-14 border-t border-line pt-10"><h2 className="font-display text-2xl font-semibold text-primary">Revenue Quality in {guide.name}</h2><BulletList items={guide.revenueQuality} /></section>}
          {guide.ownerDependency && <section className="mt-14 border-t border-line pt-10"><h2 className="font-display text-2xl font-semibold text-primary">Owner Dependency</h2><BulletList items={guide.ownerDependency} /></section>}
          {guide.managementWorkforce && <section className="mt-14 border-t border-line pt-10"><h2 className="font-display text-2xl font-semibold text-primary">Management &amp; Workforce</h2><BulletList items={guide.managementWorkforce} /></section>}
          {guide.growthDrivers && <section className="mt-14 border-t border-line pt-10"><h2 className="font-display text-2xl font-semibold text-primary">What Can Make the Business More Attractive</h2><BulletList items={guide.growthDrivers} /></section>}

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">
              What Can Influence Valuation
            </h2>
            <BulletList items={guide.influenceFactors} />
          </section>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">
              What Buyers May Evaluate
            </h2>
            <BulletList items={guide.buyerConsiderations} />
          </section>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Common Transaction Risks
            </h2>
            <BulletList items={guide.transactionRisks} />
          </section>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Preparing the Company for Sale
            </h2>
            <BulletList items={guide.preparationTips} />
          </section>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">
              How the Sale Process Works
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              Every sale moves through the same general stages — preparation,
              valuation, positioning, marketing, buyer outreach, indications
              of interest, a letter of intent, due diligence, definitive
              documentation, and closing.
            </p>
            <Link
              href="/sell-your-business"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See the full process →
            </Link>
          </section>

          <div className="mt-16 rounded-lg border border-line bg-surface p-8 text-center">
            <p className="font-display text-xl text-primary">
              Curious what your {guide.name} business could be worth?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Estimate your market value and see how prepared your business
              looks for a sale.
            </p>
            <Link
              href="/calculator"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-primary-dark"
            >
              {guide.assessmentCta ?? "Estimate Your Business Value & Deal Readiness"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
