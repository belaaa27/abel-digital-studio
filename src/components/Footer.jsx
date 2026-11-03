import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ink-forest/10 bg-warm-ivory text-ink-forest">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Studio Statement */}
          <div className="space-y-4 md:col-span-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-ink-forest"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
                ABEL /
              </span>
              <span className="tracking-tight uppercase">DIGITAL</span>
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-ink-forest/75">
              Independent digital studio crafting high-performance websites,
              custom web applications, and intuitive digital experiences.
              Focused on clean engineering and editorial clarity.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3 md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-forest/70">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/"
                  className="text-ink-forest/80 transition-colors hover:text-ink-forest"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#work"
                  className="text-ink-forest/80 transition-colors hover:text-ink-forest"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-ink-forest/80 transition-colors hover:text-ink-forest"
                >
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-ink-forest/80 transition-colors hover:text-ink-forest"
                >
                  About Abel
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-ink-forest/80 transition-colors hover:text-ink-forest"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Inquiries */}
          <div className="space-y-3 md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-forest/70">
              Inquiries
            </h3>
            <p className="text-xs text-ink-forest/75 leading-relaxed">
              Open for new projects and collaborations.
            </p>
            <div className="pt-1">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-ink-forest hover:underline"
              >
                <span>Get in touch</span>
                <span className="font-mono">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-forest/10 pt-6 text-[11px] text-ink-forest/60 sm:flex-row">
          <p>© {currentYear} ABEL / DIGITAL. All rights reserved.</p>
          <p className="italic">
            Independent Digital Studio & Full-Stack Practice
          </p>
        </div>
      </div>
    </footer>
  );
}
