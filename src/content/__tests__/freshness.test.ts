import { describe, expect, it } from "vitest";

import { findStaleContent } from "@/content/freshness";

describe("findStaleContent", () => {
  const today = new Date("2026-08-10T00:00:00Z");

  it("flags items whose nextReviewAt has passed", () => {
    const stale = findStaleContent(
      [{ slug: "overdue", title: "Overdue Article", nextReviewAt: "2026-06-01" }],
      today,
    );
    expect(stale).toHaveLength(1);
    expect(stale[0].slug).toBe("overdue");
    expect(stale[0].daysOverdue).toBeGreaterThan(0);
  });

  it("does not flag items whose nextReviewAt is in the future", () => {
    const stale = findStaleContent(
      [{ slug: "fresh", title: "Fresh Article", nextReviewAt: "2026-12-01" }],
      today,
    );
    expect(stale).toHaveLength(0);
  });

  it("skips evergreen items with no nextReviewAt", () => {
    const stale = findStaleContent([{ slug: "evergreen", title: "Evergreen Article" }], today);
    expect(stale).toHaveLength(0);
  });
});
