import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Compass, Info, SealCheck, Warning } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Sample Multigenerational Trip Fit Report",
  description: "Explore a sample Vafaro itinerary review with family-fit findings, practical corrections, confidence labels, and unknowns.",
  alternates: { canonical: "/report" },
};

export default function ReportPage() {
  return <main className="report-page">
    <header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><Link className="back-link" href="/"><ArrowLeft size={16} /> Back home</Link></header>
    <section className="report-head shell"><div><p className="section-kicker">FAMILY TRIP REVIEW · ILLUSTRATIVE SAMPLE</p><h1>Rome with<br />the family</h1><p>October 12–20 · 6 travelers · Rome & Florence</p></div><div className="report-score"><span>72</span><small>PLANNING<br />SIGNAL</small></div></section>
    <div className="report-meta shell"><span><SealCheck size={18} weight="fill" /> Example of a human-review format</span><span>Illustrative data · not a customer report</span></div>
    <section className="report-body shell">
      <aside><p>OVERVIEW</p><a href="#summary">Planning summary</a><a href="#findings">Key findings</a><a href="#unknowns">Unknowns</a></aside>
      <div className="report-content">
        <section className="report-notice"><Info size={21} weight="fill" /><p><strong>Illustrative planning report—not a certification.</strong> Scores summarize planning signals, not safety, medical suitability, or guaranteed accessibility. Important details require current confirmation.</p></section>
        <section id="summary"><p className="section-kicker">PLANNING SUMMARY</p><h2>A promising trip hiding two difficult days.</h2><p className="lead">The proposed hotels and overall route appear compatible with the family profile. The main concern is front-loading the most physically demanding activities immediately after an overnight flight.</p><div className="fit-bars"><div><span>LODGING SIGNAL</span><i><b style={{width:"82%"}} /></i><strong>82</strong></div><div><span>DAILY PACE</span><i><b style={{width:"58%"}} /></i><strong>58</strong></div><div><span>ACCESS CONFIDENCE</span><i><b style={{width:"44%"}} /></i><strong>44</strong></div><div><span>TRANSITIONS</span><i><b style={{width:"64%"}} /></i><strong>64</strong></div></div></section>
        <section id="findings"><p className="section-kicker">THE THREE THINGS TO KNOW</p><article className="report-finding high"><span className="finding-icon"><Warning size={22} weight="fill" /></span><div><p>HIGH FRICTION · DAY 2</p><h3>5.2 estimated walking miles after an overnight flight</h3><span>The current plan combines the Colosseum, Roman Forum, and an evening food tour. The Forum route may include uneven surfaces and limited seating.</span><div className="recommendation"><strong>VAFARO SUGGESTS</strong>Move the food tour to Day 4 and keep the arrival evening unstructured.</div><div className="source-badge">● PLANNING ESTIMATE</div></div></article><article className="report-finding medium"><span className="finding-icon"><Info size={22} weight="fill" /></span><div><p>NEEDS A CHECK · DAY 5</p><h3>18 minutes may not be enough for your Florence connection</h3><span>A platform change, stairs, crowds, or luggage could make this transfer unrealistic for the group.</span><div className="source-badge official">● OFFICIAL SOURCE NEEDED</div></div></article><article className="report-finding positive"><span className="finding-icon"><CheckCircle size={22} weight="fill" /></span><div><p>PROFILE MATCH · LODGING</p><h3>The central Rome location could reduce daily friction</h3><span>The address appears close to several planned activities, but the entrance, lift coverage, room route, and taxi access are not yet verified.</span><div className="source-badge verified-source">● BASED ON FAMILY PROFILE</div></div></article></section>
        <section className="report-unknowns" id="unknowns"><p className="section-kicker">WHAT THIS SAMPLE DOES NOT KNOW YET</p><h2>Three facts could change the recommendation.</h2><ul><li>The complete step-free route from street to guest room</li><li>The operating lift and platform for the specific train</li><li>Door-to-door walking distances, including queues and detours</li></ul></section>
        <section className="human-callout"><SealCheck size={30} weight="fill" /><div><p>FOUNDING-FAMILY REVIEW</p><h2>Want a person to investigate the priority unknowns?</h2><span>Proposed founding price: $119. Exact research scope and price are confirmed before payment.</span></div><Link className="button" href="/check">Join the founding list <ArrowRight size={17} /></Link></section>
      </div>
    </section>
  </main>;
}
