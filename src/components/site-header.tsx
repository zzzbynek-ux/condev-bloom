import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Menu, X } from "lucide-react";

import { SiteLogo } from "@/components/site-logo";
import { SECTIONS } from "@/lib/content";

const NAV = [
  { to: "/clanky", label: "Články" },
  { to: "/temata", label: "Témata" },
  { to: "/o-nas", label: "O nás" },
] as const;

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.4l-5-6.5L5.8 22H2.7l7.3-8.3L1.5 2H8l4.5 6 6.4-6Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* horní modrý pruh */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[88rem] items-stretch gap-4 pr-4 md:pr-6">
          {/* logo blok s bílým „vlaječkovým" pozadím a zkosením */}
          <Link
            to="/"
            className="relative flex shrink-0 items-center bg-white py-3 pl-4 pr-8 md:pl-8 md:pr-14 [clip-path:polygon(0_0,100%_0,calc(100%-1.75rem)_100%,0_100%)]"
          >
            <SiteLogo />
          </Link>


          <div className="ml-auto flex items-center">
            <button
              type="button"
              aria-label="Otevřít menu"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-primary-foreground/30 p-2 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* bílá lišta s navigací */}
      <div className="hidden border-b border-border bg-background lg:block">
        <div className="mx-auto flex max-w-[88rem] items-center px-4 py-2.5 md:px-6">
          <nav className="flex items-center">
            {NAV.map((item, i) => (
              <span key={item.to} className="flex items-center">
                {i > 0 ? <span className="mx-4 h-4 w-px bg-border" /> : null}
                <Link
                  to={item.to}
                  className="text-[15px] font-medium text-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary font-semibold" }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-3 text-foreground">
              <a href="https://x.com" aria-label="X" className="opacity-80 hover:opacity-100">
                <XIcon className="size-[18px]" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="opacity-80 hover:opacity-100">
                <Facebook className="size-[19px]" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="opacity-80 hover:opacity-100">
                <Instagram className="size-[19px]" />
              </a>
            </div>
            <Link
              to="/zapojte-se"
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Podpořte nás
            </Link>
          </div>
        </div>
      </div>





      {open ? (
        <div className="border-b border-border bg-background px-5 py-3 lg:hidden">
          <div className="flex flex-col">
            {[...NAV, { to: "/zapojte-se", label: "Zapojte se" } as const].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {SECTIONS.map((s) => (
              <Link
                key={s}
                to="/temata"
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm text-muted-foreground"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
