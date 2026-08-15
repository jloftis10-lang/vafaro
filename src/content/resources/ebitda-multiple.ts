import type { ResourceArticle } from "@/content/resources/types";

export const ebitdaMultiple: ResourceArticle = {
  slug: "ebitda-multiple",
  title: "How EBITDA Multiples Actually Work",
  metaDescription:
    "There is no single correct multiple for an industry. Here's what actually determines where a specific business falls within a range — earnings metric, size, buyer type, and quality.",
  dek: "Two businesses in the same industry, with the same revenue, can trade at meaningfully different multiples. The multiple is where every judgment a buyer makes about risk and quality gets priced in.",
  dataAsOf: "H1 2025",
  sections: [
    {
      heading: "What a multiple actually represents",
      paragraphs: [
        "A valuation multiple converts a single year of earnings into an estimated business value: earnings × multiple = value. A 4x multiple on $500,000 of earnings implies roughly $2M in enterprise value.",
        "The multiple itself is a proxy for risk and durability, not a fixed industry constant. Buyers pay more for a dollar of earnings they believe is likely to keep showing up next year with minimal disruption, and less for a dollar that feels fragile — tied to one customer, one relationship, or one person who might not stick around after closing.",
      ],
    },
    {
      heading: "SDE, EBITDA, and Adjusted EBITDA aren't interchangeable",
      paragraphs: [
        "Seller's Discretionary Earnings (SDE) starts from net income and adds back the owner's full compensation, benefits, and personal expenses run through the business, plus interest, taxes, depreciation, and amortization. It answers: if I bought this business and ran it myself, what would it generate for me? It's the standard for smaller, owner-operated businesses.",
        "EBITDA normalizes for interest, taxes, and non-cash charges but typically adds back only one owner's compensation at a fair market-rate salary — it assumes a management team runs the business, not the owner personally. It becomes the more natural metric as a company scales past what one owner can run alone.",
        "Adjusted EBITDA goes further: it layers in add-backs for one-time or non-operating items — a lawsuit settlement, a bad year of storm damage, a one-time consulting project — that a buyer's accountant agrees don't reflect the ongoing business. Every adjustment needs documented support; undocumented add-backs are the most common thing a Quality of Earnings review strips back out.",
        "Revenue multiples show up in some categories (certain SaaS and subscription businesses, for example) when a company is growing fast enough that current-year profitability understates its trajectory. Revenue alone says very little about profitability, though — a revenue multiple without a margin conversation is an incomplete picture.",
      ],
    },
    {
      heading: "Size changes which buyers show up, and what they pay",
      paragraphs: [
        `A larger business — more institutional systems, a management layer, diversified customers and revenue lines — attracts a different buyer population than a smaller owner-operated company, and that population pays differently. This is often called the size premium: EBITDA multiples generally increase in step-changes as enterprise value climbs through size bands, not smoothly.`,
        "GF Data's aggregated private-equity-sponsored transaction data for H1 2025 shows this pattern clearly across the lower middle market: multiples that sit in the mid-5x range around $1M–$10M of enterprise value climb toward the high-6x to 7x range at $10M–$25M, and keep climbing at $25M–$50M and above. This dataset covers PE-sponsored platform buyouts specifically — it is not a universal benchmark for every deal at every size, and a business well below this dataset's size floor should treat it as directional market context, not a quote.",
      ],
    },
    {
      heading: "Buyer type matters as much as industry",
      paragraphs: [
        "Different buyer populations value the same business differently, because they're solving different problems:",
      ],
    },
  ],
  buyerTypes: [
    { name: "Individual buyers", description: "Often financing part of the purchase (SBA or seller notes), typically buying a business they'll run day-to-day. Price sensitivity is high relative to their available capital." },
    { name: "Strategic buyers", description: "Already operate in or adjacent to the industry. May pay a premium for synergies — cross-selling, shared overhead, eliminating a competitor — that a financial buyer wouldn't value the same way." },
    { name: "PE platform investors", description: "Buying a business intended to become the base of a larger roll-up strategy. Willing to pay for scale potential and management infrastructure, not just current earnings." },
    { name: "PE-backed add-ons", description: "Buying on behalf of an existing platform company. Valuation often reflects synergies with the platform rather than the business's standalone earnings alone." },
    { name: "Family offices", description: "Increasingly active in the lower middle market, often with a longer hold horizon and more flexible structure than a traditional PE fund." },
    { name: "Search funds / ETA buyers", description: "Individual entrepreneurs backed by investor capital, typically targeting a single acquisition. Process and diligence resemble a small PE deal more than an individual buyer." },
  ],
  additionalSections: [
    {
      heading: "Platform vs. add-on isn't a simple premium",
      paragraphs: [
        "A platform investment — the first acquisition in a new strategy — and an add-on acquisition — folded into an existing portfolio company — involve different strategic logic, not a fixed rule that one always pays more.",
        "A platform typically needs to stand alone: enough scale, management depth, and infrastructure to be a credible foundation, which can support a premium multiple. An add-on can lean on the platform's existing systems and leadership, which sometimes justifies paying up for strategic fit even at a smaller size — and sometimes means the seller captures less of the value created, since much of the upside accrues to the platform. Which dynamic applies depends on the specific buyer and deal, not the industry alone.",
      ],
    },
    {
      heading: "Making OwnerGauge's own valuation model explainable",
      paragraphs: [
        "OwnerGauge's assessment doesn't treat every quality factor as an equal, interchangeable input. The valuation engine specifically adjusts the multiple based on four measured inputs from your answers: revenue trend, owner involvement in day-to-day operations, customer concentration, and the share of revenue that's recurring or contracted — each within a defined, bounded range, applied on top of the industry's starting multiple.",
        "Other factors that genuinely matter to a real buyer — management depth, documented processes, financial statement quality — are measured by OwnerGauge's separate Deal Readiness score rather than folded into the valuation multiple itself. That's a deliberate design choice: readiness affects how smoothly a transaction goes and how much of the headline value actually survives diligence, which is a related but different question from where the starting multiple falls.",
      ],
    },
  ],
  valuationFactors: {
    supportingHeading: "Factors That Can Support Buyer Interest",
    supporting: [
      "Recurring or contracted revenue",
      "Diversified customer base",
      "Consistent or growing earnings trend",
      "Business runs without the owner day-to-day",
      "Strong management depth",
      "Clean, well-documented financials",
      "Documented systems and processes",
    ],
    pressureHeading: "Factors That Can Create Downward Pressure",
    pressure: [
      "Customer concentration in one or a few accounts",
      "Heavy owner dependence",
      "Declining earnings trend",
      "Weak or commingled financial records",
      "Undocumented add-backs",
      "Key-person risk beyond the owner",
      "Low revenue visibility going forward",
    ],
  },
  sourceIds: ["gf-data-small-deal-resilience-h1-2025"],
  relatedSlugs: ["sde-vs-ebitda", "add-backs", "enterprise-value-vs-proceeds"],
  siteLinks: [
    { href: "/methodology", label: "See how OwnerGauge applies this in practice" },
    { href: "/calculator", label: "See how your business's own inputs move the multiple" },
  ],
};
