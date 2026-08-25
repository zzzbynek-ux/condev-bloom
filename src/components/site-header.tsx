import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/clanky", label: "Články" },
  { to: "/temata", label: "Témata" },
  { to: "/o-nas", label: "O nás" },
  { to: "/zapojte-se", label: "Zapojte se" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/20 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-primary-foreground">
            Jedním<span className="text-white">Hlasem</span>
          </span>
          <span className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-primary-foreground/80">
            Fakta proti dezinformacím
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              activeProps={{ className: "bg-primary-foreground/15 text-primary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/zapojte-se"
            className="ml-2 rounded-full bg-primary-foreground px-4 py-2 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
          >
            Podpořte nás
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Otevřít menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-full border border-primary-foreground/30 p-2 text-primary-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-primary-foreground/20 bg-primary px-5 py-3 md:hidden">
          <div className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-primary-foreground/15 py-3 text-sm text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/zapojte-se"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-primary-foreground px-4 py-2 text-center text-sm font-medium text-primary"
            >
              Podpořte nás
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
