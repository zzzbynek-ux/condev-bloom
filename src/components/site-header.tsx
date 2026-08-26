import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Facebook, Flag, Instagram, Menu, Search, X } from "lucide-react";
import { TOPICS } from "@/lib/content";
import logoWhite from "@/assets/logo-white.png.asset.json";

type NavTo = "/clanky" | "/temata" | "/o-nas" | "/zapojte-se" | "/manifest" | "/nahlasit-incident" | "/ptejte-se-ai";
type NavChild = { label: string; to?: NavTo };
type NavItem =
  | { label: string; to: NavTo; children?: undefined }
  | { label: string; to?: undefined; children: NavChild[] };

const NAV: NavItem[] = [
  { label: "O nás", to: "/o-nas" },
  {
    label: "Články",
    children: [
      { label: "Nové", to: "/clanky" },
      { label: "Doporučujeme", to: "/clanky" },
      { label: "Studie a analýzy", to: "/clanky" },
      { label: "České příběhy", to: "/clanky" },
      { label: "Všechny texty", to: "/clanky" },
    ],
  },
  {
    label: "Témata",
    children: TOPICS.map((t) => ({ label: t.title, to: "/temata" as NavTo })),
  },
  {
    label: "Zapojte se",
    children: [
      { label: "Nahlásit incident", to: "/nahlasit-incident" },
      { label: "JH Projekty (připravujeme)" },
      { label: "E-shop (připravujeme)" },
    ],
  },
  {
    label: "Chcete vědět víc?",
    children: [
      { label: "Manifest", to: "/manifest" },
      { label: "Co je antisemitismus?", to: "/temata" },
      { label: "Ptejte se AI", to: "/ptejte-se-ai" },
    ],
  },
];


function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.4l-5-6.5L5.8 22H2.7l7.3-8.3L1.5 2H8l4.5 6 6.4-6Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* horní modrý pruh: identita + rychlé kontakty */}
      <div className="bg-primary text-primary-foreground">

        <div className="mx-auto flex max-w-[88rem] items-stretch gap-4 pr-4 md:pr-6">
          {/* čistá modrá plocha s odkazem na úvod */}
          <Link to="/" className="flex shrink-0 items-center py-6 pl-4 md:pl-6">
            <span className="sr-only">Jedním Hlasem — úvodní stránka</span>
          </Link>




          <div className="ml-auto flex items-center gap-4">
            <Link
              to="/nahlasit-incident"
              className="hidden items-center gap-2 text-sm font-semibold text-primary-foreground/90 transition-colors hover:text-primary-foreground lg:flex"
            >
              <Flag className="size-4" />
              Nahlásit incident
            </Link>
            <span className="hidden h-5 w-px bg-primary-foreground/25 lg:block" />
            <div className="hidden items-center gap-3 lg:flex">
              <a href="https://x.com" aria-label="X" className="opacity-80 transition-opacity hover:opacity-100">
                <XIcon className="size-[17px]" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="opacity-80 transition-opacity hover:opacity-100">
                <Facebook className="size-[18px]" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="opacity-80 transition-opacity hover:opacity-100">
                <Instagram className="size-[18px]" />
              </a>
            </div>

            <Link to="/hledat" aria-label="Hledat" className="rounded-md p-2 lg:hidden">
              <Search className="size-5" />
            </Link>
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

      {/* bílá lišta: hlavní navigace + hledání + CTA */}
      <div className="hidden border-b border-border bg-background lg:block">
        <div className="mx-auto flex max-w-[88rem] items-stretch px-4 md:px-6">
          <nav className="flex items-stretch gap-7">
            {NAV.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="group relative flex items-stretch"
                  onMouseEnter={() => setMenu(item.label)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <button
                    type="button"
                    onClick={() => setMenu((m) => (m === item.label ? null : item.label))}
                    aria-expanded={menu === item.label}
                    className="flex items-center gap-1.5 border-b-2 border-transparent py-4 text-base font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 transition-transform ${menu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {menu === item.label ? (
                    <div className="absolute left-0 top-full z-50 w-64 rounded-b-xl border border-t-0 border-border bg-background py-2 shadow-lg">
                      {item.children.map((c) =>
                        c.to ? (
                          <Link
                            key={c.label}
                            to={c.to}
                            onClick={() => setMenu(null)}
                            className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                          >
                            {c.label}
                          </Link>
                        ) : (
                          <span
                            key={c.label}
                            className="block cursor-default px-4 py-2 text-sm text-muted-foreground"
                          >
                            {c.label}
                          </span>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center border-b-2 border-transparent py-4 text-base font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
                  activeProps={{ className: "border-primary text-primary" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (!q.trim()) return;
                void navigate({ to: "/hledat", search: { q } });
              }}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 focus-within:border-primary"
            >
              <Search className="size-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Hledat…"
                aria-label="Hledat na webu"
                className="w-32 bg-transparent text-sm outline-none transition-all placeholder:text-muted-foreground focus:w-48"
              />
            </form>
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
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (!q.trim()) return;
              setOpen(false);
              void navigate({ to: "/hledat", search: { q } });
            }}
            className="mb-3 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
          >
            <Search className="size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat na webu…"
              aria-label="Hledat na webu"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>
          <div className="flex flex-col">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border py-2">
                  <p className="py-1 text-sm font-semibold uppercase tracking-wide text-foreground">
                    {item.label}
                  </p>
                  <div className="flex flex-col pl-3">
                    {item.children.map((c) =>
                      c.to ? (
                        <Link
                          key={c.label}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm text-foreground/80"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <span key={c.label} className="py-2 text-sm text-muted-foreground">
                          {c.label}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-sm font-semibold uppercase tracking-wide text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

        </div>
      ) : null}
    </header>
  );
}
