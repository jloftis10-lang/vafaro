import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Compass } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Payment Received",
  description: "Confirmation for a Vafaro human-review payment.",
  robots: { index: false, follow: false },
};

export default function PaymentCompletePage() {
  return <main className="offer-page"><header className="nav shell"><Link className="brand" href="/"><span className="brand-mark"><Compass size={20} weight="fill" /></span>vafaro</Link></header><section className="offer-shell shell"><div className="offer-success"><CheckCircle size={42} weight="fill" /><div><p className="section-kicker">PAYMENT RECEIVED</p><h1>We have your review.</h1><p>Stripe is confirming the payment with Vafaro. You will receive the next-step and delivery details at the email used for your application. Please do not send medical records, passport details, or payment information by email.</p><div className="offer-success-actions"><Link className="button" href="/">Return home</Link><Link className="text-link" href="/contact">Contact Vafaro</Link></div></div></div></section></main>;
}
