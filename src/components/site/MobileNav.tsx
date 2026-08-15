"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: NavLink[];
  ctaHref: string;
  ctaLabel: string;
}

/**
 * The header previously had no mobile equivalent at all — nav links were
 * `hidden md:flex`, so a phone visitor got the logo and CTA with zero way
 * to reach Industries/Resources/About. This restores that navigation
 * behind a compact toggle rather than crowding the OG+wordmark lockup.
 */
export function MobileNav({ links, ctaHref, ctaLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <nav id="mobile-nav-panel" className="absolute inset-x-0 top-full border-b border-line bg-surface px-6 py-4 shadow-sm">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm text-ink transition-colors hover:bg-canvas"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            {ctaLabel}
          </Link>
        </nav>
      )}
    </div>
  );
}
