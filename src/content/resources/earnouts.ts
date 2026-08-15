import type { ResourceArticle } from "@/content/resources/types";

export const earnouts: ResourceArticle = {
  slug: "earnouts",
  title: "Earnouts: How They Work and What to Watch For",
  metaDescription:
    "How earnouts bridge a valuation gap between buyer and seller, the risks sellers take on, and what terms actually determine whether you get paid.",
  dek: "An earnout can close a real gap between what a buyer will pay today and what a seller believes the business is worth — but a poorly structured one shifts real risk onto the seller after they've already given up control.",
  sections: [
    {
      heading: "What an earnout is for",
      paragraphs: [
        "An earnout is contingent, deferred consideration — a portion of the purchase price paid only if the business hits agreed-upon performance targets after closing, typically revenue or EBITDA milestones measured over one to three years. Buyers use them to bridge a valuation disagreement (often when a seller is confident in future growth the buyer isn't yet willing to pay for up front) or to reduce risk on a business with limited operating history or customer concentration.",
        "From the seller's side, an earnout is effectively a bet that the business will perform after the sale — except the seller usually no longer controls the decisions that determine whether it does.",
      ],
    },
    {
      heading: "Where earnouts commonly go wrong for sellers",
      paragraphs: [
        "The biggest risk is loss of control: once a buyer owns the business, they make decisions about pricing, staffing, capital investment, and integration with their existing operations — any of which can suppress the metric the earnout is tied to, intentionally or not. A seller with no operating authority post-closing has limited ability to protect a number they're financially dependent on.",
        "Poorly defined metrics compound the problem. Earnouts based on ambiguous or easily manipulated figures (allocated overhead, transfer pricing between the acquired business and the buyer's other units) create disputes; earnouts tied to clean, independently verifiable numbers with a defined calculation methodology are far more defensible.",
      ],
    },
    {
      heading: "Terms that actually protect a seller",
      paragraphs: [
        "The details matter more than the headline earnout percentage: a clear, auditable calculation methodology; covenants requiring the buyer to run the business in a manner consistent with maximizing earnout performance (not the reverse); the seller's right to review supporting financials; and, ideally, some level of operating input or veto over changes that would materially affect the metric.",
        "Any earnout term sheet is worth having reviewed by an advisor or attorney who has seen how these actually resolve in practice — the difference between a well-structured and poorly-structured earnout is often the difference between collecting the full price and collecting a fraction of it.",
      ],
    },
  ],
  relatedSlugs: ["enterprise-value-vs-proceeds", "letter-of-intent", "asset-sale-vs-stock-sale"],
  siteLinks: [{ href: "/sell-your-business", label: "See where deal structure fits in the full sale process" }],
};
