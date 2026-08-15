import type { AssessmentAnswers, RiskFlag, RiskSeverity } from "@/lib/assessment/types";

interface RiskRule {
  id: string;
  category: RiskFlag["category"];
  severity: RiskSeverity;
  /** Short, action-oriented phrase used as the Recommendation title when this flag is ranked into the top 3. */
  actionTitle: string;
  applies: (a: AssessmentAnswers) => boolean;
  title: string;
  explanation: (a: AssessmentAnswers) => string;
  whyBuyersCare: string;
  recommendedAction: string;
}

const RISK_RULES: RiskRule[] = [
  // ---------------------------------------------------------------------
  // Critical
  // ---------------------------------------------------------------------
  {
    id: "extreme-owner-dependency",
    category: "transferability",
    severity: "critical",
    actionTitle: "Delegate your highest-leverage responsibilities",
    applies: (a) =>
      a.ownerHoursPerWeek === "over_50" &&
      (a.ownerAbsenceImpact === "significant_disruption" || a.ownerAbsenceImpact === "could_not_operate"),
    title: "Extreme Owner Dependency",
    explanation: () =>
      "You're working 50+ hours a week in the business, and your answers suggest a significant gap would open up if you stepped away.",
    whyBuyersCare:
      "A buyer needs confidence the business generates its earnings independent of any one person, especially the seller.",
    recommendedAction:
      "Begin delegating your highest-leverage responsibilities to a manager or future successor well before entering a sale process.",
  },
  {
    id: "customer-concentration-critical",
    category: "concentrationRisk",
    severity: "critical",
    actionTitle: "Reduce reliance on your largest customer",
    applies: (a) => a.largestCustomerPct === "over_50",
    title: "Severe Customer Concentration",
    explanation: (a) =>
      `Your largest customer represents more than half of revenue${
        a.largestCustomerProtection === "no_protection" ? ", with no contract or long-standing pattern protecting it" : ""
      }.`,
    whyBuyersCare:
      "Losing a customer this large would fundamentally change the business's earnings, which materially increases perceived risk and can affect both price and deal structure.",
    recommendedAction:
      "Prioritize diversifying revenue away from this customer, or formalize the relationship under a longer-term contract, before going to market.",
  },
  {
    id: "stale-and-weak-financials",
    category: "earningsQuality",
    severity: "critical",
    actionTitle: "Bring your books current and reconciled",
    applies: (a) =>
      a.recordsCurrency === "more_than_six_months_behind" &&
      (a.financialStatementQuality === "needs_cleanup" || a.addBackDocumentation === "poorly_documented"),
    title: "Financials Are Stale and Underdocumented",
    explanation: () =>
      "Your records are more than six months behind, and either your books need cleanup or your discretionary adjustments aren't well documented.",
    whyBuyersCare:
      "Buyers and their lenders build their offer around your financials. Stale or unreliable numbers slow diligence, invite lower offers, and can stall a deal entirely.",
    recommendedAction:
      "Bring your books current and engage a bookkeeper or CPA to reconcile at least the trailing 12 months before starting a process.",
  },
  {
    id: "owner-essential-to-operate",
    category: "transferability",
    severity: "critical",
    actionTitle: "Train someone to run day-to-day operations",
    applies: (a) => a.ownerAbsenceImpact === "could_not_operate",
    title: "Business Cannot Operate Without the Owner",
    explanation: () =>
      "You indicated the business could not operate effectively if you were unreachable for 90 days.",
    whyBuyersCare:
      "This is one of the clearest signals of key-person risk a buyer will look for, and it directly affects both valuation and deal structure — for example, requiring a longer transition period.",
    recommendedAction:
      "Identify and begin training a person who could run day-to-day operations in your absence. This is likely the single highest-leverage step available to you.",
  },
  {
    id: "no-usable-financial-history",
    category: "earningsQuality",
    severity: "critical",
    actionTitle: "Keep building your financial track record",
    applies: (a) => a.financialHistoryYears === "less_than_one_year",
    title: "Limited Financial Track Record",
    explanation: () => "You have less than one complete year of financial history readily available.",
    whyBuyersCare:
      "Most buyers and lenders expect at least two to three years of financials to evaluate trends and underwrite a transaction.",
    recommendedAction:
      "Continue operating and documenting financials consistently. This resolves with time, but isn't something a sale process can shortcut.",
  },

  // ---------------------------------------------------------------------
  // Important
  // ---------------------------------------------------------------------
  {
    id: "customer-concentration-important",
    category: "concentrationRisk",
    severity: "important",
    actionTitle: "Continue diversifying your customer base",
    applies: (a) => a.largestCustomerPct === "between_20_30" || a.largestCustomerPct === "between_30_50",
    title: "Meaningful Customer Concentration",
    explanation: (a) =>
      `Your largest customer represents ${a.largestCustomerPct === "between_20_30" ? "20–30%" : "30–50%"} of revenue.`,
    whyBuyersCare:
      "Buyers scrutinize concentration above roughly 20% and may adjust price or ask for revenue guarantees tied to key accounts.",
    recommendedAction:
      "Continue diversifying your customer base, and formalize this relationship under a contract if it isn't already.",
  },
  {
    id: "weak-management-depth",
    category: "transferability",
    severity: "important",
    actionTitle: "Build a layer of management below you",
    applies: (a) => a.managementDepth === "informal_supervisors" || a.managementDepth === "owner_manages_everything",
    title: "Thin Management Bench",
    explanation: () => "Day-to-day management currently runs through you, without a formal layer of managers below.",
    whyBuyersCare:
      "Buyers pay for a business that can run itself. A thin bench raises questions about what happens to performance after you leave.",
    recommendedAction:
      "Identify one or two team members to formally promote into management roles with real decision-making authority.",
  },
  {
    id: "undocumented-addbacks",
    category: "earningsQuality",
    severity: "important",
    actionTitle: "Document your discretionary add-backs",
    applies: (a) => a.addBackDocumentation === "somewhat_documented" || a.addBackDocumentation === "poorly_documented",
    title: "Add-Backs Are Not Well Documented",
    explanation: () =>
      "Your discretionary adjustments to earnings aren't clearly documented yet.",
    whyBuyersCare:
      "Undocumented add-backs are one of the first things a buyer's advisor will challenge, since they directly affect the earnings a valuation is based on.",
    recommendedAction:
      "Prepare a clear schedule of every discretionary adjustment with supporting documentation for each one.",
  },
  {
    id: "declining-trend",
    category: "revenueQuality",
    severity: "important",
    actionTitle: "Address the declining trend before going to market",
    applies: (a) => a.revenueGrowth === "declining" || a.profitabilityTrend === "declining",
    title: "Declining Financial Trend",
    explanation: (a) => {
      const parts: string[] = [];
      if (a.revenueGrowth === "declining") parts.push("revenue");
      if (a.profitabilityTrend === "declining") parts.push("profitability");
      return `Your ${parts.join(" and ")} ${parts.length > 1 ? "are" : "is"} trending down over the last three years.`;
    },
    whyBuyersCare:
      "Buyers price off of trend as much as the current number. A declining trend invites lower offers or structures that shift risk back to you (e.g. earnouts).",
    recommendedAction:
      "Where possible, stabilize the trend before going to market, or be prepared to clearly explain the cause to buyers.",
  },
  {
    id: "undocumented-processes",
    category: "transferability",
    severity: "important",
    actionTitle: "Document your critical operating processes",
    applies: (a) => a.processDocumentation === "tribal_knowledge",
    title: "Operating Knowledge Lives in People's Heads",
    explanation: () => "Critical processes are mostly tribal knowledge rather than documented procedures.",
    whyBuyersCare:
      "Undocumented processes make a transition riskier and harder to underwrite — a buyer can't easily verify what they're acquiring.",
    recommendedAction:
      "Start documenting standard operating procedures for your most critical, highest-risk functions first.",
  },
  {
    id: "no-recurring-revenue",
    category: "revenueQuality",
    severity: "important",
    actionTitle: "Build recurring or contracted revenue",
    applies: (a) => a.recurringRevenuePct === "none",
    title: "No Recurring or Contracted Revenue",
    explanation: () => "None of your revenue is recurring, contracted, or highly repeatable.",
    whyBuyersCare:
      "Every dollar of revenue has to be re-earned each period, which buyers see as inherently less predictable and typically value at a lower multiple.",
    recommendedAction:
      "Look for opportunities to convert one-off customers into contracts, subscriptions, or service agreements.",
  },
  {
    id: "owner-owns-key-relationships",
    category: "transferability",
    severity: "important",
    actionTitle: "Transfer key customer relationships to your team",
    applies: (a) => a.customerRelationshipOwnership === "primarily_owner_difficult",
    title: "Customer Relationships Are Owner-Centric",
    explanation: () =>
      "Major customer relationships run primarily through you, and your answers suggest they'd be difficult to transfer.",
    whyBuyersCare:
      "A buyer needs confidence that revenue and relationships will transfer after closing, not walk out the door with you.",
    recommendedAction:
      "Begin introducing key customers to other members of your team and gradually shifting day-to-day contact away from yourself.",
  },

  // ---------------------------------------------------------------------
  // Opportunity
  // ---------------------------------------------------------------------
  {
    id: "recurring-revenue-could-grow",
    category: "revenueQuality",
    severity: "opportunity",
    actionTitle: "Grow your recurring revenue base",
    applies: (a) => a.recurringRevenuePct === "under_30",
    title: "Recurring Revenue Could Be Higher",
    explanation: () => "Some of your revenue is recurring, but it's still under 30% of the total.",
    whyBuyersCare:
      "Buyers generally pay a premium for a higher share of predictable revenue.",
    recommendedAction:
      "Look for your best opportunities to convert repeat customers into contracts or subscriptions.",
  },
  {
    id: "flat-growth",
    category: "revenueQuality",
    severity: "opportunity",
    actionTitle: "Identify a growth lever before going to market",
    applies: (a) => a.revenueGrowth === "flat",
    title: "Flat Revenue Growth",
    explanation: () => "Revenue has been roughly flat over the last three years.",
    whyBuyersCare:
      "A clear growth story, even a modest one, supports a stronger multiple than a flat trend line.",
    recommendedAction:
      "Identify one or two concrete growth levers you could point to — new customers, pricing, or a new offering.",
  },
  {
    id: "sop-improvement",
    category: "transferability",
    severity: "opportunity",
    actionTitle: "Finish documenting your key processes",
    applies: (a) => a.processDocumentation === "some_documentation",
    title: "Process Documentation Is Partial",
    explanation: () => "Some processes are documented, but not consistently across the business.",
    whyBuyersCare:
      "Complete documentation shortens diligence and signals a business that's easier to run and transfer.",
    recommendedAction: "Extend documentation to cover the rest of your core operating processes.",
  },
  {
    id: "owner-involvement-elevated",
    category: "transferability",
    severity: "opportunity",
    actionTitle: "Keep reducing your day-to-day hours",
    applies: (a) => a.ownerHoursPerWeek === "between_20_30" || a.ownerHoursPerWeek === "between_30_50",
    title: "Owner Involvement Still Higher Than Ideal",
    explanation: () => "You're still meaningfully involved in day-to-day operations.",
    whyBuyersCare:
      "Continuing to reduce your day-to-day role further strengthens the case that the business doesn't depend on you.",
    recommendedAction: "Keep shifting operating responsibilities to your team ahead of a future process.",
  },
  {
    id: "limited-revenue-visibility",
    category: "concentrationRisk",
    severity: "opportunity",
    actionTitle: "Document your top-5 customer concentration",
    applies: (a) => a.top5CustomersPct === undefined,
    title: "Limited Customer Concentration Detail",
    explanation: () => "You didn't provide your top-5 customer concentration.",
    whyBuyersCare:
      "This detail helps set expectations early and can be an easy, credible data point to have ready for buyers.",
    recommendedAction: "When you're ready, calculate what your top 5 customers represent as a share of revenue.",
  },
  {
    id: "transferable-but-owner-centric",
    category: "transferability",
    severity: "opportunity",
    actionTitle: "Formalize your customer relationship transitions",
    applies: (a) => a.customerRelationshipOwnership === "primarily_owner_transferable",
    title: "Customer Relationships Could Be Further Delegated",
    explanation: () =>
      "Customer relationships still run mostly through you, though your answers suggest they're transferable.",
    whyBuyersCare:
      "Demonstrating relationships have already partially transferred to your team reduces perceived transition risk.",
    recommendedAction:
      "Start formally introducing your team into key relationships now, so the transition is already underway by the time you go to market.",
  },

  // ---------------------------------------------------------------------
  // Industry module (Phase E) — only ever fire for the matching industry;
  // see src/lib/assessment/industry-questions.ts for the question copy.
  // ---------------------------------------------------------------------
  {
    id: "limited-manufacturing-backlog",
    category: "revenueQuality",
    severity: "important",
    actionTitle: "Build out confirmed backlog before going to market",
    applies: (a) => a.industryId === "specialty-manufacturing" && a.backlogMonths === "less_than_1",
    title: "Limited Confirmed Backlog",
    explanation: () => "Less than a month of confirmed backlog is on the books.",
    whyBuyersCare:
      "Buyers in specialty manufacturing weight forward revenue visibility heavily — thin backlog reads as demand uncertainty, not just a snapshot in time.",
    recommendedAction: "Where possible, convert pipeline into signed orders or purchase commitments before a process starts.",
  },
  {
    id: "single-end-market-concentration",
    category: "concentrationRisk",
    severity: "important",
    actionTitle: "Diversify beyond your primary end market",
    applies: (a) => a.industryId === "specialty-manufacturing" && a.endMarketConcentration === "single_end_market",
    title: "Concentrated in a Single End Market",
    explanation: () => "Revenue is concentrated in a single end market (e.g. mostly one industry's demand cycle).",
    whyBuyersCare:
      "A downturn in one end market hits the whole business at once — buyers price this the same way they price customer concentration.",
    recommendedAction: "Look for adjacent end markets your existing capabilities could reasonably serve.",
  },
  {
    id: "heavy-supplier-concentration",
    category: "concentrationRisk",
    severity: "important",
    actionTitle: "Reduce dependence on your largest supplier",
    applies: (a) => a.industryId === "specialty-distribution" && a.largestSupplierPct === "over_60",
    title: "Heavy Supplier Concentration",
    explanation: () => "Over 60% of purchases come from a single supplier.",
    whyBuyersCare:
      "Losing that supplier relationship — or having pricing/terms change — could disrupt the business as much as losing a major customer.",
    recommendedAction: "Qualify at least one alternate supplier for your highest-volume products, even if you don't switch.",
  },
  {
    id: "limited-engineering-backlog",
    category: "revenueQuality",
    severity: "important",
    actionTitle: "Build out signed, contracted backlog",
    applies: (a) => a.industryId === "engineering-consulting" && a.contractedBacklogMonths === "less_than_3",
    title: "Limited Contracted Backlog",
    explanation: () => "Less than 3 months of signed, contracted backlog is on the books.",
    whyBuyersCare: "Buyers distinguish funded, scheduled backlog from pipeline — thin contracted backlog reads as demand uncertainty.",
    recommendedAction: "Prioritize converting active proposals into signed task orders or contracts before a process starts.",
  },
  {
    id: "sole-licensed-professional-engineering",
    category: "transferability",
    severity: "critical",
    actionTitle: "Develop a second licensed professional",
    applies: (a) => a.industryId === "engineering-consulting" && a.licensedStaffBeyondOwner === "no_owner_only",
    title: "No Licensed Staff Beyond the Owner",
    explanation: () => "You're currently the only licensed professional able to stamp or sign off on project work.",
    whyBuyersCare:
      "If the license required to deliver the work leaves with you, a buyer may question whether the business can operate under new ownership at all.",
    recommendedAction: "Support a qualified staff member toward licensure, or recruit a licensed professional into the team.",
  },
  {
    id: "no-maintenance-agreement-revenue",
    category: "revenueQuality",
    severity: "important",
    actionTitle: "Build a maintenance-agreement revenue base",
    applies: (a) => a.industryId === "hvac-mechanical" && a.maintenanceAgreementRevenuePct === "none",
    title: "No Maintenance Agreement Revenue",
    explanation: () => "None of your revenue comes from ongoing maintenance agreements.",
    whyBuyersCare:
      "Maintenance agreements are the clearest recurring-revenue signal in home services — their absence means every dollar of revenue has to be re-won.",
    recommendedAction: "Convert your best repeat customers into a formal maintenance plan, even a simple one.",
  },
  {
    id: "sole-license-holder-hvac",
    category: "transferability",
    severity: "critical",
    actionTitle: "License a second team member",
    applies: (a) => a.industryId === "hvac-mechanical" && a.licenseHolderBeyondOwner === "no",
    title: "License Exists Only With the Owner",
    explanation: () => "You're currently the only holder of the master license the business operates under.",
    whyBuyersCare:
      "If the license required to legally operate leaves with you, a buyer may need a transition period or may question the deal entirely.",
    recommendedAction: "Support a qualified technician toward licensure so the business isn't dependent on your license alone.",
  },
  {
    id: "owner-produced-revenue-concentration",
    category: "transferability",
    severity: "critical",
    actionTitle: "Shift client production toward staff and other partners",
    applies: (a) => a.industryId === "accounting-firms" && a.ownerProducedRevenuePct === "over_75",
    title: "Revenue Concentrated in Owner Production",
    explanation: () => "You personally produce over 75% of billings.",
    whyBuyersCare:
      "In a professional-services model, revenue this concentrated in one producer is effectively revenue a buyer can't be confident will transfer.",
    recommendedAction: "Begin shifting client relationships and billable work toward other partners or senior staff.",
  },
  {
    id: "sole-licensed-cpa",
    category: "transferability",
    severity: "critical",
    actionTitle: "Develop or hire a second licensed CPA/EA",
    applies: (a) => a.industryId === "accounting-firms" && a.staffCpaDepth === "owner_only_licensed",
    title: "No Licensed Staff Beyond the Owner",
    explanation: () => "You're currently the only licensed CPA/EA at the firm.",
    whyBuyersCare:
      "Signing authority and review responsibility concentrated in one person is a direct transferability risk in a licensed-professional business.",
    recommendedAction: "Support a staff member toward CPA/EA licensure, or recruit a licensed professional into the firm.",
  },
];

export function evaluateRiskFlags(answers: AssessmentAnswers): RiskFlag[] {
  return RISK_RULES.filter((rule) => rule.applies(answers)).map((rule) => ({
    id: rule.id,
    category: rule.category,
    severity: rule.severity,
    title: rule.title,
    explanation: rule.explanation(answers),
    whyBuyersCare: rule.whyBuyersCare,
    recommendedAction: rule.recommendedAction,
  }));
}

/** Internal lookup from risk id to its short, action-first recommendation title. Not part of the public RiskFlag shape. */
export const ACTION_TITLES_BY_RISK_ID: Record<string, string> = Object.fromEntries(
  RISK_RULES.map((rule) => [rule.id, rule.actionTitle]),
);
