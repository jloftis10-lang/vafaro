import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ClarityTracking } from "@/components/analytics/ClarityTracking";
import { BRAND, SITE_URL } from "@/lib/content/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const SITE_TITLE = `${BRAND.name} | What Is Your Business Worth?`;
const SITE_DESCRIPTION =
  "A free, confidential assessment of what your business could sell for and how prepared it looks for a sale, based on your industry, financials, and how the business runs day to day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: BRAND.name,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${BRAND.name} — ${BRAND.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  verification: {
    other: {
      "msvalidate.01": "90D38BE407C4DA75B975F733C0C41426",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/icon-512.png`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas font-sans text-ink">
        <ClarityTracking />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
