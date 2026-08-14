import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultsClient } from "./results-client";

export const metadata: Metadata = { title:"Your Trip Fit Results", description:"Review your personalized Vafaro Trip Fit score, hidden travel friction, and recommended next steps.", robots:{index:false,follow:false} };
export default function ResultsPage(){return <Suspense fallback={<main className="results-loading">Building your Trip Fit report…</main>}><ResultsClient/></Suspense>}
