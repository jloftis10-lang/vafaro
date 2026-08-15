import type { ResourceArticle } from "@/content/resources/types";

export const choosingAnMaAdvisor: ResourceArticle = {
  slug: "choosing-an-ma-advisor",
  title: "M&A Advisor, Business Broker, or Investment Bank: Who Actually Sells Your Business?",
  metaDescription:
    "The real differences between business brokers, M&A advisors, and investment banks, how they're paid, and how to match the right one to your deal size.",
  dek: "These three titles get used almost interchangeably, but they typically serve different deal sizes, run different processes, and get paid differently — picking the wrong one for your size of business is a common, costly mistake.",
  sections: [
    {
      heading: "Where each one typically operates",
      paragraphs: [
        "Business brokers most commonly handle Main Street transactions — generally businesses valued under a few million dollars — using a fairly standardized listing-and-marketing process similar to real estate, often representing both buyers and sellers across many simultaneous listings. M&A advisors (also called M&A intermediaries or, at scale, boutique investment banks) typically work the lower middle market and middle market, running a more customized, confidential process built around a specific business rather than a listing.",
        "Investment banks, in the traditional sense, generally focus on larger transactions where the process involves institutional buyers, more complex financing, and dedicated deal teams. The lines blur in practice — many firms use \"M&A advisor\" and \"investment bank\" interchangeably at the lower end of the middle market — but the deal size a firm is built around says more about fit than its title does.",
      ],
    },
    {
      heading: "How they're paid, and why it matters",
      paragraphs: [
        "Business brokers commonly charge a percentage commission (often 10%+ at smaller deal sizes) similar to a real estate transaction. M&A advisors typically charge a smaller success-fee percentage on larger transactions, sometimes alongside a retainer, reflecting a more involved, longer process — competitive buyer outreach, financial packaging, negotiation support, and diligence management rather than a listing.",
        "The fee structure is worth understanding upfront: a pure success fee aligns the advisor's incentive with actually closing a deal at the best terms, while retainers can fund work that happens regardless of outcome. Neither is inherently wrong, but a seller should know which they're agreeing to and why.",
      ],
    },
    {
      heading: "What actually determines the right fit",
      paragraphs: [
        "The best match usually comes down to three things: whether the advisor has closed deals in your size range and industry recently, whether they run a competitive process (multiple qualified buyers) rather than shopping to a single contact, and whether they'll be personally involved in your deal rather than handing it to a junior team once engaged.",
        "It's reasonable to ask any advisor for recent, comparable closed transactions before engaging — deal size, industry, and how the process actually went are far more informative than a firm's general marketing.",
      ],
    },
  ],
  relatedSlugs: ["due-diligence", "letter-of-intent"],
  siteLinks: [{ href: "/about", label: "Learn who's behind OwnerGauge" }],
};
