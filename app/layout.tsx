import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./pricing.css";
import "./articles.css";
import "./footer.css";
import "./results.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vafaro.com"),
  title: { default: "Vafaro — Trip Fit Reports for Multigenerational Travel", template: "%s | Vafaro" },
  description:
    "Check any travel itinerary for walking, stairs, pacing, transfers, accessibility, and hidden friction. Built for multigenerational trips and travel with aging parents.",
  keywords: ["multigenerational travel planning", "travel with aging parents", "trip accessibility checker", "travel itinerary review", "senior friendly travel", "family trip planner", "accessible travel planning"],
  alternates: { canonical: "/" },
  openGraph: { title: "Vafaro — Know before you go", description: "Upload any itinerary. See whether the trip actually fits the people taking it.", url: "https://vafaro.com", siteName: "Vafaro", type: "website" },
  twitter: { card: "summary_large_image", title: "Vafaro — Trip Fit Reports", description: "Beautiful plans. Real-world checked." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
