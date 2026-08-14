import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Compass } from "@phosphor-icons/react/dist/ssr";
import {
  excursionEntries,
  formatEvidenceDate,
  getExcursionEntry,
  type EvidenceStatus,
  type FrictionLevel,
} from "@/lib/excursion-library";

type Props = { params: Promise<{ slug: string }> };

const evidenceLegend: { status: EvidenceStatus; explanation: string }[] = [
  { status: "Verified fact", explanation: "Supported by a linked, dated source." },
  { status: "Planning inference", explanation: "A practical interpretation of the verified route facts." },
  { status: "Operator confirmation needed", explanation: "Specific to the excursion and not established by destination sources." },
];

const levelClass: Record<FrictionLevel, string> = {
  Lower: "level-lower",
  Moderate: "level-moderate",
  High: "level-high",
  Unknown: "level-unknown",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return excursionEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getExcursionEntry(slug);
  if (!entry) return {};

  const canonical = `/excursions/${entry.slug}`;
  return {
    title: entry.seoTitle,
    description: entry.description,
    keywords: [
      `${entry.port} shore excursion walking difficulty`,
      `${entry.port} shore excursion for seniors`,
      `${entry.port} cruise excursion older travelers`,
      "shore excursions for seniors with limited mobility",
      "cruise excursions with aging parents",
    ],
    alternates: { canonical },
    openGraph: {
      title: entry.seoTitle,
      description: entry.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function ExcursionRecordPage({ params }: Props) {
  const { slug } = await params;
  const entry = getExcursionEntry(slug);
  if (!entry) notFound();

  const canonical = `https://www.vafaro.com/excursions/${entry.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: entry.title,
        description: entry.description,
        datePublished: entry.reviewedOn,
        dateModified: entry.reviewedOn,
        author: { "@type": "Organization", name: "Vafaro" },
        publisher: { "@type": "Organization", name: "Vafaro" },
        mainEntityOfPage: canonical,
        about: ["Shore excursion walking difficulty", entry.port, "Travel with older adults"],
        citation: entry.sources.map((source) => source.url),
      },
      {
        "@type": "FAQPage",
        mainEntity: entry.faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vafaro.com" },
          { "@type": "ListItem", position: 2, name: "Excursion library", item: "https://www.vafaro.com/excursions" },
          { "@type": "ListItem", position: 3, name: entry.port, item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="article-page excursion-record-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="nav shell">
        <Link className="brand" href="/">
          <span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro
        </Link>
        <Link className="button button-small" href="/check/excursion">Check your excursion <ArrowRight size={15} /></Link>
      </header>

      <article className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/excursions">Excursion library</Link><span aria-hidden="true">/</span><span>{entry.port}</span>
        </nav>
        <p className="section-kicker">{entry.confidence.toUpperCase()}</p>
        <h1>{entry.title}</h1>
        <p className="article-lead">{entry.lead}</p>
        <div className="evidence-dates">
          <span>Evidence reviewed <strong>{formatEvidenceDate(entry.reviewedOn)}</strong></span>
          <span>Scheduled recheck <strong>{formatEvidenceDate(entry.reviewDueOn)}</strong></span>
        </div>

        <div className="fit-verdict">
          <p className="section-kicker">THE SHORT ANSWER</p>
          <h2>{entry.verdictTitle}</h2>
          <p>{entry.verdict}</p>
        </div>

        <p className="scope-note"><strong>Scope:</strong> {entry.scopeNote}</p>

        <nav className="article-toc" aria-label="On this page">
          <strong>ON THIS PAGE</strong>
          <a href="#fit">Who this route may fit</a>
          <a href="#friction-map">Route friction map</a>
          <a href="#unknowns">Assumptions and unknowns</a>
          <a href="#questions">Questions to ask</a>
          <a href="#gentler-plan">A gentler version</a>
          <a href="#sources">Evidence and sources</a>
        </nav>

        <section id="fit">
          <h2>Who this route may—and may not—fit</h2>
          <div className="fit-columns">
            <div className="fit-column fit-column-good"><h3>More workable when</h3><ul>{entry.bestFit.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="fit-column fit-column-poor"><h3>Higher-risk fit when</h3><ul>{entry.poorFit.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>

        <section id="friction-map">
          <h2>{entry.port} excursion friction map</h2>
          <p>“Unknown” is intentional: it marks a booking decision that destination research alone cannot settle.</p>
          <div className="article-table-wrap">
            <table className="article-table friction-table">
              <thead><tr><th>Stage</th><th>Signal</th><th>What can add effort</th><th>What to verify</th></tr></thead>
              <tbody>
                {entry.frictionMap.map((segment) => (
                  <tr key={segment.stage}>
                    <td><strong>{segment.stage}</strong></td>
                    <td><span className={`friction-level ${levelClass[segment.level]}`}>{segment.level}</span></td>
                    <td>{segment.friction}</td>
                    <td>{segment.verify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="article-caution"><strong>Planning signal only:</strong> This is not medical advice, an accessibility certification, or a guarantee. Weather, crowds, port operations, equipment, and local providers can change.</p>
        </section>

        <section id="unknowns">
          <h2>What this record assumes—and still does not know</h2>
          <div className="assumption-grid">
            <div><h3>Route assumptions</h3><ul>{entry.assumptions.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Operator confirmation needed</h3><ul>{entry.unresolved.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>

        <section id="questions">
          <h2>Ask these questions before booking</h2>
          <ol className="question-list">{entry.questions.map((question) => <li key={question}>{question}</li>)}</ol>
          <p>Save the seller’s answers with the booking. A precise route description is more useful than reassurance that “many seniors take this tour.”</p>
        </section>

        <section id="gentler-plan">
          <h2>What a gentler version looks like</h2>
          <ul>{entry.gentlerPlan.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section>
          <h2>Frequently asked questions</h2>
          <div className="article-faqs">
            {entry.faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section id="sources" className="article-sources">
          <h2>Evidence status and sources</h2>
          <div className="evidence-legend">
            {evidenceLegend.map(({ status, explanation }) => <div key={status}><strong>{status}</strong><span>{explanation}</span></div>)}
          </div>
          <ul className="source-list">
            {entry.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                <span>{source.publisher} · checked {formatEvidenceDate(source.checkedOn)}</span>
                <p>{source.supports}</p>
              </li>
            ))}
          </ul>
          <p className="source-note">Vafaro summarizes sources for trip-planning purposes. Confirm the exact route and current operating details with the excursion seller and official operator before booking.</p>
        </section>

        {entry.relatedGuide ? <p className="related-record"><span>KEEP COMPARING</span><Link href={entry.relatedGuide.href}>{entry.relatedGuide.label} <ArrowRight size={15} /></Link></p> : null}

        <div className="article-cta">
          <p className="section-kicker light">CHECK THE ACTUAL LISTING</p>
          <h2>Does this excursion fit your parent?</h2>
          <p>Paste the exact listing and compare the stated route with the traveler’s comfortable walking, standing, stairs, terrain, and pace.</p>
          <Link className="button" href="/check/excursion">Check the excursion free <ArrowRight size={17} /></Link>
        </div>
      </article>
    </main>
  );
}
