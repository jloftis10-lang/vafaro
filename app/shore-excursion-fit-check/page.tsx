import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boat, Compass, Footprints, Stairs, Thermometer, Timer } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Shore Excursion Fit Check for Older Travelers",
  description: "Check whether a named cruise shore excursion fits an older traveler's walking, standing, stairs, terrain, heat, and pace before booking.",
  alternates: { canonical: "/shore-excursion-fit-check" },
};

const checks = [
  { icon: Footprints, title: "Walking and standing", text: "Look beyond the total tour duration to time actually spent moving, waiting, and keeping up with a group." },
  { icon: Boat, title: "Ship-to-shore friction", text: "Tender transfers, gangways, pier distance, motorcoach steps, and the return-to-ship margin all matter." },
  { icon: Stairs, title: "Terrain and access", text: "Cobblestones, grades, stairs, seating, bathrooms, and mobility-aid restrictions can change the fit." },
  { icon: Thermometer, title: "Conditions and pace", text: "Heat, shade, crowds, guide pace, and recovery after consecutive port days affect real-world effort." },
];

export default function ShoreExcursionFitCheckPage() {
  const schema = { "@context":"https://schema.org", "@type":"Service", name:"Vafaro Shore Excursion Fit Check", provider:{"@type":"Organization",name:"Vafaro"}, audience:{"@type":"Audience",audienceType:"Cruise travelers planning shore excursions with older family members"}, description:"A planning signal and optional human review that compares a named shore excursion with a traveler's stated comfort preferences." };
  return <main className="article-page excursion-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><Link className="button button-small" href="/check/excursion">Check an excursion <ArrowRight size={15}/></Link></header><article className="article-shell"><p className="section-kicker">SHORE EXCURSION PILOT</p><h1>Will this excursion actually work for your parent?</h1><p className="article-lead">“Easy,” “moderate,” and “demanding” are broad labels. Vafaro compares one specific excursion with your family member’s comfortable walking, standing, stairs, terrain, and pace—before you reserve the spot.</p><div className="excursion-actions"><Link className="button" href="/check/excursion">Check a named excursion <ArrowRight size={17}/></Link><span><Timer size={17}/> Free early scan · optional human review</span></div>
    <section><p className="section-kicker">WHAT WE CHECK</p><div className="excursion-checks">{checks.map(({icon:Icon,title,text})=><article key={title}><Icon size={25}/><h2>{title}</h2><p>{text}</p></article>)}</div></section>
    <section><h2>Start with the exact listing</h2><p>Paste the cruise-line, Viator, or independent-tour listing and include the cruise line, ship, sailing date, port, excursion name, and anything the description says about activity level. Specific names matter because similarly titled tours can use different routes, vehicles, and operators.</p></section>
    <section><h2>Get a signal—not a safety verdict</h2><p>The free scan uses your answers and general planning heuristics. It does not verify the excursion or decide whether someone can safely participate. A scoped human review may investigate a small number of material unknowns using current first-party sources. Cruise operations, weather, tendering, and local providers can change.</p></section>
    <section><h2>The first pilot is intentionally narrow</h2><ul><li>One named shore excursion</li><li>One traveler comfort profile</li><li>Walking, standing, stairs, terrain, heat, tender, and transfer considerations</li><li>Visible sources, dates, estimates, and unresolved unknowns</li><li>No medical advice, accessibility certification, booking, or guarantee</li></ul></section>
    <div className="article-cta"><p className="section-kicker light">BEFORE YOU BOOK</p><h2>Paste the excursion you are considering.</h2><p>Tell us what feels comfortable for the traveler. Vafaro will surface the assumptions worth checking.</p><Link className="button" href="/check/excursion">Start the free check <ArrowRight size={17}/></Link></div>
  </article></main>;
}
