import type { ResourceArticle } from "@/content/resources/types";

export const growthAndMarketPosition: ResourceArticle = {
  slug: "growth-and-market-position",
  title: "Growth & Market Position: Why Flat Isn't Neutral to a Buyer",
  metaDescription:
    "Why even modest revenue growth supports a stronger multiple than a flat trend line, and what actually moves the needle before going to market.",
  dek: "Buyers aren't just pricing where a business is today — they're pricing the trajectory it's on. Flat revenue reads as a business that has plateaued, even if it's healthy and profitable.",
  sections: [
    {
      heading: "Why a flat trend line is a real, not cosmetic, issue",
      paragraphs: [
        "Revenue trend is one of the four inputs OwnerGauge's own valuation engine directly adjusts the multiple for — a growing business gets a premium, a declining one gets discounted, and flat is treated as neutral rather than negative in the math. But neutral in the multiple math isn't the same as neutral in a buyer's mind: in a competitive process, a flat trend line raises the question of why growth has stalled and whether that's likely to continue under new ownership.",
        "A modest, credible growth story — even in the high single digits — tends to generate more buyer interest and a more competitive process than an otherwise identical business with three flat years, because it signals the business has more than one gear.",
      ],
    },
    {
      heading: "What buyers actually look for in a growth story",
      paragraphs: [
        "Specificity matters more than the headline growth rate. A buyer is more persuaded by \"we added a second location and it's ramping\" or \"we launched a new service line 18 months ago and it's now 15% of revenue\" than by an unexplained percentage on a chart.",
        "Buyers also distinguish organic growth from growth bought with heavy discounting, one-time contracts, or unsustainable customer acquisition spend — a growth number that isn't durable can read as a red flag rather than a strength once diligence digs into how it was achieved.",
      ],
    },
    {
      heading: "What actually moves this before a sale",
      paragraphs: [
        "Identify one or two concrete, executable levers — new customer segments, a pricing adjustment, a new offering, expanded geography — rather than trying to reignite growth everywhere at once. A buyer responds better to a credible, narrow growth thesis than a vague claim of upside.",
        "If a real growth initiative is already underway, document it with real numbers as early as possible — a growth story a buyer can verify in your own reporting is worth far more than one that only exists in conversation during a sale process.",
      ],
    },
  ],
  relatedSlugs: ["recurring-revenue", "management-depth"],
  siteLinks: [
    { href: "/calculator", label: "See how revenue trend moves your own estimate" },
    { href: "/methodology", label: "See how OwnerGauge weighs trend in the valuation" },
  ],
};
