import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "@phosphor-icons/react/dist/ssr";

const canonical = "/guides/pompeii-shore-excursion-walking-difficulty";

export const metadata: Metadata = {
  title: "Pompeii Shore Excursion Walking Difficulty for Older Travelers",
  description:
    "Assess a Pompeii shore excursion for an older parent: walking distance, uneven paving, slopes, standing, entrances, pacing, and questions to ask before booking.",
  alternates: { canonical },
  openGraph: {
    title: "Can an Older Traveler Manage a Pompeii Shore Excursion?",
    description:
      "A source-checked guide to Pompeii walking difficulty, entrances, terrain, and excursion questions for families cruising with older adults.",
    url: canonical,
    type: "article",
  },
};

const faqs = [
  {
    question: "How much walking is involved in a Pompeii shore excursion?",
    answer:
      "It depends on the operator's route, entrance, transfer drop-off, and tour length. Pompeii's official facilitated route alone is more than 3.5 kilometers, but a commercial excursion may follow a different route. Ask for minutes of walking and standing, not only total tour duration.",
  },
  {
    question: "Is Pompeii suitable for older travelers with limited mobility?",
    answer:
      "It can be for some travelers when the entrance, route, pace, and assistance fit their abilities. The archaeological park warns that even its facilitated route includes uneven ancient paving, abrupt height changes, narrow sections, and some slopes over 8 percent.",
  },
  {
    question: "Which Pompeii entrance is used for the facilitated route?",
    answer:
      "The archaeological park identifies Piazza Anfiteatro as the access point for the Pompeii for All route. Do not assume a cruise excursion uses that entrance; confirm the exact entrance and exit with the operator.",
  },
];

export default function PompeiiExcursionGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Pompeii Shore Excursion Walking Difficulty for Older Travelers",
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
        <h1>Pompeii shore excursion walking difficulty: will it work for your parent?</h1>
        <p className="article-lead">
          Pompeii can work for an ambulatory older traveler, but the excursion name and broad activity label are not enough to judge it. The fit turns on the entrance, exact route, ancient paving, standing time, group pace, heat, and the walk between the vehicle and the ruins.
        </p>
        <p className="article-reviewed">Evidence reviewed August 14, 2026 · Recheck operating details for your sailing date</p>

        <div className="fit-verdict">
          <p className="section-kicker">THE SHORT ANSWER</p>
          <h2>Possible with the right route. A poor bet when the details are vague.</h2>
          <p>
            “Pompeii for All” is a real facilitated itinerary, but “facilitated” does not mean flat or effortless. The park says the route is over 3.5 km and still contains uneven paving, sudden height changes, narrow stretches, and slopes that can exceed 8%. A tour can be shorter—or add more walking through its drop-off, entrance, and chosen sights.
          </p>
        </div>

        <nav className="article-toc" aria-label="On this page">
          <strong>ON THIS PAGE</strong>
          <a href="#difficulty">What makes Pompeii difficult</a>
          <a href="#friction-map">The excursion friction map</a>
          <a href="#questions">Questions to ask the operator</a>
          <a href="#gentler-plan">A gentler version</a>
          <a href="#sources">Official sources</a>
        </nav>

        <section id="difficulty">
          <h2>Why Pompeii is harder than the mileage suggests</h2>
          <p>
            The park’s visitor regulations describe routes with variable heights, significant irregularities, and gaps, and advise extra prudence for people with mobility or cardiovascular issues. That means an apparently modest distance can demand more balance, concentration, and recovery than the same distance on a smooth sidewalk.
          </p>
          <ul>
            <li><strong>Terrain:</strong> ancient stones, crossings, thresholds, and abrupt changes in level.</li>
            <li><strong>Standing:</strong> guide commentary, security, queues, and crowded interiors may add effort that a mileage estimate misses.</li>
            <li><strong>Exposure:</strong> heat and limited shade can change a manageable morning into a difficult afternoon.</li>
            <li><strong>Group pace:</strong> a fixed group can remove the traveler’s ability to shorten the route or recover.</li>
            <li><strong>Entrance choice:</strong> the official facilitated route begins at Piazza Anfiteatro, but your tour may use another entrance.</li>
          </ul>
        </section>

        <section id="friction-map">
          <h2>Pompeii shore excursion friction map</h2>
          <div className="article-table-wrap">
            <table className="article-table">
              <thead><tr><th>Stage</th><th>What can add effort</th><th>What to verify</th></tr></thead>
              <tbody>
                <tr><td>Ship to coach</td><td>Gangway, pier distance, waiting, coach steps</td><td>Assistance, seat access, and actual departure point</td></tr>
                <tr><td>Coach to entrance</td><td>Unknown drop-off distance and standing before entry</td><td>Named entrance and approximate walk from the vehicle</td></tr>
                <tr><td>Inside Pompeii</td><td>Uneven paving, slopes, crossings, crowds, limited seating</td><td>Exact route, walking and standing minutes, rest stops</td></tr>
                <tr><td>Exit and return</td><td>A different exit, tired legs, fixed meeting time</td><td>Exit point, vehicle pickup, and return-to-ship margin</td></tr>
              </tbody>
            </table>
          </div>
          <p className="article-caution"><strong>Important:</strong> This is a planning framework, not a medical or safety assessment. Weather, site access, the ship’s berth, and the local operator can change.</p>
        </section>

        <section id="questions">
          <h2>Ask these questions before booking</h2>
          <ol className="question-list">
            <li>Which Pompeii entrance and exit will this excursion use?</li>
            <li>Does the guided route follow any part of “Pompeii for All”?</li>
            <li>How many minutes are spent walking, and how many standing?</li>
            <li>What is the longest stretch without a reliable place to sit?</li>
            <li>Are there coach steps, stairs, or thresholds that cannot be avoided?</li>
            <li>Can a guest leave the guided route early, and where would they wait?</li>
            <li>Does the activity-level label account for uneven stone and summer heat?</li>
          </ol>
          <p>A precise answer is more useful than reassurance such as “many seniors do this tour.” Your parent’s comfortable limits are the comparison point.</p>
        </section>

        <section id="gentler-plan">
          <h2>What a gentler Pompeii excursion looks like</h2>
          <p>
            Favor a shorter private or small-group visit that confirms Piazza Anfiteatro or another appropriate entrance, names the route, allows pauses, and can return to the vehicle without requiring the traveler to keep up with a large group. Avoid stacking Pompeii with another walking-heavy stop unless the traveler already knows that rhythm works for them.
          </p>
          <p>
            If the listing does not disclose walking, standing, stairs, entrance, or early-exit options, treat those as unresolved—not as evidence that the tour is easy.
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
            <li><a href="https://pompeiisites.org/en/visiting-info/pompeii-for-all/" target="_blank" rel="noreferrer">Archaeological Park of Pompeii: Pompeii for All</a> — route length, entrance, slopes, paving, and limitations.</li>
            <li><a href="https://pompeiisites.org/en/visiting-info/timetables-and-tickets/" target="_blank" rel="noreferrer">Archaeological Park of Pompeii: timetables and tickets</a> — current entrances, admission information, and facilitated-route access.</li>
            <li><a href="https://pompeiisites.org/en/visiting-info/regulations-for-visitors/" target="_blank" rel="noreferrer">Archaeological Park of Pompeii: visitor regulations</a> — terrain and physical-effort cautions.</li>
          </ul>
          <p className="source-note">Vafaro summarizes sources for trip-planning purposes. Always confirm the excursion-specific route with the seller and current site details with the official operator.</p>
        </section>

        <div className="article-cta">
          <p className="section-kicker light">CHECK THE ACTUAL LISTING</p>
          <h2>Does your Pompeii excursion fit your parent?</h2>
          <p>Paste the exact cruise-line or independent-tour listing and compare it with the traveler’s walking, standing, stair, and pace preferences.</p>
          <Link className="button" href="/check/excursion">Check the excursion free <ArrowRight size={17} /></Link>
        </div>
      </article>
    </main>
  );
}
