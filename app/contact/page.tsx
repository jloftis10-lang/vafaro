import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Vafaro",
  description: "Contact Vafaro about a family trip review, privacy request, general question, or travel advisor partnership.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <main className="article-page"><header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link></header><article className="article-shell"><p className="section-kicker">CONTACT VAFARO</p><h1>How can we help?</h1><p className="article-lead">Ask about a family trip review, send a privacy request, or explore a travel advisor partnership. Please avoid sharing medical records or other sensitive information.</p><ContactForm /></article></main>;
}
