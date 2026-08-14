import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "@phosphor-icons/react/dist/ssr";
import { TripCheck } from "./trip-check";

export const metadata: Metadata = {
  title: "Free Multigenerational Family Trip Check",
  description: "Check an itinerary for walking, stairs, pacing, transfers, recovery time, and family travel friction before you book.",
  alternates: { canonical: "/check" },
};

export default function CheckPage() {
  return <main className="check-page"><header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><Link className="back-link" href="/"><ArrowLeft size={16} /> Back home</Link></header><TripCheck /></main>;
}
