"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { ArrowRight, CheckCircle, Compass, Copy, Info, SealCheck, Warning } from "@phosphor-icons/react";
import { decodeReport } from "@/lib/assessment";

const icons = { high: Warning, check: Info, good: CheckCircle };
const timeframes = ["Just exploring", "Within 3 months", "3–6 months", "6–12 months", "Trip already booked"];
type CaptureState = "idle" | "submitting" | "success" | "error";

export function ResultsClient() {
  const params = useSearchParams();
  const encodedReport = params.get("r") ?? "";
  const report = useMemo(() => decodeReport(encodedReport), [encodedReport]);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeframe, setTimeframe] = useState("Within 3 months");
  const [priceInterest, setPriceInterest] = useState(119);
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [captureState, setCaptureState] = useState<CaptureState>("idle");
  const [captureMessage, setCaptureMessage] = useState("");

  if (!report) {
    return <main className="results-empty"><h1>We couldn’t open this report.</h1><Link className="button" href="/check">Start a new check</Link></main>;
  }

  const unknowns = report.unknowns ?? ["Exact walking routes and terrain", "Current access details at each venue", "Live conditions and provider changes"];
  const confidence = report.confidence ?? report.findings.reduce((summary, finding) => {
    if (finding.confidence === "Based on your profile") summary.profileBased += 1;
    if (finding.confidence === "AI estimate") summary.estimated += 1;
    if (finding.confidence === "Official source needed") summary.needsVerification += 1;
    return summary;
  }, { profileBased: 0, estimated: 0, needsVerification: 0 });

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      track("trip_report_shared");
    } catch {
      setCopied(false);
    }
  };

  const capture = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track("review_application_started", { price: priceInterest, timeframe });
    setCaptureState("submitting");
    setCaptureMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          timeframe,
          priceInterest,
          consent,
          company,
          sourceUrl: `${window.location.origin}/results`,
          report,
        }),
      });
      const result = await response.json() as { error?: string; leadId?: string };
      if (!response.ok) throw new Error(result.error || "We could not save your request.");

      localStorage.setItem("vafaro-founding-lead-v1", JSON.stringify({ email, leadId: result.leadId, submittedAt: new Date().toISOString() }));
      track("review_application_submitted", { price: priceInterest, timeframe });
      setCaptureState("success");
    } catch (error) {
      track("review_application_failed", { price: priceInterest, timeframe });
      setCaptureState("error");
      setCaptureMessage(error instanceof Error ? error.message : "We could not save your request. Please try again.");
    }
  };

  return <main className="results-page">
    <header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link><button className="share-button" onClick={share}><Copy size={16} />{copied ? "Link copied" : "Share report"}</button></header>
    <section className="results-hero shell"><div><p className="section-kicker">YOUR FREE FAMILY TRIP SCAN</p><h1>{report.title}</h1><p className="results-summary">{report.summary}</p></div><div className="result-score"><strong>{report.score}</strong><span>PLANNING<br />SIGNAL</span></div></section>
    <section className="result-layout shell">
      <aside><p>PROFILE CHECKED</p>{report.input.companions.map(item => <span key={item}>✓ {item}</span>)}{report.input.needs.map(item => <span key={item}>✓ {item}</span>)}</aside>
      <div className="result-main">
        <section className="result-disclaimer"><Info size={20} weight="fill" /><p><strong>This is a planning signal, not a safety or accessibility certification.</strong> It is based on your answers and general heuristics. Conditions and provider details must be confirmed directly before booking.</p></section>
        <p className="section-kicker">WHAT TO KNOW BEFORE YOU BOOK</p>
        {report.findings.slice(0, 3).map((finding, index) => {
          const Icon = icons[finding.level];
          return <article className={`live-finding ${finding.level}`} key={finding.title}><span className="finding-number">0{index + 1}</span><Icon size={24} weight="fill" /><div><p>{finding.level === "high" ? "HIGH FRICTION" : finding.level === "good" ? "STRONG FIT" : "CHECK THIS"}</p><h2>{finding.title}</h2><span>{finding.detail}</span><div className="action"><strong>VAFARO SUGGESTS</strong>{finding.action}</div><small>{finding.confidence}</small></div></article>;
        })}
        <section className="confidence-panel"><div><p className="section-kicker">HOW CERTAIN IS THIS SCAN?</p><h2>Confidence is part of the answer.</h2></div><dl><div><dt>{confidence.profileBased}</dt><dd>Based on your profile</dd></div><div><dt>{confidence.estimated}</dt><dd>Planning estimates</dd></div><div><dt>{confidence.needsVerification}</dt><dd>Need direct verification</dd></div></dl></section>
        <section className="unknowns-panel"><p className="section-kicker">WHAT WE COULD NOT VERIFY</p><h2>These unknowns can change the recommendation.</h2><ul>{unknowns.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className={`email-capture ${captureState === "success" ? "capture-success" : ""}`} id="founding-family-form">
          <SealCheck size={30} weight="fill" />
          <div>
            <h2>{captureState === "success" ? "You’re on the founding-family list." : "Apply for a founding-family review"}</h2>
            <p>{captureState === "success" ? "Your request and trip profile were saved securely. Vafaro can now follow up when review spots open." : "Share your contact details and proposed budget. We’ll save this trip profile with your application and use it only to evaluate and contact you about the founding review."}</p>
            {captureState === "success" ? <div className="capture-confirmation"><CheckCircle size={20} weight="fill" /> Submission received</div> : <form onSubmit={capture}>
              <div className="capture-fields">
                <label><span>Name</span><input required autoComplete="name" value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label>
                <label><span>Email</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label>
                <label><span>When is the trip?</span><select value={timeframe} onChange={event => setTimeframe(event.target.value)}>{timeframes.map(item => <option key={item}>{item}</option>)}</select></label>
                <label><span>Price you’d consider</span><select value={priceInterest} onChange={event => { const price=Number(event.target.value); setPriceInterest(price); track("review_price_selected", { price }); }}><option value={79}>$79</option><option value={119}>$119</option><option value={149}>$149</option></select></label>
              </div>
              <label className="form-trap" aria-hidden="true">Company<input tabIndex={-1} autoComplete="off" value={company} onChange={event => setCompany(event.target.value)} /></label>
              <label className="consent-field"><input required type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>I agree that Vafaro may store this trip profile and contact me about a founding-family review under the <Link href="/privacy">Privacy Policy</Link>. I understand this is a planning service, not medical advice or an accessibility guarantee.</span></label>
              <p className="data-note">Please don’t include diagnoses, passport numbers, payment details, or other sensitive information in your trip description.</p>
              {captureState === "error" ? <p className="capture-error" role="alert">{captureMessage}</p> : null}
              <button className="button" disabled={captureState === "submitting"}>{captureState === "submitting" ? "Saving securely…" : "Submit my application"} <ArrowRight size={16} /></button>
            </form>}
          </div>
        </section>
        <section className="upgrade-card"><p>FOUNDING FAMILY REVIEW · PROPOSED $119</p><h2>A real person investigates the unknowns that could change your trip.</h2><ul><li>Complete itinerary review</li><li>Walking, pacing, and transfer analysis</li><li>Priority access details checked</li><li>Practical family-friendly corrections</li></ul><a className="button" href="#founding-family-form">Apply for a founding review <ArrowRight size={17} /></a><small>Early concept price. Scope and price are confirmed before any payment.</small></section>
      </div>
    </section>
  </main>;
}
