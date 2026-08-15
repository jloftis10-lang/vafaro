import { describe, expect, it } from "vitest";

import { assessmentSubmissionSchema } from "@/lib/assessment/schema";

const validPayload = {
  email: "seller@example.com",
  industryId: "accounting-firms",
  revenue: 2_000_000,
  metricType: "sde",
  metricValue: 400_000,
  yearsInBusiness: 12,
  revenueGrowth: "growing_10_20",
  profitabilityTrend: "improving",
  recurringRevenuePct: "majority_30_plus",
  largestCustomerPct: "under_10",
  top5CustomersPct: 25,
  ownerHoursPerWeek: "under_10",
  ownerAbsenceImpact: "normal_operation",
  customerRelationshipOwnership: "sales_team",
  managementDepth: "strong_team",
  processDocumentation: "formal_sops",
  financialStatementQuality: "audited_reviewed",
  recordsCurrency: "through_last_month",
  financialHistoryYears: "three_plus_plus_ytd",
  addBackDocumentation: "well_documented",
  expenseSeparation: "completely",
  saleTimeline: "now",
  transactionPriorities: ["max_price"],
};

describe("assessmentSubmissionSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(assessmentSubmissionSchema.safeParse(validPayload).success).toBe(true);
  });

  it("accepts a payload with every optional field omitted", () => {
    const { yearsInBusiness, top5CustomersPct, ...minimal } = validPayload;
    void yearsInBusiness;
    void top5CustomersPct;
    expect(assessmentSubmissionSchema.safeParse(minimal).success).toBe(true);
  });

  it("rejects negative revenue", () => {
    const result = assessmentSubmissionSchema.safeParse({ ...validPayload, revenue: -100 });
    expect(result.success).toBe(false);
  });

  it("rejects zero revenue", () => {
    const result = assessmentSubmissionSchema.safeParse({ ...validPayload, revenue: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects negative metricValue", () => {
    const result = assessmentSubmissionSchema.safeParse({ ...validPayload, metricValue: -50_000 });
    expect(result.success).toBe(false);
  });

  it("rejects non-finite revenue (NaN / Infinity)", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, revenue: NaN }).success).toBe(false);
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, revenue: Infinity }).success).toBe(false);
  });

  it("rejects absurdly large revenue (likely a typo, e.g. an extra zero)", () => {
    const result = assessmentSubmissionSchema.safeParse({ ...validPayload, revenue: 50_000_000_000 });
    expect(result.success).toBe(false);
  });

  it("rejects an impossible top5CustomersPct percentage", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, top5CustomersPct: 150 }).success).toBe(false);
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, top5CustomersPct: -10 }).success).toBe(false);
  });

  it("rejects a negative yearsInBusiness", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, yearsInBusiness: -5 }).success).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects an unknown enum value", () => {
    expect(
      assessmentSubmissionSchema.safeParse({ ...validPayload, metricType: "profit" }).success,
    ).toBe(false);
  });

  it("rejects earnings greater than revenue", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, metricValue: 3_000_000 }).success).toBe(false);
  });

  it("requires conditional concentration and successor details", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, largestCustomerPct: "over_50" }).success).toBe(false);
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, ownerHoursPerWeek: "over_50" }).success).toBe(false);
  });

  it("rejects an industry outside the configured taxonomy", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, industryId: "made-up-industry" }).success).toBe(false);
  });

  it("rejects an empty transactionPriorities array", () => {
    expect(
      assessmentSubmissionSchema.safeParse({ ...validPayload, transactionPriorities: [] }).success,
    ).toBe(false);
  });

  it("rejects a missing required field", () => {
    const { industryId, ...withoutIndustry } = validPayload;
    void industryId;
    expect(assessmentSubmissionSchema.safeParse(withoutIndustry).success).toBe(false);
  });

  it("accepts an empty honeypot field, and accepts it filled in too (route decides what to do with it)", () => {
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, company: "" }).success).toBe(true);
    expect(assessmentSubmissionSchema.safeParse({ ...validPayload, company: "Acme Bot LLC" }).success).toBe(true);
  });
});
