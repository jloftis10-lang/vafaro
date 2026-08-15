import { describe, expect, it } from "vitest";

import { evaluateStrengths } from "@/lib/assessment/strengths";
import { ownerDependentAnswers, strongAnswers, veryWeakAnswers } from "@/lib/assessment/__tests__/fixtures";

describe("evaluateStrengths", () => {
  it("returns up to 4 strengths, each from a different category, for a strong company", () => {
    const strengths = evaluateStrengths(strongAnswers);
    expect(strengths.length).toBeGreaterThan(0);
    expect(strengths.length).toBeLessThanOrEqual(4);
    const categories = strengths.map((s) => s.category);
    expect(new Set(categories).size).toBe(categories.length);
  });

  it("can legitimately return zero for a company weak across every category, without crashing", () => {
    const strengths = evaluateStrengths(veryWeakAnswers);
    expect(strengths).toEqual([]);
  });

  it("never surfaces reduced owner dependence for a highly owner-dependent company", () => {
    const strengths = evaluateStrengths(ownerDependentAnswers);
    expect(strengths.map((s) => s.id)).not.toContain("reduced-owner-dependence");
  });
});
