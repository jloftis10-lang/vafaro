import Link from "next/link";

import { Logo } from "@/components/site/Logo";
import { BRAND } from "@/lib/content/brand";

const FOOTER_LINKS = [
  { href: "/calculator", label: "Valuation" },
  { href: "/sell-your-business", label: "Sell Your Business" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo variant="horizontal" heightClassName="h-6" href="/" />
            <p className="mt-3 max-w-sm text-sm text-muted">
              A pre-sale diagnostic for business owners exploring what their
              company is worth and how prepared it is for a transaction.
            </p>
            <p className="mt-1 text-sm text-muted-soft">{BRAND.tagline}</p>
          </div>

          <Link
            href="/calculator"
            className="inline-flex items-center justify-center rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-muted-soft sm:self-start"
          >
            Get Your Assessment
          </Link>
        </div>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-xs leading-relaxed text-muted">
            <p>&copy; {new Date().getFullYear()} OwnerGauge. All rights reserved.</p>
            <p className="mt-1">
              Estimates provided are directional and for planning purposes
              only — not a formal business valuation, appraisal, or fairness
              opinion. Submitting an assessment does not create an advisory
              relationship.
            </p>
          </div>
          <nav className="flex flex-none gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
