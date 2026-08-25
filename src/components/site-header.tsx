import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/clanky", label: "Články" },
  { to: "/temata", label: "Témata" },
  { to: "/o-nas", label: "O nás" },
  { to: "/zapojte-se", label: "Zapojte se" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Jedním<span className="text-primary">Hlasem</span>
          </span>
          <span className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Fakta proti dezinformacím
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/zapojte-se"
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Podpořte nás
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Otevřít menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto rounded-full border border-border p-2 text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-5 py-3 md:hidden">
          <div className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/zapojte-se"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Podpořte nás
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
