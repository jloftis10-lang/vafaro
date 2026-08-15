import { addBacks } from "@/content/resources/add-backs";
import { assetSaleVsStockSale } from "@/content/resources/asset-sale-vs-stock-sale";
import { choosingAnMaAdvisor } from "@/content/resources/choosing-an-ma-advisor";
import { customerConcentration } from "@/content/resources/customer-concentration";
import { dueDiligence } from "@/content/resources/due-diligence";
import { earnouts } from "@/content/resources/earnouts";
import { ebitdaMultiple } from "@/content/resources/ebitda-multiple";
import { enterpriseValueVsProceeds } from "@/content/resources/enterprise-value-vs-proceeds";
import { growthAndMarketPosition } from "@/content/resources/growth-and-market-position";
import { letterOfIntent } from "@/content/resources/letter-of-intent";
import { managementDepth } from "@/content/resources/management-depth";
import { ownerDependency } from "@/content/resources/owner-dependency";
import { qualityOfEarnings } from "@/content/resources/quality-of-earnings";
import { recurringRevenue } from "@/content/resources/recurring-revenue";
import { sdeVsEbitda } from "@/content/resources/sde-vs-ebitda";
import { workingCapitalAdjustments } from "@/content/resources/working-capital-adjustments";
import type { ResourceArticle } from "@/content/resources/types";

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  enterpriseValueVsProceeds,
  ebitdaMultiple,
  sdeVsEbitda,
  addBacks,
  qualityOfEarnings,
  ownerDependency,
  customerConcentration,
  managementDepth,
  recurringRevenue,
  growthAndMarketPosition,
  letterOfIntent,
  assetSaleVsStockSale,
  earnouts,
  workingCapitalAdjustments,
  dueDiligence,
  choosingAnMaAdvisor,
];

export function getResourceArticleBySlug(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((article) => article.slug === slug);
}
