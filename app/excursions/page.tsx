import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "@phosphor-icons/react/dist/ssr";
import { excursionEntries, formatEvidenceDate } from "@/lib/excursion-library";

const canonical = "/excursions";

export const metadata: Metadata = {
  title: "Shore Excursion Walking-Difficulty Guides for Older Travelers",
  description:
    "Source-checked shore excursion fit guides for older travelers, with route assumptions, walking and standing friction, operator questions, and dated evidence.",
  alternates: { canonical },
  openGraph: {
    title: "Vafaro Shore Excursion Fit Library",
    description: "Compare the route details that broad cruise activity labels leave out.",
    url: canonical,
    type: "website",
  },
};

export default function ExcursionLibraryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vafaro Shore Excursion Fit Library",
    description: metadata.description,
    url: `https://www.vafaro.com${canonical}`,
    hasPart: excursionEntries.map((entry) => ({
      "@type": "Article",
      headline: entry.title,
      url: `https://www.vafaro.com/excursions/${entry.slug}`,
    })),
  };

  return (
    <main className="article-page library-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="nav shell">
        <Link className="brand" href="/">
          <span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro
        </Link>
        <Link className="button button-small" href="/check/excursion">Check your excursion <ArrowRight size={15} /></Link>
      </header>

      <article className="article-shell library-shell">
        <p className="section-kicker">THE EXCURSION FIT LIBRARY</p>
        <h1>Know the route—not just the tour name.</h1>
        <p className="article-lead">
          These source-checked records map the transitions, terrain, standing, and unknowns that determine whether a shore excursion works for an older traveler. Each record states what is verified, what is inferred, and what the operator still needs to answer.
        </p>

        <div className="library-principles" aria-label="How to read the library">
          <div><strong>Verified facts</strong><span>Linked to dated, primarily official sources</span></div>
          <div><strong>Route assumptions</strong><span>Visible instead of buried inside a score</span></div>
          <div><strong>Unresolved details</strong><span>Converted into questions for the seller</span></div>
        </div>

        <section>
          <div className="library-heading">
            <div><p className="section-kicker">FIRST PORT RECORDS</p><h2>Built around the excursions families ask about</h2></div>
            <span>{excursionEntries.length} source-checked routes</span>
          </div>
          <div className="library-grid">
            {excursionEntries.map((entry) => (
              <Link className="library-card" href={`/excursions/${entry.slug}`} key={entry.slug}>
                <span className="library-location">{entry.port} · {entry.country}</span>
                <h3>{entry.title}</h3>
                <p>{entry.verdictTitle}</p>
                <span className="library-reviewed">Reviewed {formatEvidenceDate(entry.reviewedOn)}</span>
                <strong>Open the fit record <ArrowRight size={16} /></strong>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2>What this library can—and cannot—tell you</h2>
          <p>
            A route record shows the recurring friction in a destination and the claims supported by current sources. It cannot certify a named excursion, predict day-of operations, or decide what is medically safe for a traveler. Use it to ask better questions, then compare the answers with that person’s actual limits.
          </p>
        </section>

        <div className="article-cta">
          <p className="section-kicker light">CHECK A REAL LISTING</p>
          <h2>Have a specific excursion in mind?</h2>
          <p>Paste the exact listing and compare it with one traveler’s walking, standing, stairs, terrain, and pace preferences.</p>
          <Link className="button" href="/check/excursion">Start the free fit check <ArrowRight size={17} /></Link>
        </div>
      </article>
    </main>
  );
}
