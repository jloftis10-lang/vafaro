import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://vafaro.com"; return [{url:base,changeFrequency:"weekly",priority:1},{url:`${base}/check`,changeFrequency:"monthly",priority:.9},{url:`${base}/report`,changeFrequency:"monthly",priority:.8},{url:`${base}/methodology`,changeFrequency:"monthly",priority:.7},{url:`${base}/guides/traveling-with-aging-parents`,changeFrequency:"monthly",priority:.8},{url:`${base}/guides/rome-with-aging-parents`,changeFrequency:"monthly",priority:.8}]; }
