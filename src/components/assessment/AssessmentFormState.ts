import type { MetricType } from "@/lib/types";
import type {
  AddBackDocumentation,
  AssessmentAnswers,
  BacklogMonths,
  CapexOutlook,
  ContractedBacklogMonths,
  CustomerProtection,
  CustomerRelationshipOwnership,
  EndMarketConcentration,
  ExpenseSeparation,
  FinancialHistoryYears,
  FinancialStatementQuality,
  LargestCustomerPct,
  LargestSupplierPct,
  LicenseHolderBeyondOwner,
  LicensedStaffBeyondOwner,
  MaintenanceAgreementRevenuePct,
  ManagementDepth,
  OwnerAbsenceImpact,
  OwnerHoursPerWeek,
  OwnerProducedRevenuePct,
  ProcessDocumentation,
  ProfitabilityTrend,
  RecordsCurrency,
  RecurringComplianceRevenuePct,
  RecurringRevenuePct,
  ReorderRevenuePct,
  RevenueGrowth,
  SaleTimeline,
  ServiceVsInstallMix,
  StaffCpaDepth,
  SuccessorReadiness,
  TerritoryProtection,
  TransactionPriority,
} from "@/lib/assessment/types";

/**
 * Mirrors AssessmentAnswers but keeps numeric fields as controlled-input
 * strings and every field optional until validated at each step boundary.
 */
export interface AssessmentFormState {
  industryId: string;
  revenue: string;
  metricType: MetricType;
  metricValue: string;
  yearsInBusiness: string;

  revenueGrowth: RevenueGrowth | undefined;
  profitabilityTrend: ProfitabilityTrend | undefined;
  recurringRevenuePct: RecurringRevenuePct | undefined;
  largestCustomerPct: LargestCustomerPct | undefined;
  top5CustomersPct: string;
  largestCustomerProtection: CustomerProtection | undefined;

  ownerHoursPerWeek: OwnerHoursPerWeek | undefined;
  ownerAbsenceImpact: OwnerAbsenceImpact | undefined;
  customerRelationshipOwnership: CustomerRelationshipOwnership | undefined;
  managementDepth: ManagementDepth | undefined;
  processDocumentation: ProcessDocumentation | undefined;
  successorReadiness: SuccessorReadiness | undefined;

  financialStatementQuality: FinancialStatementQuality | undefined;
  recordsCurrency: RecordsCurrency | undefined;
  financialHistoryYears: FinancialHistoryYears | undefined;
  addBackDocumentation: AddBackDocumentation | undefined;
  expenseSeparation: ExpenseSeparation | undefined;

  saleTimeline: SaleTimeline | undefined;
  transactionPriorities: TransactionPriority[];

  backlogMonths: BacklogMonths | undefined;
  endMarketConcentration: EndMarketConcentration | undefined;
  capexOutlook: CapexOutlook | undefined;
  largestSupplierPct: LargestSupplierPct | undefined;
  territoryProtection: TerritoryProtection | undefined;
  reorderRevenuePct: ReorderRevenuePct | undefined;
  contractedBacklogMonths: ContractedBacklogMonths | undefined;
  licensedStaffBeyondOwner: LicensedStaffBeyondOwner | undefined;
  serviceVsInstallMix: ServiceVsInstallMix | undefined;
  maintenanceAgreementRevenuePct: MaintenanceAgreementRevenuePct | undefined;
  licenseHolderBeyondOwner: LicenseHolderBeyondOwner | undefined;
  recurringComplianceRevenuePct: RecurringComplianceRevenuePct | undefined;
  ownerProducedRevenuePct: OwnerProducedRevenuePct | undefined;
  staffCpaDepth: StaffCpaDepth | undefined;
}

export const INITIAL_ASSESSMENT_STATE: AssessmentFormState = {
  industryId: "",
  revenue: "",
  metricType: "sde",
  metricValue: "",
  yearsInBusiness: "",

  revenueGrowth: undefined,
  profitabilityTrend: undefined,
  recurringRevenuePct: undefined,
  largestCustomerPct: undefined,
  top5CustomersPct: "",
  largestCustomerProtection: undefined,

  ownerHoursPerWeek: undefined,
  ownerAbsenceImpact: undefined,
  customerRelationshipOwnership: undefined,
  managementDepth: undefined,
  processDocumentation: undefined,
  successorReadiness: undefined,

  financialStatementQuality: undefined,
  recordsCurrency: undefined,
  financialHistoryYears: undefined,
  addBackDocumentation: undefined,
  expenseSeparation: undefined,

  saleTimeline: undefined,
  transactionPriorities: [],

  backlogMonths: undefined,
  endMarketConcentration: undefined,
  capexOutlook: undefined,
  largestSupplierPct: undefined,
  territoryProtection: undefined,
  reorderRevenuePct: undefined,
  contractedBacklogMonths: undefined,
  licensedStaffBeyondOwner: undefined,
  serviceVsInstallMix: undefined,
  maintenanceAgreementRevenuePct: undefined,
  licenseHolderBeyondOwner: undefined,
  recurringComplianceRevenuePct: undefined,
  ownerProducedRevenuePct: undefined,
  staffCpaDepth: undefined,
};

/** Converts validated form state into the typed AssessmentAnswers the scoring engines consume. */
export function toAssessmentAnswers(form: AssessmentFormState): AssessmentAnswers {
  return {
    industryId: form.industryId,
    revenue: Number(form.revenue),
    metricType: form.metricType,
    metricValue: Number(form.metricValue),
    yearsInBusiness: form.yearsInBusiness ? Number(form.yearsInBusiness) : undefined,

    revenueGrowth: form.revenueGrowth!,
    profitabilityTrend: form.profitabilityTrend!,
    recurringRevenuePct: form.recurringRevenuePct!,
    largestCustomerPct: form.largestCustomerPct!,
    top5CustomersPct: form.top5CustomersPct ? Number(form.top5CustomersPct) : undefined,
    largestCustomerProtection: form.largestCustomerProtection,

    ownerHoursPerWeek: form.ownerHoursPerWeek!,
    ownerAbsenceImpact: form.ownerAbsenceImpact!,
    customerRelationshipOwnership: form.customerRelationshipOwnership!,
    managementDepth: form.managementDepth!,
    processDocumentation: form.processDocumentation!,
    successorReadiness: form.successorReadiness,

    financialStatementQuality: form.financialStatementQuality!,
    recordsCurrency: form.recordsCurrency!,
    financialHistoryYears: form.financialHistoryYears!,
    addBackDocumentation: form.addBackDocumentation!,
    expenseSeparation: form.expenseSeparation!,

    saleTimeline: form.saleTimeline!,
    transactionPriorities: form.transactionPriorities,

    backlogMonths: form.backlogMonths,
    endMarketConcentration: form.endMarketConcentration,
    capexOutlook: form.capexOutlook,
    largestSupplierPct: form.largestSupplierPct,
    territoryProtection: form.territoryProtection,
    reorderRevenuePct: form.reorderRevenuePct,
    contractedBacklogMonths: form.contractedBacklogMonths,
    licensedStaffBeyondOwner: form.licensedStaffBeyondOwner,
    serviceVsInstallMix: form.serviceVsInstallMix,
    maintenanceAgreementRevenuePct: form.maintenanceAgreementRevenuePct,
    licenseHolderBeyondOwner: form.licenseHolderBeyondOwner,
    recurringComplianceRevenuePct: form.recurringComplianceRevenuePct,
    ownerProducedRevenuePct: form.ownerProducedRevenuePct,
    staffCpaDepth: form.staffCpaDepth,
  };
}
