"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-forest/10 bg-warm-ivory/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Brand Link */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-wider text-ink-forest transition-opacity hover:opacity-80"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60 transition-colors group-hover:text-ink-forest">
            ABEL /
          </span>
          <span className="tracking-tight uppercase">DIGITAL</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium uppercase tracking-widest text-ink-forest/75 transition-colors hover:text-ink-forest"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-ink-forest px-4 py-2 text-xs font-medium tracking-wider uppercase text-warm-ivory transition-colors hover:bg-ink-forest/85 focus:outline-none focus:ring-2 focus:ring-ink-forest focus:ring-offset-2"
          >
            Start Project
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2 text-ink-forest hover:opacity-75 focus:outline-none md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-ink-forest/10 bg-warm-ivory px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium uppercase tracking-widest text-ink-forest/80 transition-colors hover:text-ink-forest"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-ink-forest py-2.5 text-xs font-medium uppercase tracking-wider text-warm-ivory transition-colors hover:bg-ink-forest/85"
            >
              Start Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
