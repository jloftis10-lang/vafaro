import type { Metadata } from "next";
import Link from "next/link";

import { SourcesList } from "@/components/content/Citation";
import { DataFreshness } from "@/components/content/DataFreshness";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SITE_URL } from "@/lib/content/brand";

export const metadata: Metadata = {
  title: "The Complete Business Sale Process | OwnerGauge",
  description:
    "A first-time seller's stage-by-stage guide to how a business sale actually works, from preparation through closing — what happens, what to prepare, and what commonly goes wrong.",
  alternates: { canonical: "/sell-your-business" },
  openGraph: {
    title: "The Complete Business Sale Process",
    description:
      "A first-time seller's stage-by-stage guide to how a business sale actually works, from preparation through closing.",
    url: "/sell-your-business",
    type: "article",
  },
};

interface Stage {
  name: string;
  summary: string;
  whatHappens: string;
  sellerPrep: string;
  buyerEvaluates: string;
  commonProblems: string;
  link?: { href: string; label: string };
}

const STAGES: Stage[] = [
  {
    name: "1. Preparation",
    summary: "Financials, ownership goals, and risk factors get organized before anyone talks to a buyer.",
    whatHappens: "The owner (often with an advisor) organizes financial statements, clarifies personal and business goals for the transaction, and takes an honest look at the business through a buyer's eyes.",
    sellerPrep: "Reconciled financials, a documented add-back schedule, and clarity on your own timeline, minimum acceptable outcome, and how much of your net worth is tied up in the business.",
    buyerEvaluates: "Nothing yet — but everything a buyer later evaluates traces back to how well this stage was done.",
    commonProblems: "Owners who skip this stage and go to market with commingled personal expenses, no documented add-backs, or an unrealistic price expectation lose credibility fast once real buyers engage.",
  },
  {
    name: "2. Advisor & Team Formation",
    summary: "The seller assembles the team — M&A advisor, transaction attorney, and accountant — who will actually run the process.",
    whatHappens: "The owner engages an M&A advisor, business broker, or investment bank appropriate to the deal size, along with transaction counsel and often a CPA experienced in sale transactions.",
    sellerPrep: "Interview more than one advisor. Ask for recent, comparable closed deals — size, industry, and how the process actually went — before engaging anyone.",
    buyerEvaluates: "A credible advisor and legal team signals a seller who's serious and organized, which affects how buyers prioritize their time.",
    commonProblems: "Choosing an advisor whose typical deal size doesn't match yours, or skipping transaction-specific legal counsel in favor of a general-practice attorney.",
    link: { href: "/resources/choosing-an-ma-advisor", label: "Read more on choosing the right advisor" },
  },
  {
    name: "3. Valuation & Positioning",
    summary: "The business gets a realistic value range, and its equity story — why a buyer should care — gets built.",
    whatHappens: "Earnings get normalized, an appropriate multiple range gets applied, and the team develops the narrative around what makes the business attractive beyond the raw numbers.",
    sellerPrep: "An honest, defensible view of normalized earnings — not the most optimistic possible number.",
    buyerEvaluates: "Whether the seller's price expectation is grounded in reality or aspirational — a large gap here can end a conversation before it starts.",
    commonProblems: "Anchoring on a number heard from a peer's business or an online rule of thumb rather than this business's own earnings quality and risk profile.",
    link: { href: "/methodology", label: "See how OwnerGauge estimates market value" },
  },
  {
    name: "4. Marketing Materials",
    summary: "A confidential information memorandum (CIM) and supporting financials get prepared for qualified buyers.",
    whatHappens: "The team prepares a CIM — company overview, market position, operations, growth case, and historical financials — detailed enough for a buyer to form a real initial view without disclosing everything upfront.",
    sellerPrep: "Time to review drafts carefully; the CIM is often a buyer's first substantive impression of the business.",
    buyerEvaluates: "Whether the materials are organized, credible, and specific, or vague and promotional.",
    commonProblems: "A CIM that oversells with unsupported projections tends to create diligence problems later, when the numbers don't hold up.",
  },
  {
    name: "5. Buyer Identification & Confidential Outreach",
    summary: "The advisor identifies a target list of buyers and reaches out on a confidential, no-name basis.",
    whatHappens: "Depending on the business, the buyer universe might include strategic acquirers, private equity platforms, PE-backed add-ons, family offices, or individual/search-fund buyers. Initial outreach is typically blind or lightly identified until interest is confirmed.",
    sellerPrep: "A clear view (with your advisor) of which buyer types make sense — this shapes valuation and deal structure expectations.",
    buyerEvaluates: "Whether the opportunity fits their strategy, size, and timeline before committing real diligence time.",
    commonProblems: "Confidentiality leaks to employees, customers, or competitors before the seller is ready to disclose — a real risk that needs active management, not just a signed NDA.",
  },
  {
    name: "6. Buyer Discussions & Indications of Interest",
    summary: "Interested buyers submit a preliminary, non-binding indication of value and structure.",
    whatHappens: "Qualified buyers who've reviewed the CIM submit an Indication of Interest (IOI) — a range, not a final number — narrowing the field before deeper conversations begin.",
    sellerPrep: "A framework for comparing offers on more than headline price: structure, contingencies, and buyer credibility all matter here too.",
    buyerEvaluates: "Enough information to put forward a credible range without yet having done deep diligence.",
    commonProblems: "Treating an IOI as a firm offer — it's an early signal, and the number can move materially once real diligence starts.",
  },
  {
    name: "7. Letter of Intent (LOI)",
    summary: "The leading buyer's proposed price, structure, and timeline get formalized — usually with an exclusivity period attached.",
    whatHappens: "The selected buyer submits an LOI. Most of it is non-binding, but the exclusivity clause typically is — signing one generally takes the business off the market for the length of that period, commonly 60–90 days.",
    sellerPrep: "Read the full structure, not just the headline number — cash at close, seller note, earnout, and rollover equity can make two similar-looking offers very different deals.",
    buyerEvaluates: "The seller's willingness to commit to exclusivity, which signals real intent to transact.",
    commonProblems: "Signing an LOI based on price alone, without scrutinizing contingencies and structure, then discovering the real terms during diligence.",
    link: { href: "/resources/letter-of-intent", label: "Read more about LOIs" },
  },
  {
    name: "8. Exclusivity",
    summary: "The seller is committed to one buyer while that buyer completes diligence and finalizes financing.",
    whatHappens: "During the exclusivity window, the buyer runs diligence and the seller stops engaging other prospective buyers.",
    sellerPrep: "Keep running the business normally — this is not the time to under-invest or to aggressively optimize short-term cash at the expense of working capital.",
    buyerEvaluates: "Everything, in depth — this is when the buyer confirms the business is what the CIM and conversations represented.",
    commonProblems: "Business performance dipping during exclusivity (owner distraction, deferred decisions) in a way that gives the buyer leverage to renegotiate.",
  },
  {
    name: "9. Quality of Earnings",
    summary: "The buyer's accountants independently rebuild the company's earnings to test whether they're accurate and sustainable.",
    whatHappens: "A QoE review — distinct from an audit — scrutinizes add-backs, revenue recognition, customer concentration, and working capital trends, often adjusting the seller's claimed earnings figure.",
    sellerPrep: "Every add-back documented with dated support, and a clear separation of one-time versus recurring items in your own reporting, done well before this stage.",
    buyerEvaluates: "Whether the earnings figure the price was based on will actually recur under new ownership.",
    commonProblems: "Add-backs the seller can't substantiate get removed from earnings entirely, which can pull the price down at exactly the point in the process the seller has the least leverage.",
    link: { href: "/resources/quality-of-earnings", label: "Read more about Quality of Earnings" },
  },
  {
    name: "10. Due Diligence",
    summary: "The buyer's team examines the business in depth — financial, commercial, operational, legal, HR, and tax.",
    whatHappens: "This runs in parallel with QoE and typically spans several workstreams, with scope varying by deal size and buyer type.",
    sellerPrep: "Organized, current records and a designated point person to manage the flow of information requests without disrupting daily operations.",
    buyerEvaluates: "Whether the business matches what was represented — contracts, customer relationships, compliance history, and key-person dependencies especially.",
    commonProblems: "Scrambling to produce basic documentation mid-process creates openings for buyers to renegotiate price or walk away.",
    link: { href: "/resources/due-diligence", label: "Read more about due diligence" },
  },
  {
    name: "11. Definitive Agreements",
    summary: "Once diligence is substantially complete, the parties negotiate and sign the actual purchase agreement.",
    whatHappens: "Legal counsel for both sides negotiates the purchase agreement and related documents — representations, warranties, indemnification, and every deal term finalized in binding form.",
    sellerPrep: "Transaction counsel who has actually negotiated purchase agreements before, not a generalist attorney.",
    buyerEvaluates: "Whether the representations and warranties the seller is willing to stand behind match what diligence found.",
    commonProblems: "Under-negotiated indemnification terms that leave the seller exposed well after closing.",
  },
  {
    name: "12. Working Capital & Closing Mechanics",
    summary: "The specific working capital target, purchase-price adjustments, and closing logistics get finalized.",
    whatHappens: "The agreement defines exactly how working capital will be measured and trued up post-closing, along with escrow, holdback, and any other closing-day mechanics.",
    sellerPrep: "Run the working capital calculation yourself before closing so a post-closing adjustment isn't a surprise.",
    buyerEvaluates: "That the business is delivered with the operating capital needed to run it without an immediate cash injection.",
    commonProblems: "A working capital true-up going against the seller months after closing because the target or definition wasn't negotiated carefully.",
    link: { href: "/resources/working-capital-adjustments", label: "Read more about working capital adjustments" },
  },
  {
    name: "13. Closing",
    summary: "Funds move, ownership transfers, and — depending on structure — some obligations continue afterward.",
    whatHappens: "Signatures execute, funds are wired, and ownership formally transfers. Structure varies: some deals close in a single step, others involve a seller note, earnout, transition period, or rollover equity that extends well past this date.",
    sellerPrep: "Clarity on any post-closing obligations — transition support, non-compete terms, earnout mechanics — before signing, not after.",
    buyerEvaluates: "That every closing condition has actually been satisfied.",
    commonProblems: "Assuming closing is the finish line when an earnout, note, or rollover equity means real financial outcomes are still ahead.",
    link: { href: "/resources/enterprise-value-vs-proceeds", label: "See what actually happens to proceeds after this point" },
  },
  {
    name: "14. Post-Closing",
    summary: "For deals with an earnout, note, or rollover equity, the transaction isn't fully resolved at closing.",
    whatHappens: "The seller may continue in a transition or consulting role, monitor earnout performance, service a seller note, or hold rollover equity toward a future liquidity event.",
    sellerPrep: "Realistic expectations about how much control you'll have over outcomes you're still financially exposed to.",
    buyerEvaluates: "n/a — the buyer is now running the business.",
    commonProblems: "Discovering after the fact how much of the headline price was actually contingent, rather than understanding that going in.",
  },
];

export default function SellYourBusinessPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Complete Business Sale Process",
    description:
      "A first-time seller's stage-by-stage guide to how a business sale actually works, from preparation through closing.",
    url: `${SITE_URL}/sell-your-business`,
    author: { "@type": "Organization", name: "OwnerGauge" },
    publisher: { "@type": "Organization", name: "OwnerGauge" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "The Complete Business Sale Process", item: `${SITE_URL}/sell-your-business` },
    ],
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <main className="flex-1 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
            The process
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
            The Complete Business Sale Process
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Most owners have never gone through a sale before. Selling a
            business is a process, not a single event — and knowing the
            stages ahead of time, what each one actually requires, and where
            deals commonly run into trouble makes it far less uncertain.
          </p>
          <p className="mt-4 leading-relaxed text-ink">
            Timelines vary substantially by deal size. The IBBA &amp; M&amp;A
            Source&apos;s Q4 2025 Market Pulse survey found average time to close
            ranging from roughly six months for businesses under $500K, to
            eight months in the $500K–$2M range, ten months at $2M–$5M, and
            about twelve months for lower-middle-market companies in the
            $5M–$50M range. Every deal is different — treat these as
            directional, not a guarantee for any specific transaction.
          </p>
          <div className="mt-3">
            <DataFreshness dataAsOf="Q4 2025" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            This is a general overview for informational purposes, not legal
            or transaction advice. Every deal is different, and terms,
            sequencing, and requirements vary by business and buyer.
          </p>

          <div className="mt-14 space-y-6">
            {STAGES.map((stage) => (
              <details
                key={stage.name}
                className="group rounded-lg border border-line bg-surface p-5 sm:p-6"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-primary">
                        {stage.name}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{stage.summary}</p>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 flex-none text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </div>
                </summary>

                <div className="mt-5 space-y-4 border-t border-line pt-5 text-sm leading-relaxed">
                  <div>
                    <p className="font-medium text-ink">What happens</p>
                    <p className="mt-1 text-muted">{stage.whatHappens}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ink">What the seller needs to prepare</p>
                    <p className="mt-1 text-muted">{stage.sellerPrep}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ink">What the buyer is evaluating</p>
                    <p className="mt-1 text-muted">{stage.buyerEvaluates}</p>
                  </div>
                  <div>
                    <p className="font-medium text-ink">What commonly causes problems</p>
                    <p className="mt-1 text-muted">{stage.commonProblems}</p>
                  </div>
                  {stage.link && (
                    <Link
                      href={stage.link.href}
                      className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {stage.link.label} →
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">Who Might Buy the Business</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-ink">
              <p><strong>Strategic buyers</strong> are operating companies pursuing capabilities, customers, people, or geography. Their view of value may include synergies, but integration fit matters.</p>
              <p><strong>Private equity buyers</strong> invest on behalf of a fund and may acquire a platform or add-on. They focus on durable cash flow, management, growth, and a credible future exit.</p>
              <p><strong>Other financial buyers</strong>, including individuals and family offices, generally underwrite the business as a standalone investment and may rely more heavily on financing.</p>
            </div>
            <Link
              href="/resources/ebitda-multiple"
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See how buyer type affects valuation →
            </Link>
          </section>

          <section className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold text-primary">Terms Owners Encounter</h2>
            <dl className="mt-5 space-y-5">
              <div><dt className="font-medium text-ink">Confidentiality / NDA</dt><dd className="mt-1 text-sm leading-relaxed text-muted">Buyer outreach normally limits identifying information until a credible party signs a nondisclosure agreement. Confidentiality reduces risk; it cannot eliminate it.</dd></div>
              <div><dt className="font-medium text-ink">CIM</dt><dd className="mt-1 text-sm leading-relaxed text-muted">A confidential information memorandum explains the company, market, operations, growth case, and historical financial performance to qualified buyers.</dd></div>
              <div><dt className="font-medium text-ink">IOI</dt><dd className="mt-1 text-sm leading-relaxed text-muted">A preliminary, non-binding indication of interest — a price range and proposed structure, submitted before deep diligence begins.</dd></div>
            </dl>
          </section>

          <SourcesList sourceIds={["ibba-market-pulse-q4-2025"]} />

          <div className="mt-16 rounded-lg border border-line bg-surface p-8 text-center">
            <p className="font-display text-xl text-primary">
              Not sure where your business stands today?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Start with an estimated market value and a directional read on
              your deal readiness.
            </p>
            <Link
              href="/calculator"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Assess Your Deal Readiness
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
