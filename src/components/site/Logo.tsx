import Image from "next/image";
import Link from "next/link";

import darkLogo from "@/assets/brand/ownergauge-logo-dark.png";
import horizontalLogo from "@/assets/brand/ownergauge-logo-horizontal.png";
import horizontalTaglineLogo from "@/assets/brand/ownergauge-logo-horizontal-tagline.png";
import iconLogo from "@/assets/brand/ownergauge-icon.png";
import stackedLogo from "@/assets/brand/ownergauge-logo-stacked.png";
import { BRAND } from "@/lib/content/brand";

export type LogoVariant = "horizontal" | "horizontal-tagline" | "stacked" | "dark" | "icon";

const VARIANT_ASSETS = {
  horizontal: horizontalLogo,
  "horizontal-tagline": horizontalTaglineLogo,
  stacked: stackedLogo,
  dark: darkLogo,
  icon: iconLogo,
} as const;

interface LogoProps {
  /**
   * horizontal — primary lockup for header/nav/report headers.
   * horizontal-tagline — same, with "See your business through a buyer's eyes." underneath; footer/about/print only.
   * stacked — compact vertical lockup; report covers, empty states, mobile-compact contexts.
   * dark — white/blue lockup for navy backgrounds; never place the light "horizontal" variant on navy (its navy "O" disappears).
   * icon — standalone OG monogram; favicon-adjacent uses, compact nav states, loading indicators.
   */
  variant?: LogoVariant;
  /** Display height in Tailwind's h-* scale, e.g. "h-8". Width follows the image's natural aspect ratio. */
  heightClassName?: string;
  /** Wrap in a link to this href. Pass null to render the image alone (e.g. inside an existing <Link>). */
  href?: string | null;
  /** True for the header's above-the-fold logo so it isn't lazy-loaded. */
  priority?: boolean;
  className?: string;
}

const DEFAULT_ALT: Record<LogoVariant, string> = {
  horizontal: BRAND.name,
  "horizontal-tagline": `${BRAND.name} — ${BRAND.tagline}`,
  stacked: `${BRAND.name} — ${BRAND.tagline}`,
  dark: BRAND.name,
  icon: BRAND.name,
};

export function Logo({ variant = "horizontal", heightClassName = "h-8", href = "/", priority, className }: LogoProps) {
  const img = (
    <Image
      src={VARIANT_ASSETS[variant]}
      alt={DEFAULT_ALT[variant]}
      priority={priority}
      className={`w-auto ${heightClassName} ${className ?? ""}`.trim()}
    />
  );

  if (href === null) return img;

  // No aria-label here: the wrapped image's alt text already gives the link
  // its accessible name — an aria-label would just duplicate the announcement.
  return (
    <Link href={href} className="inline-flex items-center">
      {img}
    </Link>
  );
}
