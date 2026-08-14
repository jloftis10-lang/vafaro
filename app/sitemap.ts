import type { MetadataRoute } from "next";
import { excursionEntries } from "@/lib/excursion-library";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.vafaro.com";
  const excursionRecords: MetadataRoute.Sitemap = excursionEntries.map((entry) => ({
    url: `${base}/excursions/${entry.slug}`,
    lastModified: entry.reviewedOn,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/check`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/check/excursion`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/shore-excursion-fit-check`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/excursions`, lastModified: "2026-08-14", changeFrequency: "weekly", priority: 0.9 },
    ...excursionRecords,
    { url: `${base}/report`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/methodology`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/pompeii-shore-excursion-walking-difficulty`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/guides/dubrovnik-shore-excursion-walking-difficulty`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/guides/traveling-with-aging-parents`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/rome-with-aging-parents`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
