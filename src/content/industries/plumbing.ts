import type { IndustryGuide } from "@/content/industries/types";

export const plumbingGuide: IndustryGuide = {
  slug: "plumbing",
  industryId: "plumbing",
  name: "Plumbing Services",
  metaDescription: "Learn how plumbing companies are evaluated, what buyers diligence, and how to prepare a plumbing business for a sale.",
  intro: "A plumbing company's value rests on the same distinction as HVAC: how much of the work is recurring service and repair captured through dispatch, membership, or inspection cycles, versus one-off emergency calls and remodel/repipe projects that depend on the owner's estimating and referral relationships. Buyers also weigh how tightly the business depends on a small number of master-licensed plumbers.",
  valuationParagraphs: [
    "Smaller, owner-operated plumbing companies are commonly assessed on SDE, while businesses with branch or service-line management are more naturally evaluated on normalized EBITDA. A buyer will separate service and repair calls, drain and sewer work, water heater replacement, and remodel/repipe or new-construction revenue, since each carries a different margin and demand profile.",
    "OwnerGauge applies a reviewed plumbing-specific multiple range to the assessment, informed by public 2025-2026 benchmark data — plumbing tracks closely with HVAC and other residential trades given similar owner-operator economics, licensing constraints, and consolidator interest.",
  ],
  influenceFactors: ["Service and repair mix versus remodel, repipe, and new-construction work", "Membership or maintenance-plan penetration and renewal", "Master plumber license coverage beyond the owner", "Dispatch efficiency, technician productivity, and callback rate", "Backflow testing, drain, and sewer-camera inspection attach rates"],
  revenueQuality: ["Water heater replacement and drain/sewer work recur predictably with the housing stock and age well as a revenue base.", "Remodel and repipe project revenue can be lucrative but is lumpier and more dependent on the owner's bidding and referral relationships.", "Backflow testing and other code-mandated inspection work behaves like recurring service revenue if contracts and renewal are documented."],
  ownerDependency: ["The owner frequently holds the master plumber license the business operates under, prices complex jobs personally, and carries the general contractor and property-manager relationships that feed remodel work.", "A buyer tests whether a licensed plumber besides the owner can pull permits, supervise apprentices, and sign off on inspections."],
  managementWorkforce: ["The plumber shortage makes apprentice-to-journeyman pipeline and retention a real constraint on growth, not just a staffing inconvenience.", "Buyers look for a dispatch/service manager, documented apprenticeship progression, and safety and callback records separate from the owner's personal oversight."],
  growthDrivers: ["Grow membership and maintenance-plan penetration in the existing service area", "Build out sewer-camera inspection and drain-service attach rates", "Develop a second licensed plumber who can run estimating and permits independently", "Formalize apprentice recruiting and advancement so technician supply doesn't cap growth"],
  buyerConsiderations: ["Transferability of the master plumber license and permits", "Reliance on paid search and lead-generation platforms for call volume", "Technician tenure, utilization, and callback/warranty rate", "Working-capital needs across service, remodel, and new-construction cycles"],
  transactionRisks: ["The owner is the only master-licensed plumber", "Remodel/repipe backlog concentrated in a small number of GC or property-manager relationships", "Unrecorded membership churn or informal renewal terms", "Apprentice pipeline too thin to sustain current crew count"],
  preparationTips: ["Report revenue and margin separately by service line", "Document membership cohorts, renewal rates, and backflow/inspection contracts", "Put a second licensed plumber into an operating leadership role", "Formalize GC and property-manager relationships beyond the owner's personal contacts"],
  assessmentCta: "Estimate Your Plumbing Business Value & Deal Readiness",
};
