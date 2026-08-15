/**
 * COMPLIANCE REVIEW REQUIRED before this goes to production.
 *
 * Centralizes every claim made about who is behind OwnerGauge, so it's a
 * one-file change (or removal) rather than scattered copy across pages.
 * The facts below were confirmed directly by the site owner, but a title,
 * firm affiliation, and certification claimed in M&A advisory marketing
 * often carries real compliance implications (e.g. outside business
 * activity / marketing approval requirements) — confirming factual
 * accuracy is not the same as confirming it's cleared for public use.
 * Get sign-off before shipping this to real visitors.
 *
 * Two changes made in the 2026-08 credibility/compliance pass, both flagged
 * for manual verification rather than assumed correct:
 *
 * 1. Credential corrected from "Certified M&A Advisor (CM&A)" — not a real
 *    credential abbreviation — to "Certified Merger & Acquisition Advisor
 *    (CM&AA)", the actual name of the certification. Confirm the site owner
 *    actually holds this exact certification (not a related but different
 *    one) before shipping.
 * 2. Title changed from "Independent M&A Advisor" to "Founder, OwnerGauge".
 *    "Independent M&A Advisor" asserts an active, ongoing advisory
 *    practice/role — that may carry licensing, marketing-approval, or
 *    outside-business-activity implications beyond what "founder of this
 *    website" does, and this file has no confirmed current employer/firm
 *    to anchor it to (firm is deliberately blank below). Don't restore it
 *    without separately confirming the claim is both accurate and cleared.
 *
 * Not yet verified, flagged for founder verification (see
 * docs/professional-review-checklist.md): the $5M-$320M deal-range and
 * "worked on" framing below. Note the distinction already respected here —
 * "worked on" transactions, never "closed" — is deliberate; a lead-scoring
 * code comment elsewhere (lead-score-config.ts) says "closed," which is a
 * stronger, unverified claim inconsistent with this file's public-facing
 * wording. That comment isn't user-facing but should be corrected or
 * confirmed during founder verification so the discrepancy doesn't linger.
 *
 * No Blue River Financial Group reference exists anywhere in this file or
 * elsewhere in the repo (verified via repo-wide search) — there is nothing
 * here implying current affiliation, employment, or endorsement to remove.
 * If historical Blue River experience is ever added to this bio, it needs
 * the same treatment: past-tense, clearly historical, no implied current
 * relationship.
 */
export const FOUNDER_CONTENT = {
  // Explicitly confirmed by the site owner.
  name: "James Loftis",
  title: "Founder, OwnerGauge",
  firm: "",
  credentials: ["Certified Merger & Acquisition Advisor (CM&AA)"],
  location: "San Diego, CA",
  dealRange: "$5 million to $320 million",

  focus: "transactions ranging from $5 million to $320 million in deal value",

  headline: "Built from real M&A experience.",
  blurb:
    "Built by someone who has worked on M&A transactions from $5 million to $320 million, OwnerGauge gives business owners access to the kinds of questions that come up during an actual transaction — before they commit to a sale process. It's meant to be the resource an owner wishes they'd had before their first conversation with an advisor.",

  bio: "James has worked on M&A transactions ranging from $5 million to $320 million in deal value — experience that surfaces exactly what buyers scrutinize, what slows a deal down, and what separates a business that sells smoothly from one that doesn't. OwnerGauge grew out of a simple observation: most owners start asking these questions years before they're ready to hire an advisor, and there wasn't a credible place to start.",

  philosophy: [
    "Owners deserve clarity before committing to a transaction process.",
    "Preparation creates options — it doesn't obligate you to sell.",
    "Valuation is only one part of exit readiness.",
    "A business should be examined from the buyer's perspective, not just the owner's.",
  ],
};
