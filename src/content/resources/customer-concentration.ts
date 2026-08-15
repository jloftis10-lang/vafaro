import type { ResourceArticle } from "@/content/resources/types";

export const customerConcentration: ResourceArticle = {
  slug: "customer-concentration",
  title: "Customer Concentration: Why Buyers Draw the Line Around 20%",
  metaDescription:
    "Why buyers scrutinize customer concentration above roughly 20% of revenue, how it affects price and deal structure, and what actually reduces the risk.",
  dek: "Losing your largest customer the week after closing is a buyer's worst-case scenario — and the more of your revenue that customer represents, the more that scenario shapes the offer you get.",
  sections: [
    {
      heading: "Where buyers start paying attention",
      paragraphs: [
        "There's no universal legal threshold, but in practice buyers start scrutinizing a single customer once it crosses roughly 20% of revenue, and concentration above 50% is treated as a severe risk that can affect not just price but whether a deal happens at all.",
        "The concern isn't abstract — it's about what a buyer is actually purchasing. If a third of your revenue depends on one relationship, a buyer is effectively underwriting the durability of that one relationship, not just the business as a whole.",
      ],
    },
    {
      heading: "What matters beyond the raw percentage",
      paragraphs: [
        "A concentrated customer under a signed, multi-year contract is a meaningfully different risk than the same concentration resting on an informal, decades-long relationship with no paper behind it — even though both show up identically as \"50% of revenue\" on a spreadsheet.",
        "Buyers also look at why the concentration exists: is it because the business has genuinely earned an outsized share of one large client's spend (which can be a strength, if durable), or because the business never invested in sales and business development beyond one relationship (a weakness)? Top-five customer concentration, not just the single largest account, factors in too — a business with five customers at 15% each carries different risk than one with one customer at 45% and the rest fragmented.",
      ],
    },
    {
      heading: "What actually reduces the risk",
      paragraphs: [
        "Formalizing the relationship under a longer-term contract is the fastest lever if the relationship itself is healthy — it converts an informal dependency into a documented, transferable one. Beyond that, the only real fix is diversification: adding customers, expanding into new segments, or growing other accounts faster than the concentrated one, which takes time and can't be manufactured in the run-up to a sale.",
        "If concentration can't be meaningfully reduced before going to market, expect it to show up in deal structure rather than just price — buyers sometimes address concentration risk through an earnout tied to retaining the key account, rather than paying full value for revenue they're not fully confident will survive the transition.",
      ],
    },
  ],
  relatedSlugs: ["owner-dependency", "earnouts"],
  siteLinks: [
    { href: "/calculator", label: "See how customer concentration moves your own estimate" },
    { href: "/resources/enterprise-value-vs-proceeds", label: "See how this can shape deal structure, not just price" },
  ],
};
