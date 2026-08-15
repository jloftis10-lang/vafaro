import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site rebranded from Vafaro to OwnerGauge; vafaro.com's DNS still
  // points at this same Vercel deployment. Permanently redirect both the
  // apex and www there to the new domain so search engines consolidate
  // under one canonical host instead of indexing duplicate content, and old
  // bookmarks/backlinks keep working instead of 404ing.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "vafaro.com" }],
        destination: "https://www.ownergauge.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vafaro.com" }],
        destination: "https://www.ownergauge.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
