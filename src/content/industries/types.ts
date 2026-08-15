export interface IndustryGuide {
  /** Pillar URL slug. Child topics can later live beneath this route. */
  slug: string;
  /** Maps content to taxonomy only; valuation assumptions remain separate. */
  industryId: string;
  name: string;
  metaDescription: string;
  intro: string;
  valuationParagraphs: string[];
  influenceFactors: string[];
  buyerConsiderations: string[];
  transactionRisks: string[];
  preparationTips: string[];
  revenueQuality?: string[];
  ownerDependency?: string[];
  managementWorkforce?: string[];
  growthDrivers?: string[];
  assessmentCta?: string;
}
