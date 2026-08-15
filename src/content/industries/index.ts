import { healthcareDentalGuide } from "@/content/industries/healthcare-dental";
import { homeServicesGuide } from "@/content/industries/home-services";
import { professionalServicesGuide } from "@/content/industries/professional-services";
import type { IndustryGuide } from "@/content/industries/types";
import { hvacGuide } from "@/content/industries/hvac";
import { accountingFirmsGuide } from "@/content/industries/accounting-firms";
import { managedItServicesGuide } from "@/content/industries/managed-it-services";
import { fireLifeSafetyGuide } from "@/content/industries/fire-life-safety";
import { insuranceBrokeragesGuide } from "@/content/industries/insurance-brokerages";
import { restorationRemediationGuide } from "@/content/industries/restoration-remediation";
import { plumbingGuide } from "@/content/industries/plumbing";
import { commercialLandscapingGuide } from "@/content/industries/commercial-landscaping";
import { commercialFacilityServicesGuide } from "@/content/industries/commercial-facility-services";
import { securityMonitoringGuide } from "@/content/industries/security-monitoring";
import { cybersecurityServicesGuide } from "@/content/industries/cybersecurity-services";
import { verticalSaasGuide } from "@/content/industries/vertical-saas";
import { specialtyManufacturingGuide } from "@/content/industries/specialty-manufacturing";
import { industrialEnvironmentalServicesGuide } from "@/content/industries/industrial-environmental-services";
import { testingInspectionCertificationGuide } from "@/content/industries/testing-inspection-certification";
import { specialtyDistributionGuide } from "@/content/industries/specialty-distribution";
import { transportationLogisticsGuide } from "@/content/industries/transportation-logistics";
import { aerospaceDefenseGovernmentGuide } from "@/content/industries/aerospace-defense-government";
import { wasteRecyclingGuide } from "@/content/industries/waste-recycling";
import { waterWastewaterGuide } from "@/content/industries/water-wastewater";
import { energyInfrastructureServicesGuide } from "@/content/industries/energy-infrastructure-services";
import { engineeringConsultingGuide } from "@/content/industries/engineering-consulting";
import { staffingWorkforceGuide } from "@/content/industries/staffing-workforce";
import { veterinaryServicesGuide } from "@/content/industries/veterinary-services";
import { behavioralHealthGuide } from "@/content/industries/behavioral-health";
import { physicianPracticesGuide } from "@/content/industries/physician-practices";
import { medicalDevicesGuide } from "@/content/industries/medical-devices";
import { wealthManagementGuide } from "@/content/industries/wealth-management";

export const INDUSTRY_GUIDES: IndustryGuide[] = [
  hvacGuide,
  accountingFirmsGuide,
  managedItServicesGuide,
  fireLifeSafetyGuide,
  insuranceBrokeragesGuide,
  restorationRemediationGuide,
  homeServicesGuide,
  professionalServicesGuide,
  healthcareDentalGuide,
  plumbingGuide,
  commercialLandscapingGuide,
  commercialFacilityServicesGuide,
  securityMonitoringGuide,
  cybersecurityServicesGuide,
  verticalSaasGuide,
  specialtyManufacturingGuide,
  industrialEnvironmentalServicesGuide,
  testingInspectionCertificationGuide,
  specialtyDistributionGuide,
  transportationLogisticsGuide,
  aerospaceDefenseGovernmentGuide,
  wasteRecyclingGuide,
  waterWastewaterGuide,
  energyInfrastructureServicesGuide,
  engineeringConsultingGuide,
  staffingWorkforceGuide,
  veterinaryServicesGuide,
  behavioralHealthGuide,
  physicianPracticesGuide,
  medicalDevicesGuide,
  wealthManagementGuide,
];

export function getIndustryGuideBySlug(slug: string): IndustryGuide | undefined {
  return INDUSTRY_GUIDES.find((guide) => guide.slug === slug);
}
