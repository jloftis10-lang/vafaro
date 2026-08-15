import { describe, expect, it } from "vitest";

import { calculateReadiness } from "@/lib/assessment/readiness";
import { buildTransactionSnapshot } from "@/lib/assessment/snapshot";
import { ownerDependentAnswers, strongAnswers } from "@/lib/assessment/__tests__/fixtures";

describe("buildTransactionSnapshot", () => {
  it("returns exactly 4 labeled items (one per Buyer Lens category) for a strong company, all favorable", () => {
    const items = buildTransactionSnapshot(calculateReadiness(strongAnswers));
    expect(items).toHaveLength(4);
    for (const item of items) {
      expect(["Strong", "Low Risk"]).toContain(item.value);
      expect(item.tone).toBe("strong");
    }
  });

  it("flags Transferability as elevated risk for a highly owner-dependent company, without changing unrelated labels", () => {
    const items = buildTransactionSnapshot(calculateReadiness(ownerDependentAnswers));
    const transferability = items.find((i) => i.label === "Transferability")!;
    const earningsQuality = items.find((i) => i.label === "Earnings Quality")!;

    expect(transferability.value).toBe("Elevated Risk");
    expect(transferability.tone).toBe("risk");
    expect(earningsQuality.value).toBe("Strong");
  });

  it("uses risk-framed labels for Transferability and Concentration Risk, never Strong/Moderate", () => {
    const items = buildTransactionSnapshot(calculateReadiness(strongAnswers));
    const transferability = items.find((i) => i.label === "Transferability")!;
    const concentrationRisk = items.find((i) => i.label === "Concentration Risk")!;

    expect(transferability.value).toMatch(/Risk$/);
    expect(concentrationRisk.value).toMatch(/Risk$/);
  });
});
