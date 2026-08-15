import type { IndustryGuide } from "@/content/industries/types";

export const healthcareDentalGuide: IndustryGuide = {
  slug: "healthcare-dental",
  industryId: "dental-services",
  name: "Healthcare & Dental Practices",
  metaDescription:
    "How healthcare and dental practices are valued, what drives buyer confidence, and how to prepare a practice for a sale.",
  intro:
    "Healthcare and dental practices operate under a different set of dynamics than most small businesses. Regulatory structure, payer mix, and clinical staffing all play an outsized role in both valuation and how a transaction ends up structured.",
  valuationParagraphs: [
    "Practices are typically valued on adjusted EBITDA once they reach meaningful scale, with SDE more common for solo-provider practices. Payer mix, production per provider, and whether the practice can operate with associate providers rather than depending solely on the owner-practitioner all weigh heavily on the multiple.",
    "A practice that can demonstrate consistent production across multiple providers is viewed very differently than one where essentially all patient revenue runs through the owner personally.",
  ],
  influenceFactors: [
    "Payer mix and reimbursement rates",
    "Number of active providers versus dependence on the owner-practitioner",
    "Patient panel size and new patient acquisition trends",
    "Facility and equipment condition, including recent capital investment",
    "Ancillary revenue streams, such as in-house lab or specialty services",
    "Compliance history — billing, HIPAA, and licensing",
  ],
  buyerConsiderations: [
    "Whether the practice can retain patients through a change in ownership",
    "Associate provider retention and production levels",
    "Billing and collections processes, including denial rates",
    "Lease terms and how transferable the facility is",
  ],
  transactionRisks: [
    "A practice built almost entirely around a single provider's patient relationships",
    "Aging facility or equipment requiring near-term capital investment",
    "Compliance gaps in billing or clinical documentation",
    "Unfavorable or short-term facility lease terms",
  ],
  preparationTips: [
    "Build out associate provider capacity so the practice isn't solely dependent on the owner seeing patients",
    "Get a compliance review done ahead of a process, not discovered during diligence",
    "Document standard operating procedures for clinical and administrative staff",
    "Understand your payer mix in detail and be able to speak to trends in it",
  ],
};
