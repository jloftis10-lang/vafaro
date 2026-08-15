import type { ResourceArticle } from "@/content/resources/types";

export const assetSaleVsStockSale: ResourceArticle = {
  slug: "asset-sale-vs-stock-sale",
  title: "Asset Sale vs. Stock Sale: What It Means for Your Payout",
  metaDescription:
    "The difference between an asset sale and a stock sale, why buyers usually prefer one, and how the choice affects what you actually keep.",
  dek: "The same headline price can leave you with very different after-tax proceeds depending on how the deal is structured — and buyers and sellers usually want opposite structures for opposite reasons.",
  sections: [
    {
      heading: "What each structure actually transfers",
      paragraphs: [
        "In an asset sale, the buyer purchases the company's individual assets — equipment, inventory, customer contracts, intellectual property, goodwill — while the seller's legal entity keeps its cash, retains its liabilities not specifically assumed, and is eventually wound down. In a stock (or equity) sale, the buyer purchases ownership of the entity itself, taking on everything inside it — assets, liabilities, contracts, and history — as-is.",
        "The distinction matters because it determines what's actually changing hands: a specific list of assets the buyer selects, versus the whole company, warts and all.",
      ],
    },
    {
      heading: "Why buyers usually prefer asset deals",
      paragraphs: [
        "Buyers generally prefer asset sales because they can choose exactly which assets and liabilities to take on, leave behind unknown or contingent liabilities (pending litigation, unfunded obligations, tax exposure) with the seller's old entity, and often get a stepped-up tax basis on the acquired assets that generates larger depreciation deductions going forward.",
        "Sellers, on the other hand, often prefer stock sales — proceeds are typically taxed once at capital gains rates, rather than potentially facing double taxation at the corporate and shareholder level that can apply to an asset sale from a C-corporation. For pass-through entities (S-corps, LLCs), the tax gap between the two structures is usually smaller, but the liability and contract-assignment issues still apply.",
      ],
    },
    {
      heading: "What tends to get negotiated",
      paragraphs: [
        "Deal structure is rarely all-or-nothing. It's common to see structures like a 338(h)(10) election, which lets an asset sale be treated as a stock sale for legal purposes but an asset sale for tax purposes, or negotiated allocations of purchase price across asset categories that affect both parties' tax outcomes.",
        "This is one of the areas where a seller's own tax and legal advisors matter most — the difference between structures can be a meaningful percentage of net proceeds, and it's rarely obvious from the headline offer price alone.",
      ],
    },
  ],
  relatedSlugs: ["enterprise-value-vs-proceeds", "letter-of-intent", "earnouts"],
  siteLinks: [{ href: "/sell-your-business", label: "See where deal structure fits in the full sale process" }],
};
