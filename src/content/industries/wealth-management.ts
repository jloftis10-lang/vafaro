import type { IndustryGuide } from "@/content/industries/types";

export const wealthManagementGuide: IndustryGuide = {
  slug: "wealth-management",
  industryId: "wealth-management",
  name: "Wealth Management / RIAs",
  metaDescription: "Learn how RIAs and wealth management firms are valued, what buyers diligence, and how to prepare one for a sale.",
  intro: "RIA and wealth-management firm value is driven overwhelmingly by the quality of the fee revenue: what share is recurring AUM-based fees versus commissions or one-time planning fees, what the organic growth rate looks like independent of market appreciation, and how ownership and client relationships are structured for succession.",
  valuationParagraphs: [
    "Smaller, founder-led RIAs are typically assessed on SDE, while firms with an advisor team and institutionalized client-service model are more naturally evaluated on normalized EBITDA. A buyer reviews the share of revenue that is recurring AUM-based fees versus commission or transactional revenue, organic growth rate net of market performance, EBITDA margin, and client concentration by household and by advisor.",
    "OwnerGauge applies a reviewed wealth-management-specific multiple range to the assessment, informed by public 2025-2026 benchmark data — firms with a high share of recurring, fee-based AUM revenue and demonstrated organic growth trade at a real premium over practices still weighted toward commission or transactional revenue.",
  ],
  influenceFactors: ["Recurring AUM-based fee revenue as a share of total revenue", "Organic growth rate (net new assets) independent of market appreciation", "EBITDA margin and operating efficiency", "Client concentration by household and by individual advisor", "Advisor succession structure and equity/ownership transferability"],
  revenueQuality: ["A high share of recurring, fee-based AUM revenue is the clearest signal of quality in this category — buyers weight it well above commission or transactional revenue at similar total revenue.", "Organic growth driven by net new client assets, not just market appreciation, demonstrates the practice can grow independent of market cycles.", "Revenue concentrated in a small number of large households or a single advisor's book is discounted relative to a broadly distributed client base."],
  ownerDependency: ["The founder is often the advisor of record for the largest and longest-tenured client relationships.", "A buyer tests whether other advisors on the team hold direct client relationships and can retain assets independent of the founder, and how succession and equity are structured."],
  managementWorkforce: ["Advisor retention and succession planning are central to this category, since client assets are legally and practically tied to the advisor of record, not just the firm.", "Buyers look for documented client-service teams, a compliance function, and advisor equity or succession arrangements that reduce single-point dependency."],
  growthDrivers: ["Grow net new assets and organic growth rate independent of market performance", "Increase the share of revenue that is recurring, fee-based AUM revenue", "Formalize advisor succession and equity-ownership structures", "Diversify client concentration by household and by advisor"],
  buyerConsiderations: ["Recurring fee-based revenue share and organic growth trend", "Client concentration by household and by advisor", "Compliance and regulatory record (SEC or state examination history)", "Custodian relationships and technology/platform infrastructure"],
  transactionRisks: ["Client assets are concentrated with a single advisor whose departure could trigger asset flight", "Organic growth is flat or negative once market appreciation is excluded", "Regulatory examination findings are unresolved", "Advisor succession or equity structure is undefined, complicating retention post-close"],
  preparationTips: ["Document recurring fee-based revenue share and organic growth net of market performance", "Diversify client concentration by household and by advisor", "Formalize advisor succession and equity-ownership arrangements", "Resolve any open regulatory examination findings before diligence"],
  assessmentCta: "Estimate Your Wealth Management Firm Value & Deal Readiness",
};
