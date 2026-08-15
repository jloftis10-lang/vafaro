import type { IndustryGuide } from "@/content/industries/types";

export const professionalServicesGuide: IndustryGuide = {
  slug: "professional-services",
  industryId: "accounting-firms",
  name: "Professional Services (Consulting, Accounting & Legal)",
  metaDescription:
    "How consulting, accounting, and legal firms are valued, why owner dependency matters so much, and how to prepare for a sale.",
  intro:
    "Professional services businesses are built almost entirely around people — which makes them some of the most rewarding businesses to run, and often the hardest to sell without deliberate preparation. What's being acquired is largely client relationships, not physical assets.",
  valuationParagraphs: [
    "Professional services firms are typically valued on adjusted EBITDA or SDE depending on size, but the multiple is unusually sensitive to one factor above most others: how concentrated client relationships are with the owner versus the broader team.",
    "Recurring, retainer-based revenue is valued meaningfully higher than project or hourly billing, since it signals the relationship — and the earnings behind it — are more likely to survive a change in ownership.",
  ],
  influenceFactors: [
    "Retainer or recurring engagement revenue versus one-off project work",
    "Client relationship ownership — who actually holds the day-to-day relationship",
    "Fee structure: hourly, value-based, or retainer",
    "Utilization and staff-to-partner leverage ratios",
    "Referral source diversity versus dependence on a small number of referral partners",
    "Niche specialization versus generalist positioning",
  ],
  buyerConsiderations: [
    "Whether clients would follow the owner if they left, or whether relationships are institutionalized across the team",
    "Non-compete and non-solicit agreements in place with staff",
    "Whether new business development is systematized or entirely owner-driven",
    "Employee tenure and bench depth below the owner",
  ],
  transactionRisks: [
    "Extreme key-person dependency — often the single largest risk factor in a professional services transaction",
    "Client concentration, particularly common in consulting and legal practices",
    "Informal engagement terms without written contracts",
    "Regulatory or licensing considerations specific to the practice area",
  ],
  preparationTips: [
    "Begin transitioning key client relationships to other team members well before starting a sale process",
    "Formalize engagement letters and retainer agreements",
    "Build a documented business development process that isn't solely dependent on the owner's personal network",
    "Track recurring versus project revenue separately to demonstrate revenue quality",
  ],
};
