import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Compass,
  Footprints,
  SealCheck,
  Sparkle,
  Stairs,
  Thermometer,
  Timer,
} from "@phosphor-icons/react/dist/ssr";

const friction = [
  { icon: Footprints, label: "Walking load", text: "Real distance, terrain, and time on your feet." },
  { icon: Stairs, label: "Access details", text: "Stairs, elevators, entrances, and transfers." },
  { icon: Timer, label: "Pacing", text: "Recovery time, rest windows, and rushed connections." },
  { icon: Thermometer, label: "Conditions", text: "Heat, crowds, noise, and weather exposure." },
];

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org", "@type":"Service", name:"Vafaro Family Trip Fit Review", provider:{"@type":"Organization",name:"Vafaro",url:"https://www.vafaro.com"}, audience:{"@type":"Audience",audienceType:"Families planning multigenerational travel"}, description:"AI-assisted itinerary screening and optional human review for multigenerational family trips with children and aging parents.", areaServed:"Worldwide", offers:[{"@type":"Offer",name:"Family Trip Quick Scan",price:"0",priceCurrency:"USD"}] }) }} />
      <header className="nav shell">
        <Link className="brand" href="/" aria-label="Vafaro home">
          <span className="brand-mark"><Compass size={20} weight="fill" /></span>
          vafaro
        </Link>
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#method">Method</a>
          <a href="#pricing">Pricing</a>
          <Link href="/report">Sample report</Link>
        </nav>
        <Link className="button button-small" href="/check">Check my trip <ArrowRight size={16} /></Link>
      </header>

      <section className="hero shell">
        <div className="eyebrow"><Sparkle size={14} weight="fill" /> Travel that fits real people</div>
        <h1>Know before<br />you <em>go.</em></h1>
        <p className="hero-copy">Planning a family trip with kids, parents, or grandparents? Check whether the itinerary’s walking, stairs, pace, heat, and transfers fit the people you love.</p>
        <div className="hero-actions">
          <Link className="button" href="/check">Check your trip <ArrowRight size={18} /></Link>
          <Link className="text-link" href="/report">Explore a sample report <span>↗</span></Link>
        </div>
        <div className="trust-line">
          <div className="avatars"><span>MC</span><span>AR</span><span>JL</span></div>
          <p><strong>AI-assisted. Uncertainty shown.</strong><br />Every result separates what we know, estimate, and still need to verify.</p>
        </div>

        <div className="report-preview" aria-label="Sample trip fit score">
          <div className="preview-top">
            <div><span className="tiny-label">TRIP FIT REPORT</span><h2>Rome with the family</h2><p>6 travelers · 8 days · October</p></div>
            <span className="verified"><SealCheck size={16} weight="fill" /> Illustrative sample</span>
          </div>
          <div className="score-row">
            <div className="score-ring"><span>72</span><small>SIGNAL</small></div>
            <div className="score-copy"><span className="rating-dot" /> PROMISING, WITH CHANGES<h3>Your hotel looks promising. Your first two days don’t.</h3><p>The sample shows one high-friction day and one connection that needs direct verification.</p></div>
          </div>
          <div className="finding-grid">
            <div className="finding risk"><span>HIGH FRICTION</span><strong>5.2 miles on day one</strong><p>Following an overnight flight</p></div>
            <div className="finding caution"><span>CHECK THIS</span><strong>18-minute rail transfer</strong><p>With luggage and platform change</p></div>
            <div className="finding good"><span>PROFILE MATCH</span><strong>Hotel location</strong><p>Central base; access unverified</p></div>
          </div>
        </div>
      </section>

      <section className="pilot-strip shell" aria-labelledby="cruise-pilot-heading">
        <div><p className="section-kicker">NEW SHORE EXCURSION PILOT</p><h2 id="cruise-pilot-heading">Cruising with an older parent?</h2><p>Check one named shore excursion against their comfortable walking, standing, stairs, terrain, and pace before you reserve it.</p></div>
        <Link className="button" href="/shore-excursion-fit-check">Explore the excursion check <ArrowRight size={17}/></Link>
      </section>

      <section className="intro shell" id="how">
        <p className="section-kicker">THE CONFIDENCE LAYER FOR TRAVEL</p>
        <div className="intro-grid">
          <h2>Travel sites show you what looks good. We show you what it will <em>feel like.</em></h2>
          <div><p>Vafaro looks beyond star ratings and glossy photos. We assess whether each day works for the actual people taking the trip.</p><p className="muted">Especially when grandparents, kids, different energy levels, or accessibility needs are part of the plan.</p></div>
        </div>
        <div className="friction-grid">
          {friction.map(({ icon: Icon, label, text }, i) => <article key={label}><span className="index">0{i + 1}</span><Icon size={28} /><h3>{label}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="failure-section" aria-labelledby="failure-heading">
        <div className="shell">
          <p className="section-kicker light">THE DETAILS THAT BREAK GOOD TRIPS</p>
          <div className="failure-heading"><h2 id="failure-heading">The itinerary can look perfect and still fail the family.</h2><p>Vafaro is designed around common, preventable failure modes—not generic destination inspiration.</p></div>
          <div className="failure-grid">
            <article><span>01</span><p>THE VILLA</p><h3>“Accessible” bedrooms—behind 14 entrance steps.</h3><small>Listing language is not the same as a verified step-free route.</small></article>
            <article><span>02</span><p>THE CONNECTION</p><h3>An 18-minute train change with luggage and a platform switch.</h3><small>A valid ticket can still create an unrealistic transfer for three generations.</small></article>
            <article><span>03</span><p>THE FIRST DAY</p><h3>Five walking miles after an overnight family flight.</h3><small>Attractions fit the calendar while recovery, queues, and the walk home do not.</small></article>
          </div>
          <p className="failure-note">These are illustrative composites of common planning problems, not customer testimonials.</p>
        </div>
      </section>

      <section className="steps" id="review">
        <div className="shell">
          <p className="section-kicker light">HOW IT WORKS</p>
          <h2>From “this looks amazing”<br />to “this actually works.”</h2>
          <div className="step-list">
            <article><span>1</span><div><h3>Share the real travelers</h3><p>Tell us who is coming, how they like to move, and what can make or break the trip.</p></div></article>
            <article><span>2</span><div><h3>Add your trip</h3><p>Paste an itinerary, share booking links, or describe the trip you are considering.</p></div></article>
            <article><span>3</span><div><h3>See the hidden friction</h3><p>Vafaro checks pace, transitions, access, conditions, and the fit between every day and every traveler.</p></div></article>
            <article><span>4</span><div><h3>Request a founding-family review</h3><p>A person investigates priority unknowns, documents sources, and suggests practical corrections. Scope is confirmed before payment.</p></div></article>
          </div>
        </div>
      </section>

      <section className="proof shell" id="method">
        <div className="proof-card">
          <div className="proof-icon"><CheckCircle size={32} weight="fill" /></div>
          <div><p className="section-kicker">TRUST, MADE VISIBLE</p><h2>Every answer comes with a source—and an honest confidence level.</h2></div>
          <div className="confidence-list">
            <span><i className="dot verified-dot" /> Verified directly</span>
            <span><i className="dot source-dot" /> Confirmed by official source</span>
            <span><i className="dot estimate-dot" /> AI estimate—check recommended</span>
            <span><i className="dot unknown-dot" /> Unknown</span>
          </div>
        </div>
      </section>

      <section className="pricing shell" id="pricing">
        <div className="pricing-head"><div><p className="section-kicker">FOUNDING-FAMILY ACCESS</p><h2>Start with a signal.<br /><em>Pay for investigation.</em></h2></div><p>We are validating one service for families traveling with children and aging parents. No automatic checkout yet: scope and price are confirmed first.</p></div>
        <div className="price-grid">
          <article><p>FAMILY TRIP SCAN</p><h3>Free</h3><span>Immediate planning signal</span><ul><li>Top three family-friction flags</li><li>Profile-based versus estimated findings</li><li>Visible unknowns to verify</li></ul><Link className="price-link" href="/check">Check a family trip <ArrowRight size={16} /></Link></article>
          <article className="featured-price"><div className="popular">FOUNDING OFFER</div><p>HUMAN TRIP REVIEW</p><h3>$119</h3><span>Proposed founding-family price</span><ul><li>Complete itinerary review</li><li>Walking, pacing, and transfer analysis</li><li>Priority access questions investigated</li><li>Practical itinerary corrections</li></ul><Link className="button" href="/check">Join the founding list <ArrowRight size={16} /></Link></article>
        </div>
        <p className="price-note">Early concept pricing, not a guarantee of availability. You will see the exact scope and price before any payment.</p>
      </section>

      <section className="cta shell">
        <p className="section-kicker">YOUR NEXT TRIP, WITHOUT THE GUESSWORK</p>
        <h2>Make sure the trip<br /><em>fits.</em></h2>
        <Link className="button" href="/check">Start a free trip check <ArrowRight size={18} /></Link>
      </section>

      <footer className="footer shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><div className="footer-links"><Link href="/shore-excursion-fit-check">Shore excursion check</Link><Link href="/guides/traveling-with-aging-parents">Aging parents guide</Link><Link href="/methodology">Methodology</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div><span>© 2026 Vafaro</span></footer>
    </main>
  );
}
