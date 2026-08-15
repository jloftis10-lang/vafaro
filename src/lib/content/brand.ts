/**
 * Single source of truth for OwnerGauge's brand identity and canonical
 * domain — referenced instead of repeating the name/tagline/URL as
 * scattered string literals across pages, metadata, and email templates.
 */
export const BRAND = {
  name: "OwnerGauge",
  tagline: "See your business through a buyer's eyes.",
  domain: "ownergauge.com",
} as const;

/** Canonical site URL — drives metadataBase, canonical links, sitemap, robots, and JSON-LD across the app. */
export const SITE_URL = "https://www.ownergauge.com";
