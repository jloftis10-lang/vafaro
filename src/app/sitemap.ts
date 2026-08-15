import type { MetadataRoute } from "next";

import { INDUSTRY_GUIDES } from "@/content/industries";
import { RESOURCE_ARTICLES } from "@/content/resources";
import { SITE_URL } from "@/lib/content/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/calculator",
    "/sell-your-business",
    "/industries",
    "/resources",
    "/methodology",
    "/about",
    "/privacy",
    "/terms",
    "/disclaimer",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const industryRoutes = INDUSTRY_GUIDES.map((guide) => ({
    url: `${SITE_URL}/industries/${guide.slug}`,
    lastModified: new Date(),
  }));

  const resourceRoutes = RESOURCE_ARTICLES.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...industryRoutes, ...resourceRoutes];
}
