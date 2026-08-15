import type { ResourceArticle } from "@/content/resources/types";

export const enterpriseValueVsProceeds: ResourceArticle = {
  slug: "enterprise-value-vs-proceeds",
  title: "Enterprise Value vs. What You Actually Take Home",
  metaDescription:
    "A buyer might value your business at $10 million — that doesn't mean $10 million lands in your bank account at closing. Here's everything that sits between the two.",
  dek: "A buyer might value a business at $10 million, but that doesn't mean the seller receives $10 million in cash at closing. Debt, working capital, transaction expenses, escrow, seller financing, earnouts, rollover equity, and taxes all sit between the headline number and what actually lands in your account.",
  showProceedsWaterfall: true,
  sections: [
    {
      heading: "Enterprise value",
      paragraphs: [
        "Enterprise value is what a buyer is paying for the operating business itself — its ability to generate cash going forward, independent of how it happens to be financed today. It's the number that usually gets discussed first, and the one an SDE or EBITDA multiple produces.",
        "It is not, on its own, what the seller walks away with. Enterprise value assumes a debt-free, cash-free business — everything that follows in this article is about the adjustments that turn that headline figure into actual proceeds.",
      ],
    },
    {
      heading: "Equity value",
      paragraphs: [
        "In broad terms: Enterprise Value, minus the company's debt, plus or minus certain cash and debt-like items, plus or minus deal-specific adjustments, equals Equity Value — the value of the seller's ownership stake, before transaction costs and taxes.",
        "That's a simplified version of the math, not a formula that applies identically to every transaction. What counts as debt-like (a capital lease, deferred revenue, an unfunded liability) and how cash is treated varies by deal and by how the purchase agreement defines it — which is exactly why the specific language in a Letter of Intent and purchase agreement matters as much as the headline price.",
      ],
    },
    {
      heading: "Cash at closing isn't the whole story",
      paragraphs: [
        "A transaction's total consideration can include cash paid at closing, a seller note, escrow, a holdback, an earnout, and rollover equity — often several of these at once. The headline purchase price a buyer quotes is usually the sum of all of it, not what shows up in the seller's account the day the deal closes.",
        "Only cash at closing is immediate and unconditional. Everything else on that list is either delayed, contingent on future performance, or dependent on the seller continuing to hold an ownership stake — real value, but not the same thing as cash in hand.",
      ],
    },
    {
      heading: "Seller notes",
      paragraphs: [
        "A seller note is financing the seller extends to the buyer — part of the purchase price paid over time, with interest, rather than at closing. Buyers use them to bridge a financing gap or to signal the seller's confidence in the business's ability to keep performing.",
        "For the seller, a note carries real risk: repayment depends on the buyer successfully running the business and choosing to pay. Terms — interest rate, repayment schedule, security, and what happens if a payment is missed — determine how much that risk actually matters.",
      ],
    },
    {
      heading: "Earnouts",
      paragraphs: [
        "An earnout is contingent, deferred consideration — a portion of price paid only if the business hits agreed-upon financial or operating milestones after closing, typically measured over one to three years.",
        "The seller usually has little or no operating control after closing, yet the earnout depends on decisions the new owner makes about pricing, staffing, and investment. A nominal earnout figure in an LOI is not the same as guaranteed cash — it's worth reading the full mechanics of how earnouts get measured and negotiated before treating one as part of your expected proceeds.",
      ],
      disclaimer: "earnout",
    },
    {
      heading: "Rollover equity",
      paragraphs: [
        "Rollover equity means the seller reinvests part of their proceeds into the new ownership structure rather than taking all cash — common in private-equity-backed deals, where the buyer wants the seller financially aligned with the business's future performance.",
        "It can offer meaningful future upside if the business grows under new ownership, but it also carries real liquidity risk: rollover equity is typically illiquid, often a minority stake, and its eventual value depends on a future sale event (sometimes called a \"second bite of the apple\") that may be years away and isn't guaranteed to happen on favorable terms — or at all.",
      ],
    },
    {
      heading: "Working capital",
      paragraphs: [
        "Most deals are priced with a normal, ongoing level of working capital — cash tied up in receivables and inventory, net of payables — expected to remain in the business at closing so the buyer can operate it without an immediate cash injection. That expected level, the working capital target or \"peg,\" gets trued up after closing against what was actually delivered.",
        "If the business is delivered with less working capital than the target, the seller owes the buyer the difference — a real, sometimes unexpected reduction to proceeds that shows up months after closing, not at the closing table itself.",
      ],
      disclaimer: "working-capital",
    },
    {
      heading: "Transaction expenses",
      paragraphs: [
        "Selling a business involves real costs: advisory or investment-banking fees, legal fees, accounting support, and the cost of preparing for and responding to diligence (including, on larger deals, a sell-side Quality of Earnings engagement). These come out of proceeds before the seller sees the remainder.",
        "The specific amounts vary widely by deal size, complexity, and who's advising the transaction — there's no standard percentage worth quoting here as if it applied universally. Ask any advisor you're evaluating for a clear, specific estimate of their fee structure before engaging.",
      ],
    },
    {
      heading: "Taxes",
      paragraphs: [
        "Tax treatment is one of the largest, and most transaction-specific, factors separating enterprise value from what a seller actually keeps — and it's not something a general resource can responsibly calculate for you.",
        "What matters: whether the deal is structured as an asset sale or an equity sale, the seller's tax basis in the business, the jurisdiction(s) involved, and the seller's own personal tax situation. The gap between an asset sale and a stock sale alone can meaningfully change after-tax proceeds — worth reading in detail before a deal structure is set.",
      ],
      disclaimer: "tax",
    },
  ],
  relatedSlugs: ["asset-sale-vs-stock-sale", "earnouts", "working-capital-adjustments"],
  siteLinks: [
    { href: "/methodology", label: "See how OwnerGauge's own estimate approaches this" },
  ],
};
