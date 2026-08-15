import type { ResourceArticle } from "@/content/resources/types";

export const sdeVsEbitda: ResourceArticle = {
  slug: "sde-vs-ebitda",
  title: "SDE vs. EBITDA: Which One Actually Matters for Your Business?",
  metaDescription:
    "The difference between SDE and EBITDA, when each is used, and why the distinction matters for how your business gets valued.",
  dek: "Both are ways of measuring a business's true earnings — but they're built for businesses at different stages, and using the wrong one can distort your valuation.",
  sections: [
    {
      heading: "What each one measures",
      paragraphs: [
        "SDE — Seller's Discretionary Earnings — starts with net income and adds back the owner's full compensation, benefits, and personal expenses run through the business, plus interest, taxes, depreciation, and amortization. It's designed to answer a specific question: if I bought this business and worked in it myself, what would it generate for me?",
        "EBITDA — Earnings Before Interest, Taxes, Depreciation, and Amortization — normalizes for interest, taxes, and non-cash charges, but typically only adds back one owner's compensation at a fair market-rate salary, not the owner's full pay. It assumes the business is run by a management team that would need to be paid regardless of who owns it.",
      ],
    },
    {
      heading: "Which one applies to your business",
      paragraphs: [
        "SDE is the standard for smaller, owner-operated businesses — generally where the owner is still working full-time in the business and there isn't a full management layer below them. EBITDA becomes more relevant as a business scales and could reasonably run without its current owner in the room every day.",
        "There's no hard revenue cutoff where one replaces the other — it's really about how dependent the business is on the owner personally. A $2M-revenue business with a strong general manager might be more appropriately valued on EBITDA than a $5M-revenue business where the owner still touches everything.",
      ],
    },
    {
      heading: "Why the distinction matters",
      paragraphs: [
        "Using the wrong metric — or applying an industry multiple meant for one to the other — can produce a wildly inflated or deflated estimate. A multiple built around EBITDA assumes a management-run business; applying it to a number that already includes the owner's full salary double-counts that value.",
        "It's also worth knowing which one buyers in your industry and size range typically use, since that's the conversation you'll actually be having once you're in a real process.",
      ],
    },
  ],
  relatedSlugs: ["ebitda-multiple", "add-backs"],
  siteLinks: [{ href: "/methodology", label: "See how OwnerGauge applies this in practice" }],
};
