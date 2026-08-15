import type { IndustryGuide } from "@/content/industries/types";

export const verticalSaasGuide: IndustryGuide = {
  slug: "vertical-saas",
  industryId: "vertical-saas",
  name: "Vertical SaaS / B2B Software",
  metaDescription: "Learn how vertical SaaS and B2B software businesses are valued, what buyers diligence, and how to prepare one for a sale.",
  intro: "Vertical SaaS businesses — software built for a specific industry's workflows and compliance requirements — are judged less on trailing EBITDA and more on the durability of the revenue engine beneath it: net revenue retention, gross margin, customer concentration, and how much of the product is genuinely difficult for a customer to switch away from.",
  valuationParagraphs: [
    "Smaller, founder-run vertical SaaS businesses are commonly assessed on SDE, while companies with a management team and predictable renewal base are more naturally evaluated on normalized EBITDA — but in either case, buyers look through reported earnings to ARR quality: net revenue retention, gross churn, gross margin, and how concentrated revenue is in a handful of customers.",
    "OwnerGauge applies a reviewed vertical-SaaS-specific multiple range to the assessment, informed by public 2025-2026 benchmark data — software margins and retention economics support materially higher multiples than services businesses of comparable size, provided net revenue retention and gross margin hold up under diligence.",
  ],
  influenceFactors: ["Net revenue retention and gross logo churn", "Gross margin and the cost structure behind support and hosting", "Customer concentration and contract length", "Product depth and switching costs specific to the vertical's workflow or compliance needs", "Founder involvement in product roadmap, sales, and key accounts"],
  revenueQuality: ["Net revenue retention above 100% signals the customer base is expanding, not just renewing — buyers weight this more heavily than headline ARR growth.", "Usage-based or seasonal revenue can look strong in aggregate but needs to be normalized before it's compared to a stable subscription base.", "Professional services or implementation fees bundled with subscription revenue should be broken out — they carry different margin and don't recur the same way."],
  ownerDependency: ["Founders frequently remain the primary product visionary, largest account manager, and de facto head of sales, which is a harder role to formalize than in a services business.", "A buyer tests whether the product roadmap, key accounts, and sales motion can continue without the founder in every deal."],
  managementWorkforce: ["Engineering and customer-success retention matter more than headcount — losing a small core team can stall the roadmap or erode support quality quickly.", "Buyers look for documented product architecture, on-call/incident processes, and a customer-success function that isn't just the founder fielding support tickets."],
  growthDrivers: ["Improve net revenue retention through expansion, cross-sell, and reduced churn", "Diversify the customer base to reduce concentration risk", "Document product architecture and reduce founder-only technical knowledge", "Build repeatable sales and customer-success processes beyond founder-led deals"],
  buyerConsiderations: ["Net revenue retention, gross churn, and cohort-level renewal data", "Customer concentration and contract length/assignability", "Technical debt, infrastructure costs, and data-security posture", "Founder dependency in sales, product, and key-account relationships"],
  transactionRisks: ["Reported ARR blends one-time and recurring revenue without clear separation", "A small number of customers represent an outsized share of revenue", "Net revenue retention or churn hasn't been tracked consistently enough to diligence", "Core product knowledge lives with one or two engineers, including the founder"],
  preparationTips: ["Build a clean ARR bridge showing new, expansion, contraction, and churned revenue", "Track and report net revenue retention and gross churn by cohort", "Document system architecture, security practices, and incident history", "Reduce customer and technical concentration before going to market"],
  assessmentCta: "Estimate Your Vertical SaaS Business Value & Deal Readiness",
};
