import { describe, expect, it } from "vitest";

import { getMarketSegment } from "@/lib/valuation/market-segment";

describe("getMarketSegment", () => {
  it("classifies by standard M&A size bands", () => {
    expect(getMarketSegment(500_000)).toBe("Micro");
    expect(getMarketSegment(2_000_000)).toBe("Small / Main Street");
    expect(getMarketSegment(20_000_000)).toBe("Lower Middle Market");
    expect(getMarketSegment(100_000_000)).toBe("Middle Market");
  });

  it("a $1M owner-operated company and a $100M platform never land in the same segment", () => {
    expect(getMarketSegment(1_000_000)).not.toBe(getMarketSegment(100_000_000));
  });
});
