import type { ResourceArticle } from "@/content/resources/types";

export const qualityOfEarnings: ResourceArticle = {
  slug: "quality-of-earnings",
  title: "What Is a Quality of Earnings (QoE) Report — and Why Does a Buyer Order One?",
  metaDescription:
    "What a Quality of Earnings report examines, how it differs from an audit, and what sellers can do to prepare for one.",
  dek: "A QoE report isn't checking whether your books are technically correct — it's checking whether your reported earnings are the earnings a buyer can actually count on going forward.",
  sections: [
    {
      heading: "What it examines that a normal financial statement doesn't",
      paragraphs: [
        "A Quality of Earnings report, typically prepared by an independent accounting firm on the buyer's behalf, rebuilds a company's historical earnings to test whether they're accurate, sustainable, and normalized — not just whether they match what's on the tax return or internal financials. It scrutinizes add-backs, one-time items, revenue recognition, customer concentration, and working capital trends line by line.",
        "This is different from an audit, which opines on whether financial statements comply with accounting standards. A QoE doesn't care whether your books are technically compliant — it cares whether the earnings figure a buyer is about to pay a multiple on will actually recur.",
      ],
    },
    {
      heading: "What commonly gets challenged",
      paragraphs: [
        "Add-backs are the most common friction point — a QoE team will push back on add-backs that aren't well-documented, that recur more than the seller claims, or that blend personal and legitimate business expense in ways that are hard to defend. Revenue that depends on a customer relationship, contract, or pricing arrangement that's ending is another frequent adjustment, along with one-time gains (asset sales, insurance proceeds, PPP forgiveness) that inflated a single year's numbers.",
        "It's common for a QoE process to move a seller's claimed EBITDA or SDE down from the number they walked in with — not because anything was misrepresented, but because a rigorous outside review applies a stricter standard than most owners' internal bookkeeping does.",
      ],
    },
    {
      heading: "How to prepare before a buyer orders one",
      paragraphs: [
        "The strongest preparation is running a version of this exercise on yourself before a process starts: documenting every add-back with dated support, separating one-time from recurring items in your own reporting, and reconciling any gap between book financials and tax returns well ahead of time.",
        "Sellers who show up with a clean, defensible earnings bridge tend to hold their number through diligence. Sellers who haven't done this work often see it happen for the first time during the buyer's QoE — at the point in the process with the least leverage to push back.",
      ],
    },
  ],
  relatedSlugs: ["add-backs", "due-diligence"],
  siteLinks: [{ href: "/methodology", label: "See how OwnerGauge treats add-backs and normalized earnings" }],
};
