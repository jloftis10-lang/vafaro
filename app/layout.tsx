import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./pricing.css";
import "./articles.css";
import "./footer.css";
import "./results.css";
import "./pilot.css";
import "./offer.css";
import "./excursions.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vafaro.com"),
  title: { default: "Vafaro — Multigenerational Family Itinerary Review", template: "%s | Vafaro" },
  description:
    "Stress-test a family travel itinerary for walking, stairs, pacing, transfers, recovery, and hidden friction before you book.",
  keywords: ["multigenerational family travel", "multigenerational trip planner", "traveling with aging parents", "senior friendly family vacations", "family travel itinerary", "family trip planner", "accessible family travel"],
  openGraph: { title: "Vafaro — Know before you go", description: "Upload any itinerary. See whether the trip actually fits the people taking it.", siteName: "Vafaro", type: "website" },
  twitter: { card: "summary_large_image", title: "Vafaro — Trip Fit Reports", description: "Beautiful plans. Real-world checked." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${serif.variable}`}>{children}<Analytics /></body>
    </html>
  );
}
