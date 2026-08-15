import type { ResourceArticle } from "@/content/resources/types";

export const recurringRevenue: ResourceArticle = {
  slug: "recurring-revenue",
  title: "Recurring Revenue: Why Buyers Pay More for Revenue That Doesn't Have to Be Re-Earned",
  metaDescription:
    "Why recurring, contracted revenue commands a higher multiple than one-off sales, and how to actually build it into a business that doesn't have it today.",
  dek: "Every dollar of one-off revenue has to be won again next period. Every dollar under contract doesn't — and that difference is exactly what a buyer is pricing when they look at your revenue mix.",
  sections: [
    {
      heading: "Why this moves the multiple",
      paragraphs: [
        "OwnerGauge's own valuation engine treats recurring revenue as one of only four inputs that directly adjusts your multiple — the same weight class as revenue trend, owner involvement, and customer concentration. That's not arbitrary: a buyer underwriting a purchase price is really underwriting next year's earnings, and revenue that's contractually or behaviorally likely to repeat is simply a safer bet than revenue that has to be re-won from scratch.",
        "This is true even when the total revenue number is identical. A business with 60% of revenue under service agreements or subscriptions and one with the same revenue built entirely on one-off transactions are, to a buyer, different risk profiles wearing the same top-line number.",
      ],
    },
    {
      heading: "What counts as 'recurring' — and what doesn't",
      paragraphs: [
        "Written contracts, subscriptions, and service agreements with defined renewal terms are the clearest form. A pattern of repeat customers without any contract is weaker — real, but harder for a buyer to underwrite, since nothing obligates that customer to come back.",
        "The most common mistake owners make here is treating \"customers who happen to keep coming back\" as equivalent to recurring revenue in a diligence conversation. A buyer's team will ask for the actual mechanism — the contract, the renewal rate, the churn history — not just the pattern.",
      ],
    },
    {
      heading: "How to actually build it",
      paragraphs: [
        "Look first at your best, most loyal customers — they're the easiest to convert from one-off purchases into a formal agreement, subscription, or maintenance contract, since the relationship already exists.",
        "Track renewal and churn from the start once you have anything under contract; a buyer will ask for this history, and \"we just started doing this\" is a weaker answer the longer you wait to begin measuring it. This is a multi-quarter or multi-year project, not something that can be assembled in the months before a sale.",
      ],
    },
  ],
  relatedSlugs: ["owner-dependency", "customer-concentration"],
  siteLinks: [
    { href: "/calculator", label: "See how recurring revenue moves your own estimate" },
    { href: "/resources/ebitda-multiple", label: "See how this fits into the broader multiple picture" },
  ],
};
