import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Terms of Service", description: "The terms that apply when using Vafaro's trip-planning information and review services.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <main className="article-page"><header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link></header><article className="article-shell legal-copy"><p className="section-kicker">TERMS OF SERVICE</p><h1>Planning support, with clear limits.</h1><p className="article-lead">Effective August 13, 2026. By using Vafaro, you agree to these terms. If you do not agree, do not use the service.</p>
    <section><h2>What Vafaro provides</h2><p>Vafaro provides general travel-planning information, automated planning signals, and, when separately agreed, scoped human research. The free scan uses the information you provide and general heuristics. A human review covers only the written scope confirmed with you.</p></section>
    <section><h2>What Vafaro does not provide</h2><p>Vafaro is not a medical provider, legal advisor, travel insurer, accessibility certifier, safety authority, transportation operator, or booking guarantee. A score or recommendation does not determine whether a person can safely complete an itinerary. Conditions, individual capabilities, schedules, and provider policies change.</p></section>
    <section><h2>Your responsibilities</h2><p>You are responsible for the accuracy of the information you provide and for deciding whether travel is appropriate. Confirm material details directly with airlines, hotels, venues, transportation providers, government authorities, and qualified medical or legal professionals when relevant. Do not rely on Vafaro for emergencies.</p></section>
    <section><h2>Human reviews, prices, and refunds</h2><p>Joining a founding list or submitting an application does not guarantee availability or create a purchase. Before payment, Vafaro will present the scope, price, delivery estimate, revision terms, and applicable cancellation or refund conditions. Those written terms become part of the agreement for that review.</p></section>
    <section><h2>Acceptable use</h2><p>Do not misuse the service, attempt to access other users’ information, interfere with the website, submit unlawful or harmful material, automate abusive requests, or misrepresent Vafaro’s findings as a certification or guarantee.</p></section>
    <section><h2>Changes and contact</h2><p>We may change or discontinue early features as the product is validated. Material changes to these terms will be reflected by a revised effective date. Questions can be sent through the <Link className="inline-link" href="/contact">Vafaro contact form</Link>. Information handling is described in the <Link className="inline-link" href="/privacy">Privacy Policy</Link>.</p></section>
  </article></main>;
}
