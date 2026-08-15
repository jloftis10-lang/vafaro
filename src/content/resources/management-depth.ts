import type { ResourceArticle } from "@/content/resources/types";

export const managementDepth: ResourceArticle = {
  slug: "management-depth",
  title: "Management Depth: What Buyers Mean by a 'Real' Management Team",
  metaDescription:
    "The difference between having employees and having management depth, why buyers pay for it, and how to build it before a sale.",
  dek: "Having good employees and having management depth are not the same thing — buyers are paying for the second one, and it's usually the harder one to build.",
  sections: [
    {
      heading: "What 'management depth' actually means to a buyer",
      paragraphs: [
        "A business can have loyal, capable employees and still have almost no management depth, if every meaningful decision — pricing, hiring, a difficult customer issue, how to handle a vendor problem — ultimately routes back to the owner. Management depth means real decision-making authority sits with people other than the owner, and has actually been tested under pressure, not just delegated in name.",
        "Buyers read this as a direct proxy for how much the business's performance depends on one irreplaceable person versus a team and a set of processes that would survive that person's departure.",
      ],
    },
    {
      heading: "Informal supervisors vs. a real management layer",
      paragraphs: [
        "There's a meaningful gap between having \"informal supervisors\" — trusted employees who handle day-to-day tasks but escalate anything consequential to the owner — and having managers with genuine authority over budget, hiring, and operating decisions within their area.",
        "The businesses that score best here typically have documented reporting structures, managers who've been in role long enough to have handled real problems independently, and compensation or incentive structures that reward management performance specifically, not just tenure.",
      ],
    },
    {
      heading: "Building it without disrupting the business",
      paragraphs: [
        "Start with the highest-leverage single point of failure — usually whichever function would cause the most disruption if the owner disappeared tomorrow — rather than trying to build depth everywhere at once.",
        "Promote from within where you have someone credible, give them real authority (not just a new title), and let them make mistakes on smaller decisions before they're tested on bigger ones. This takes real time to become credible to a buyer — a management layer announced three months before going to market reads very differently in diligence than one that's been operating for two years.",
      ],
    },
  ],
  relatedSlugs: ["owner-dependency", "add-backs"],
  siteLinks: [
    { href: "/calculator", label: "See how this factors into your own Deal Readiness score" },
    { href: "/resources/quality-of-earnings", label: "See how a thin management bench shows up in diligence" },
  ],
};
