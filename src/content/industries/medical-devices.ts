import type { IndustryGuide } from "@/content/industries/types";

export const medicalDevicesGuide: IndustryGuide = {
  slug: "medical-devices",
  industryId: "medical-devices",
  name: "Medical Devices / MedTech",
  metaDescription: "Learn how medical device and MedTech companies are valued, what buyers diligence, and how to prepare one for a sale.",
  intro: "Medical device and MedTech companies are valued around their regulatory moat as much as their financials — an FDA-cleared or approved product with a defensible IP position is worth substantially more than the same underlying technology without clearance, because clearance and IP are what keep a competitor from simply copying the product.",
  valuationParagraphs: [
    "Smaller device manufacturers are typically assessed on SDE, while businesses with a quality-system and regulatory-affairs function are more naturally evaluated on normalized EBITDA. A buyer reviews FDA regulatory pathway and clearance status (510(k), De Novo, or PMA), patent and IP protection, quality-system compliance (ISO 13485/QSR) history, and customer concentration among hospital systems, distributors, or group purchasing organizations.",
    "OwnerGauge applies a reviewed medical-devices-specific multiple range to the assessment, informed by public 2025-2026 benchmark data — the category is manufacturing-adjacent but carries an IP and regulatory-moat premium over general specialty manufacturing, provided clearance status and quality-system compliance hold up under diligence.",
  ],
  influenceFactors: ["FDA regulatory pathway and clearance/approval status", "Patent and intellectual-property protection", "Quality-system compliance history (ISO 13485/QSR) and any audit findings", "Reimbursement and CPT-code coverage supporting adoption", "Customer concentration among hospital systems, distributors, or GPOs"],
  revenueQuality: ["A cleared or approved device with supporting clinical evidence carries real, durable economic value beyond the underlying technology — buyers price the regulatory moat, not just the product.", "Revenue tied to reimbursed procedures with established CPT codes is more durable than revenue dependent on off-label use or uncertain reimbursement.", "Distributor or GPO-driven revenue can bring volume but often at thinner margin and with less direct customer-relationship control than direct sales."],
  ownerDependency: ["The founder is often the person who holds the core regulatory and clinical relationships, and may be the named inventor on key patents.", "A buyer tests whether regulatory affairs, quality systems, and key clinical relationships extend beyond the founder."],
  managementWorkforce: ["Regulatory affairs and quality-system expertise is specialized and scarce, and a lapse in quality-system compliance can jeopardize clearance status itself.", "Buyers look for a documented quality-management system, regulatory-affairs leadership, and manufacturing/supply-chain redundancy beyond the founder."],
  growthDrivers: ["Expand or strengthen patent and IP protection around the core product", "Pursue additional indications or reimbursement codes to broaden addressable use", "Document quality-system compliance and resolve any audit findings", "Diversify customer concentration among hospital systems, distributors, and GPOs"],
  buyerConsiderations: ["Regulatory pathway, clearance status, and any pending submissions", "Patent protection, freedom-to-operate, and IP litigation history", "Quality-system audit history and any FDA warning letters or 483 observations", "Reimbursement coverage and customer/distributor concentration"],
  transactionRisks: ["Clearance or approval status is narrower than the sales pipeline assumes", "Patent protection is weak, expiring soon, or contested", "Open FDA warning letters, 483 observations, or unresolved quality-system findings", "Revenue is concentrated in a small number of distributors, GPOs, or hospital systems"],
  preparationTips: ["Confirm and document regulatory clearance/approval status and any pending submissions", "Review patent protection and freedom-to-operate before going to market", "Resolve any open quality-system or FDA compliance findings", "Diversify customer and distributor concentration where feasible"],
  assessmentCta: "Estimate Your Medical Device Company Value & Deal Readiness",
};
