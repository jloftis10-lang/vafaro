import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Compass } from "@phosphor-icons/react/dist/ssr";
import { ReviewOfferClient } from "./review-offer-client";

export const metadata: Metadata = {
  title: "Review Offer",
  description: "Review and accept a private Vafaro human-review offer.",
  robots: { index: false, follow: false },
};

export default function ReviewOfferPage() {
  return <main className="offer-page"><header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><Link className="back-link" href="/contact">Need help?</Link></header><Suspense fallback={<div className="offer-shell shell"><p>Loading offer…</p></div>}><ReviewOfferClient /></Suspense></main>;
}
