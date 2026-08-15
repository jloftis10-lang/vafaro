import type { IndustryGuide } from "@/content/industries/types";

export const wasteRecyclingGuide: IndustryGuide = {
  slug: "waste-recycling",
  industryId: "waste-recycling",
  name: "Waste & Recycling",
  metaDescription: "Learn how waste and recycling companies are valued, what buyers diligence, and how to prepare one for a sale.",
  intro: "Waste and recycling companies are valued heavily on route density and disposal access — whether the business owns or controls a landfill or transfer station, or is paying a competitor's tipping fee on every load. Two haulers with identical revenue can carry very different values depending on those two factors alone.",
  valuationParagraphs: [
    "Owner-operated haulers are typically assessed on SDE, while multi-route or multi-facility operators are more naturally evaluated on normalized EBITDA. A buyer evaluates route density and stop efficiency, contracted commercial and municipal revenue with price-escalation terms, and whether the company owns disposal capacity or depends on third-party tipping.",
    "OwnerGauge applies a reviewed waste-and-recycling-specific multiple range to the assessment, informed by public 2025-2026 benchmark data — route density and recurring commercial or municipal contracts have made this a historically premium-multiple category, particularly where the company controls its own disposal assets.",
  ],
  influenceFactors: ["Route density and stop efficiency by territory", "Contracted commercial and municipal revenue with escalation terms", "Ownership of or access to disposal assets (transfer stations, landfills, MRFs)", "Recycling commodity-price exposure on material revenue", "Fleet age and equipment replacement schedule"],
  revenueQuality: ["Contracted commercial and municipal accounts with CPI or fuel escalators hold value far better than uncontracted, price-only relationships.", "Recycling commodity revenue is inherently volatile and should be modeled separately from contracted hauling revenue.", "Owning disposal capacity converts a variable cost (third-party tipping fees) into a margin advantage that buyers price at a real premium."],
  ownerDependency: ["The owner often personally manages route bidding, municipal contract relationships, and disposal-site relationships.", "A buyer tests whether route planning, contract renewal, and disposal relationships can run without the owner's daily involvement."],
  managementWorkforce: ["Driver recruiting and retention, like transportation broadly, constrains growth, and route efficiency depends heavily on dispatcher and driver tenure.", "Buyers look for a documented route-optimization process, fleet-maintenance program, and operations leadership beyond the owner."],
  growthDrivers: ["Increase route density in existing territories before expanding geographically", "Add or secure disposal capacity to reduce third-party tipping-fee exposure", "Formalize escalation clauses across commercial and municipal contracts", "Build dispatcher and driver retention programs to protect route efficiency"],
  buyerConsiderations: ["Route density and stop efficiency relative to competitors", "Disposal access — owned versus third-party tipping arrangements", "Contract terms and escalation coverage across the commercial/municipal book", "Fleet condition and near-term capital-replacement needs"],
  transactionRisks: ["Routes are sparse or overlap with competitor territory, limiting density economics", "The company depends entirely on third-party disposal at market-rate tipping fees", "Contracts lack escalation clauses against rising fuel and labor costs", "Deferred fleet replacement creates a near-term capex bill"],
  preparationTips: ["Document route density, stop efficiency, and territory maps", "Report contracted versus commodity-exposed revenue separately", "Reconcile fleet maintenance and replacement schedules", "Review contracts for escalation clauses and renewal terms"],
  assessmentCta: "Estimate Your Waste & Recycling Business Value & Deal Readiness",
};
