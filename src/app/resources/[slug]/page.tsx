import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DataFreshness } from "@/components/content/DataFreshness";
import { SourcesList } from "@/components/content/Citation";
import { Disclaimer } from "@/components/content/Disclaimer";
import { ProceedsWaterfall } from "@/components/content/ProceedsWaterfall";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getResourceArticleBySlug, RESOURCE_ARTICLES } from "@/content/resources";
import { SITE_URL } from "@/lib/content/brand";

interface ResourceArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ResourceArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | OwnerGauge`,
    description: article.metaDescription,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: { title: article.title, description: article.metaDescription, url: `/resources/${article.slug}`, type: "article" },
  };
}

export default async function ResourceArticlePage({ params }: ResourceArticlePageProps) {
  const { slug } = await params;
  const article = getResourceArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => getResourceArticleBySlug(relatedSlug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/resources/${article.slug}`,
    author: { "@type": "Organization", name: "OwnerGauge" },
    publisher: { "@type": "Organization", name: "OwnerGauge" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/resources/${article.slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/resources"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            ← All resources
          </Link>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-accent">
            Resources
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{article.dek}</p>
          {article.dataAsOf && (
            <div className="mt-3">
              <DataFreshness dataAsOf={article.dataAsOf} />
            </div>
          )}
          {article.showProceedsWaterfall && <ProceedsWaterfall />}

          <div className="mt-12 space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading} className="border-t border-line pt-8">
                <h2 className="font-display text-xl font-semibold text-primary">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))}
                {section.disclaimer && <Disclaimer type={section.disclaimer} />}
              </section>
            ))}

            {article.buyerTypes && article.buyerTypes.length > 0 && (
              <div className="border-t border-line pt-8">
                <dl className="grid gap-5 sm:grid-cols-2">
                  {article.buyerTypes.map((buyer) => (
                    <div key={buyer.name} className="rounded-lg border border-line bg-surface p-4">
                      <dt className="font-display text-base text-primary">{buyer.name}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted">{buyer.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {article.additionalSections?.map((section) => (
              <section key={section.heading} className="border-t border-line pt-8">
                <h2 className="font-display text-xl font-semibold text-primary">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))}
                {section.disclaimer && <Disclaimer type={section.disclaimer} />}
              </section>
            ))}

            {article.valuationFactors && (
              <div className="border-t border-line pt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {article.valuationFactors.supportingHeading}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {article.valuationFactors.supporting.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                          <span aria-hidden className="mt-0.5 text-accent">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">
                      {article.valuationFactors.pressureHeading}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {article.valuationFactors.pressure.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                          <span aria-hidden className="mt-0.5 text-muted">−</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {article.sourceIds && <SourcesList sourceIds={article.sourceIds} />}

          {article.siteLinks && article.siteLinks.length > 0 && (
            <div className="mt-10 space-y-2">
              {article.siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}

          {relatedArticles.length > 0 && (
            <div className="mt-14 border-t border-line pt-8">
              <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent">
                Related reading
              </p>
              <div className="mt-4 space-y-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/resources/${related.slug}`}
                    className="block text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {related.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 rounded-lg border border-line bg-surface p-8 text-center">
            <p className="font-display text-xl text-primary">
              See where your business stands
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Get an estimated market value and a directional read on your
              deal readiness.
            </p>
            <Link
              href="/calculator"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Get Your Free Assessment
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
