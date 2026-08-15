import { describe, expect, it } from "vitest";

import { getResearchSource, RESEARCH_SOURCES } from "@/content/sources";

describe("RESEARCH_SOURCES", () => {
  it("every source has a URL and a data period", () => {
    for (const source of Object.values(RESEARCH_SOURCES)) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.dataAsOf).toBeTruthy();
    }
  });

  it("getResearchSource returns the matching entry", () => {
    const source = getResearchSource("ibba-market-pulse-q4-2025");
    expect(source.publisher).toBe("IBBA & M&A Source");
  });

  it("getResearchSource throws on an unknown id rather than returning undefined", () => {
    expect(() => getResearchSource("not-a-real-source")).toThrow();
  });
});
