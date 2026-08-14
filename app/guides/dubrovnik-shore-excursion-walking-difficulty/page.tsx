import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "@phosphor-icons/react/dist/ssr";

const canonical = "/guides/dubrovnik-shore-excursion-walking-difficulty";

export const metadata: Metadata = {
  title: "Dubrovnik Shore Excursion Walking Difficulty for Older Travelers",
  description:
    "Assess a Dubrovnik shore excursion for an older parent: Gruz transfers, Old Town walking, City Walls, stairs, standing, heat, and questions before booking.",
  alternates: { canonical },
  openGraph: {
    title: "Can an Older Traveler Manage a Dubrovnik Shore Excursion?",
    description:
      "A source-checked guide to Dubrovnik Old Town walking, port transfers, City Walls, and excursion fit for families cruising with older adults.",
    url: canonical,
    type: "article",
  },
};

const faqs = [
  {
    question: "Is Dubrovnik Old Town suitable for older travelers?",
    answer:
      "It can be, but the exact route matters. A ground-level visit centered on Stradun is very different from an excursion that adds the City Walls, steep side streets, forts, or prolonged standing in heat and crowds.",
  },
  {
    question: "How far is Dubrovnik cruise port from the Old Town?",
    answer:
      "For ships using Gruz, the Dubrovnik Port Authority estimates roughly 30 to 40 minutes on foot to the Old City. It also lists shorter bus and taxi options. Confirm your ship's berth and the excursion's drop-off point because not every arrival is identical.",
  },
  {
    question: "How difficult is walking the Dubrovnik City Walls?",
    answer:
      "The Port Authority describes the walls as almost two kilometers and estimates 1.5 to 2 hours for the full circuit at a leisurely pace. Wall access also involves steps, so it should not be treated as equivalent to a lower Old Town walk.",
  },
];

export default function DubrovnikExcursionGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Dubrovnik Shore Excursion Walking Difficulty for Older Travelers",
        description: metadata.description,
        datePublished: "2026-08-14",
        dateModified: "2026-08-14",
        author: { "@type": "Organization", name: "Vafaro" },
        publisher: { "@type": "Organization", name: "Vafaro" },
        mainEntityOfPage: `https://www.vafaro.com${canonical}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="nav shell">
        <Link className="brand" href="/">
          <span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro
        </Link>
        <Link className="button button-small" href="/check/excursion">Check your excursion <ArrowRight size={15} /></Link>
      </header>

      <article className="article-shell">
        <p className="section-kicker">SOURCE-CHECKED PORT GUIDE</p>
        <h1>Dubrovnik shore excursion walking difficulty: Old Town is not one experience.</h1>
        <p className="article-lead">
          A level walk along Stradun, a full circuit of the City Walls, and a tour through Dubrovnik’s steep side streets can share the same “Old Town” label while demanding very different stamina. For an older parent, the route and transfer plan matter more than the destination name.
        </p>
        <p className="article-reviewed">Evidence reviewed August 14, 2026 · Recheck berth, traffic, and access details for your sailing date</p>

        <div className="fit-verdict">
          <p className="section-kicker">THE SHORT ANSWER</p>
          <h2>Lower Old Town may be workable. The walls are a separate, higher-effort decision.</h2>
          <p>
            The Dubrovnik Port Authority describes the Old City as pedestrian-only and the wall circuit as almost 2 km, taking about 1.5 to 2 hours at a leisurely pace. Do not let a general “Dubrovnik highlights” description hide whether the excursion includes the walls, steep stairs, a distant vehicle drop-off, or unstructured free time.
          </p>
        </div>

        <nav className="article-toc" aria-label="On this page">
          <strong>ON THIS PAGE</strong>
          <a href="#route">Three different Dubrovnik experiences</a>
          <a href="#friction-map">The excursion friction map</a>
          <a href="#questions">Questions to ask the operator</a>
          <a href="#gentler-plan">A gentler version</a>
          <a href="#sources">Official sources</a>
        </nav>

        <section id="route">
          <h2>Separate the lower Old Town from the walls and side streets</h2>
          <div className="route-comparison">
            <article><strong>Lower Old Town</strong><p>Stradun, nearby squares, cafés, and selected ground-level sights. Still pedestrian-only, crowded, and exposed to heat, but potentially easier to shorten.</p></article>
            <article><strong>City Walls</strong><p>Nearly 2 km for a full circuit according to the Port Authority, with steps and limited easy-exit options. This is not a minor add-on.</p></article>
            <article><strong>Side streets and forts</strong><p>Staircases and climbs can quickly change the effort. A “guided Old Town walk” needs a named route.</p></article>
          </div>
          <p>
            Dubrovnik’s tourist information identifies accessible features at specific attractions, including ramps or lifts in some locations. That is useful evidence about individual buildings—not proof that the entire Old Town route is step-free.
          </p>
        </section>

        <section id="friction-map">
          <h2>Dubrovnik shore excursion friction map</h2>
          <div className="article-table-wrap">
            <table className="article-table">
              <thead><tr><th>Stage</th><th>What can add effort</th><th>What to verify</th></tr></thead>
              <tbody>
                <tr><td>Ship to Old Town</td><td>Gruz distance, shuttle wait, tender, traffic, vehicle steps</td><td>Berth, transport mode, and exact drop-off point</td></tr>
                <tr><td>Entry area</td><td>Congestion, queues, sun, walk from the vehicle zone</td><td>Which gate and how long guests stand before the tour</td></tr>
                <tr><td>Guided route</td><td>Stone surfaces, stairs, walls, side streets, fixed pace</td><td>Named sights, wall entry, stair count, rest opportunities</td></tr>
                <tr><td>Free time</td><td>No guaranteed seat, distant meeting point, navigation</td><td>Can the traveler wait near the gate or return early?</td></tr>
                <tr><td>Return to ship</td><td>Traffic restrictions, shuttle queue, tired legs</td><td>Pickup point and protected return-to-ship margin</td></tr>
              </tbody>
            </table>
          </div>
          <p className="article-caution"><strong>Important:</strong> Vehicle access around the historic core is regulated and can affect drop-off logistics. Confirm the operator’s current plan rather than relying on an older review or map.</p>
        </section>

        <section id="questions">
          <h2>Ask these questions before booking</h2>
          <ol className="question-list">
            <li>Will our ship dock at Gruz or use a tender, and is transport included?</li>
            <li>At which gate or drop-off point does the walking begin?</li>
            <li>Does the tour enter the City Walls or only discuss them from below?</li>
            <li>Which side streets, forts, churches, or staircases are included?</li>
            <li>How many minutes are spent walking and standing before a seated break?</li>
            <li>Can the traveler skip the walls and rejoin the group later?</li>
            <li>Where is the meeting point after free time, and can someone return early?</li>
          </ol>
          <p>“Old Town walking tour” is not specific enough. Ask for the route or landmark sequence so you can compare the actual plan with the traveler’s limits.</p>
        </section>

        <section id="gentler-plan">
          <h2>What a gentler Dubrovnik excursion looks like</h2>
          <p>
            Look for included transport to a confirmed Old Town drop-off, a short lower-level route focused on Stradun and nearby squares, scheduled seating, and an explicit option to skip the walls. A private guide or small group may make it easier to change pace, but only if the operator confirms that flexibility.
          </p>
          <p>
            Treat the cable car, walls, forts, and stair-heavy side streets as separate choices. The family does not need to complete every famous sight for the port day to be worthwhile.
          </p>
        </section>

        <section>
          <h2>Frequently asked questions</h2>
          <div className="article-faqs">
            {faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section id="sources" className="article-sources">
          <h2>Official sources used</h2>
          <ul>
            <li><a href="https://portdubrovnik.hr/index.php/en/passenger-information/how-to-get-to-the-old-city" target="_blank" rel="noreferrer">Dubrovnik Port Authority: how to get to the Old City</a> — Gruz transfer options and estimated travel times.</li>
            <li><a href="https://portdubrovnik.hr/index.php/en/passenger-information/dubrovnik-attractions" target="_blank" rel="noreferrer">Dubrovnik Port Authority: attractions</a> — pedestrian Old City and City Walls distance and duration.</li>
            <li><a href="https://experiencedubrovnik.com/en/plan-your-trip-2/tourist-information" target="_blank" rel="noreferrer">Dubrovnik Tourist Board: visitor information</a> — accessibility information for individual attractions.</li>
            <li><a href="https://www.htz.hr/en/press/cntb-news/dubrovnik-new-vehicle-access-historic-city-zone" target="_blank" rel="noreferrer">Croatian National Tourist Board: historic-zone vehicle access</a> — traffic-management context around the Old City.</li>
          </ul>
          <p className="source-note">Vafaro summarizes sources for trip-planning purposes. Always confirm berth, transfer, route, and participation rules with the excursion seller for your sailing.</p>
        </section>

        <div className="article-cta">
          <p className="section-kicker light">CHECK THE ACTUAL LISTING</p>
          <h2>Which version of Dubrovnik are you booking?</h2>
          <p>Paste the exact excursion and compare its route, transfers, walking, standing, and stairs with your parent’s comfort profile.</p>
          <Link className="button" href="/check/excursion">Check the excursion free <ArrowRight size={17} /></Link>
        </div>
      </article>
    </main>
  );
}
