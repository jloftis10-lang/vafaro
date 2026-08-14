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

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org", "@type":"Service", name:"Vafaro Trip Fit Report", provider:{"@type":"Organization",name:"Vafaro",url:"https://vafaro.com"}, description:"AI-assisted and human-reviewed travel itinerary analysis for multigenerational families.", areaServed:"Worldwide", offers:[{"@type":"Offer",name:"Quick Scan",price:"0",priceCurrency:"USD"},{"@type":"Offer",name:"Detailed Trip Fit Report",price:"29",priceCurrency:"USD"}] }) }} />
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
        <p className="hero-copy">Upload any itinerary. Get a Trip Fit Report showing what the experience will actually demand—walking, stairs, pace, heat, transfers, and more.</p>
        <div className="hero-actions">
          <Link className="button" href="/check">Check your trip <ArrowRight size={18} /></Link>
          <Link className="text-link" href="/report">Explore a sample report <span>↗</span></Link>
        </div>
        <div className="trust-line">
          <div className="avatars"><span>MC</span><span>AR</span><span>JL</span></div>
          <p><strong>AI-assisted. Human-checkable.</strong><br />Critical details never hide behind a confidence score.</p>
        </div>

        <div className="report-preview" aria-label="Sample trip fit score">
          <div className="preview-top">
            <div><span className="tiny-label">TRIP FIT REPORT</span><h2>Rome with the family</h2><p>6 travelers · 8 days · October</p></div>
            <span className="verified"><SealCheck size={16} weight="fill" /> Human reviewed</span>
          </div>
          <div className="score-row">
            <div className="score-ring"><span>72</span><small>/ 100</small></div>
            <div className="score-copy"><span className="rating-dot" /> GOOD FIT, WITH A FEW CHANGES<h3>Your hotel choice works beautifully. Your first two days don’t.</h3><p>We found one high-friction day and a connection that needs more breathing room.</p></div>
          </div>
          <div className="finding-grid">
            <div className="finding risk"><span>HIGH FRICTION</span><strong>5.2 miles on day one</strong><p>Following an overnight flight</p></div>
            <div className="finding caution"><span>CHECK THIS</span><strong>18-minute rail transfer</strong><p>With luggage and platform change</p></div>
            <div className="finding good"><span>STRONG FIT</span><strong>Hotel location</strong><p>Flat approach, lift confirmed</p></div>
          </div>
        </div>
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

      <section className="steps" id="review">
        <div className="shell">
          <p className="section-kicker light">HOW IT WORKS</p>
          <h2>From “this looks amazing”<br />to “this actually works.”</h2>
          <div className="step-list">
            <article><span>1</span><div><h3>Share the real travelers</h3><p>Tell us who is coming, how they like to move, and what can make or break the trip.</p></div></article>
            <article><span>2</span><div><h3>Add your trip</h3><p>Paste an itinerary, share booking links, or describe the trip you are considering.</p></div></article>
            <article><span>3</span><div><h3>See the hidden friction</h3><p>Vafaro checks pace, transitions, access, conditions, and the fit between every day and every traveler.</p></div></article>
            <article><span>4</span><div><h3>Ask for a human check</h3><p>A specialist can verify critical details directly and recommend practical corrections.</p></div></article>
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
        <div className="pricing-head"><div><p className="section-kicker">START WITH CLARITY</p><h2>See the friction.<br /><em>Choose your confidence.</em></h2></div><p>Every trip starts with a free quick scan. Pay only when you want deeper analysis or a real person to verify the details.</p></div>
        <div className="price-grid">
          <article><p>QUICK SCAN</p><h3>Free</h3><span>Fast AI-assisted overview</span><ul><li>Overall fit snapshot</li><li>Top three friction flags</li><li>Visible confidence labels</li></ul><Link className="price-link" href="/check">Check a trip <ArrowRight size={16} /></Link></article>
          <article><p>DETAILED REPORT</p><h3>$29</h3><span>Complete Trip Fit analysis</span><ul><li>Day-by-day energy curve</li><li>Walking and transfer analysis</li><li>Practical corrections</li><li>Shareable family report</li></ul><Link className="price-link" href="/check">Start free <ArrowRight size={16} /></Link></article>
          <article className="featured-price"><div className="popular">MOST CONFIDENCE</div><p>HUMAN REVIEWED</p><h3>From $89</h3><span>Critical details verified for you</span><ul><li>Everything in Detailed</li><li>Hotel and attraction checks</li><li>Named specialist reviewer</li><li>Verification notes and sources</li></ul><Link className="button" href="/check">Start your report <ArrowRight size={16} /></Link></article>
        </div>
        <p className="price-note">Need us to rebuild the difficult parts? Concierge correction packages start at $249.</p>
      </section>

      <section className="cta shell">
        <p className="section-kicker">YOUR NEXT TRIP, WITHOUT THE GUESSWORK</p>
        <h2>Make sure the trip<br /><em>fits.</em></h2>
        <Link className="button" href="/check">Start a free trip check <ArrowRight size={18} /></Link>
      </section>

      <footer className="footer shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><div className="footer-links"><Link href="/guides/traveling-with-aging-parents">Traveling with aging parents</Link><Link href="/guides/rome-with-aging-parents">Rome guide</Link><Link href="/methodology">Methodology</Link></div><span>© 2026 Vafaro</span></footer>
    </main>
  );
}
