import Link from "next/link";

import { Logo } from "@/components/site/Logo";
import { MobileNav } from "@/components/site/MobileNav";

const NAV_LINKS = [
  { href: "/calculator", label: "Valuation" },
  { href: "/sell-your-business", label: "Sell Your Business" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="relative border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-10">
          <Logo variant="horizontal" heightClassName="h-7" priority />

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/calculator"
            className="hidden items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark md:inline-flex"
          >
            Get Your Assessment
          </Link>
          <MobileNav links={NAV_LINKS} ctaHref="/calculator" ctaLabel="Get Your Assessment" />
        </div>
      </div>
    </header>
  );
}
