import type { ResourceArticle } from "@/content/resources/types";

export const letterOfIntent: ResourceArticle = {
  slug: "letter-of-intent",
  title: "What Is a Letter of Intent (LOI) in a Business Sale?",
  metaDescription:
    "What a Letter of Intent covers, which parts are binding, and why terms beyond price are often just as important.",
  dek: "An LOI sets the framework for a deal — but signing one usually means taking your business off the market while a buyer confirms it.",
  sections: [
    {
      heading: "What an LOI is",
      paragraphs: [
        "A Letter of Intent is a document outlining the proposed terms of a transaction — price, structure, and timeline — submitted after a buyer has done enough preliminary review to make a serious offer. It typically follows one or more indications of interest from prospective buyers.",
      ],
    },
    {
      heading: "What's binding and what isn't",
      paragraphs: [
        "Most of an LOI is explicitly non-binding — the final price and terms are still subject to due diligence and definitive documentation. But a few provisions usually are binding: confidentiality, and often an exclusivity period during which the seller agrees not to negotiate with other buyers.",
        "That exclusivity clause is the real commitment in an LOI. Signing one generally means your business is effectively off the market for the length of that period — commonly 60 to 90 days — while the buyer completes diligence.",
      ],
    },
    {
      heading: "Why terms beyond price matter",
      paragraphs: [
        "Two LOIs at the same headline price can be very different deals. Structure (cash at close versus an earnout or seller note), contingencies, working capital requirements, and any post-closing employment or consulting expectations can all meaningfully change what you actually walk away with — and when.",
        "It's worth reading an LOI as closely for what happens if things don't go exactly as planned as for what happens if they do.",
      ],
    },
  ],
  relatedSlugs: ["due-diligence", "earnouts", "working-capital-adjustments"],
  siteLinks: [{ href: "/sell-your-business", label: "See where this fits in the full sale process" }],
};
