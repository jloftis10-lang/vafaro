import type { ResourceArticle } from "@/content/resources/types";

export const dueDiligence: ResourceArticle = {
  slug: "due-diligence",
  title: "What Happens During Due Diligence When You Sell a Business?",
  metaDescription:
    "What buyers actually examine during due diligence, how long it typically takes, and how preparation changes the experience.",
  dek: "Due diligence is where a buyer confirms everything they've been told about the business — it's usually the most demanding phase of a sale.",
  sections: [
    {
      heading: "What gets reviewed",
      paragraphs: [
        "Due diligence typically spans several areas: financial (historical statements, quality of earnings, add-back support), commercial (customer concentration, contracts, market position), operational (processes, key personnel, systems), legal (contracts, litigation history, IP, licensing), HR (employment agreements, benefits, key-person dependencies), and tax (filings, any exposure or open issues).",
        "The exact scope varies with deal size and buyer type — a private equity buyer running a full quality-of-earnings review will go deeper than an individual buyer financing part of the deal through an SBA loan, for example.",
      ],
    },
    {
      heading: "How long it takes",
      paragraphs: [
        "For a small or lower-middle-market business, diligence commonly runs somewhere between 30 and 90 days, depending on how organized the seller's information is, the complexity of the business, and whether early findings raise questions that need follow-up.",
      ],
    },
    {
      heading: "How preparation changes the experience",
      paragraphs: [
        "Businesses that enter diligence with clean, current financials, documented add-backs, and organized records tend to move through it faster and with fewer surprises that affect price or terms. Businesses that are scrambling to produce basic documentation mid-process create openings for buyers to renegotiate — or walk away.",
        "The most effective preparation happens well before a process starts: reconciled financials, a documented add-back schedule, and clear operational documentation aren't things that can be assembled convincingly in a few weeks once a buyer is already asking.",
      ],
    },
  ],
  relatedSlugs: ["letter-of-intent", "quality-of-earnings", "add-backs"],
  siteLinks: [{ href: "/sell-your-business", label: "See where this fits in the full sale process" }],
};
