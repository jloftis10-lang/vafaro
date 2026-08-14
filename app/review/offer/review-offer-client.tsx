"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { ArrowRight, CheckCircle, CreditCard, Info, LockKey, SealCheck } from "@phosphor-icons/react";

type Offer = {
  leadId: string;
  reportTitle: string;
  scope: string[];
  priceCents: number;
  expiresAt: string | null;
  deliveryEstimate: string;
  revisionTerms: string;
  refundTerms: string;
  paymentStatus: string;
};

type Stage = "lookup" | "offer" | "submitting" | "accepted";

export function ReviewOfferClient() {
  const params = useSearchParams();
  const [leadId, setLeadId] = useState(params.get("lead") ?? "");
  const [email, setEmail] = useState("");
  const [offer, setOffer] = useState<Offer | null>(null);
  const [scopeAccepted, setScopeAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [stage, setStage] = useState<Stage>("lookup");
  const [message, setMessage] = useState(params.get("canceled") === "1" ? "Payment was canceled. Your accepted scope is still saved; you can continue when ready." : "");

  const request = async (action: "lookup" | "accept") => {
    const response = await fetch("/api/review-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, leadId, email, scopeAccepted, termsAccepted }),
    });
    const isJson = response.headers.get("content-type")?.includes("application/json");
    if (!isJson) throw new Error("Review offers are temporarily unavailable. Please try again shortly.");
    const result = await response.json() as { error?: string; offer?: Offer; accepted?: boolean; checkoutReady?: boolean; checkoutUrl?: string };
    if (!response.ok) throw new Error(result.error ?? "We could not open this review offer.");
    return result;
  };

  const lookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    try {
      const result = await request("lookup");
      if (!result.offer) throw new Error("This review offer is incomplete.");
      setOffer(result.offer);
      setStage("offer");
      track("review_offer_viewed", { price: result.offer.priceCents / 100 });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not open this review offer.");
    }
  };

  const accept = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setStage("submitting");
    try {
      const result = await request("accept");
      track("review_scope_accepted", { price: (offer?.priceCents ?? 0) / 100 });
      if (result.checkoutReady && result.checkoutUrl) {
        track("review_checkout_started", { price: (offer?.priceCents ?? 0) / 100 });
        window.location.assign(result.checkoutUrl);
        return;
      }
      track("review_checkout_unavailable");
      setStage("accepted");
    } catch (error) {
      setStage("offer");
      setMessage(error instanceof Error ? error.message : "We could not save your acceptance.");
    }
  };

  if (stage === "accepted") {
    return <section className="offer-shell shell"><div className="offer-success"><CheckCircle size={38} weight="fill" /><div><p className="section-kicker">SCOPE ACCEPTED</p><h1>Your acceptance is recorded.</h1><p>Payment is not enabled yet, so no charge was made. Vafaro will contact you before any work begins or payment is requested.</p><Link className="button" href="/">Return to Vafaro</Link></div></div></section>;
  }

  return <section className="offer-shell shell">
    <div className="offer-intro"><span className="offer-icon"><SealCheck size={27} weight="fill" /></span><div><p className="section-kicker">PRIVATE HUMAN-REVIEW OFFER</p><h1>Agree on the work before paying for it.</h1><p>Open your offer using the reference from Vafaro. You will see the exact scope, price, delivery estimate, revision terms, and refund conditions before checkout appears.</p></div></div>
    <div className="offer-progress" aria-label="Offer process"><span className="active">1 · Review offer</span><span>2 · Accept scope</span><span>3 · Secure payment</span></div>
    {message ? <div className="offer-message" role="status"><Info size={19} weight="fill" />{message}</div> : null}

    {!offer ? <form className="offer-lookup" onSubmit={lookup}><h2>Open your review offer</h2><div><label><span>Review reference</span><input required inputMode="numeric" autoComplete="off" value={leadId} onChange={event => setLeadId(event.target.value.replace(/\D/g, "").slice(0, 18))} placeholder="Example: 42" /></label><label><span>Application email</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label></div><button className="button">View the offer <ArrowRight size={16} /></button><p>For privacy, the reference and email must match the original application.</p></form> : <form className="offer-card" onSubmit={accept}>
      <div className="offer-card-head"><div><p className="section-kicker">REVIEW #{offer.leadId}</p><h2>{offer.reportTitle}</h2></div><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(offer.priceCents / 100)}</strong></div>
      <section><h3>Agreed review scope</h3><ul>{offer.scope.map(item => <li key={item}>{item}</li>)}</ul></section>
      <dl className="offer-terms"><div><dt>Delivery estimate</dt><dd>{offer.deliveryEstimate}</dd></div><div><dt>Revision terms</dt><dd>{offer.revisionTerms}</dd></div><div><dt>Cancellation and refunds</dt><dd>{offer.refundTerms}</dd></div>{offer.expiresAt ? <div><dt>Offer expires</dt><dd>{new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(offer.expiresAt))}</dd></div> : null}</dl>
      <div className="offer-notice"><Info size={20} weight="fill" /><p><strong>Planning support—not a safety certification.</strong> The review covers only the scope above. Conditions, operator rules, and individual capabilities can change and must be reconfirmed before travel.</p></div>
      <label className="offer-consent"><input required type="checkbox" checked={scopeAccepted} onChange={event => setScopeAccepted(event.target.checked)} /><span>I accept the written review scope, price, delivery estimate, revision terms, and refund conditions shown above.</span></label>
      <label className="offer-consent"><input required type="checkbox" checked={termsAccepted} onChange={event => setTermsAccepted(event.target.checked)} /><span>I agree to the <Link href="/terms" target="_blank" rel="noreferrer">Terms of Service</Link> and acknowledge that this is planning information, not medical advice or an accessibility guarantee.</span></label>
      <div className="offer-pay-row"><div><LockKey size={18} /><span>Payment is processed on Stripe’s secure checkout. Vafaro does not receive your full card number.</span></div><button className="button" disabled={stage === "submitting"}>{stage === "submitting" ? "Preparing secure checkout…" : <>Accept and continue <CreditCard size={17} /></>}</button></div>
    </form>}
  </section>;
}
