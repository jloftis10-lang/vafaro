import type { ResourceArticle } from "@/content/resources/types";

export const workingCapitalAdjustments: ResourceArticle = {
  slug: "working-capital-adjustments",
  title: "Working Capital Adjustments: The Post-Closing Surprise Most Sellers Don't See Coming",
  metaDescription:
    "How working capital targets and true-up adjustments work in a business sale, and why sellers are often surprised by a post-closing payment.",
  dek: "Most sellers focus entirely on the headline price and structure — and are caught off guard months later by a working capital true-up that changes what they actually collected.",
  sections: [
    {
      heading: "Why a working capital target exists at all",
      paragraphs: [
        "Most deals are priced on a \"cash-free, debt-free\" basis with a normal, ongoing level of working capital — the cash tied up in receivables and inventory, net of payables — left in the business at closing so the buyer can operate it without immediately injecting more cash. That expected level is negotiated as a target, usually based on a trailing average.",
        "If the business is delivered at closing with more working capital than the target, the seller is typically owed more; if it's delivered with less, the seller owes the buyer the difference. Either way, the number isn't finalized at closing — it's estimated, then trued up afterward once actual closing-date figures are confirmed.",
      ],
    },
    {
      heading: "Where the surprise usually comes from",
      paragraphs: [
        "The true-up happens 60 to 120 days after closing, once the buyer's accountants finalize the actual working capital delivered against the target. Sellers who weren't closely involved in negotiating the target — or who let receivables slip, drew down inventory, or delayed payables in the run-up to closing — often find the final adjustment goes against them.",
        "It's common for owners to unconsciously manage the business differently in the months before a sale (collecting cash faster, deferring purchases) in ways that look good on a trailing income statement but shrink the working capital they're entitled to at closing.",
      ],
    },
    {
      heading: "How to protect yourself",
      paragraphs: [
        "Negotiate the target and the definition of working capital (which accounts are included, how inventory is valued, whether unusual items are excluded) as carefully as you negotiate price — this is not boilerplate. Run the calculation yourself in the weeks before closing so a big adjustment doesn't arrive as a surprise, and keep operating the business normally through closing rather than optimizing short-term cash at the expense of the working capital you'll be measured against.",
      ],
    },
  ],
  relatedSlugs: ["enterprise-value-vs-proceeds", "letter-of-intent", "due-diligence"],
  siteLinks: [{ href: "/sell-your-business", label: "See where this fits in the full sale process" }],
};
