import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

type NavTo = "/clanky" | "/temata" | "/o-nas" | "/zapojte-se" | "/manifest" | "/nahlasit-incident" | "/ptejte-se-ai";
type NavChild = { label: string; to?: NavTo; search?: { filtr: string } };
type NavItem =
  | { label: string; to: NavTo; children?: undefined }
  | { label: string; to?: undefined; children: NavChild[] };

const NAV: NavItem[] = [
  {
    label: "Články",
    children: [
      { label: "Nové", to: "/clanky", search: { filtr: "nove" } },
      { label: "Doporučujeme", to: "/clanky", search: { filtr: "doporucujeme" } },
      { label: "Češi a Izrael", to: "/clanky", search: { filtr: "cesi-a-izrael" } },
      { label: "Studie a analýzy", to: "/clanky", search: { filtr: "studie" } },
      { label: "Tydýt týdne", to: "/clanky", search: { filtr: "tydyt" } },
      { label: "Všechny texty", to: "/clanky" },
    ],
  },
  { label: "O nás", to: "/o-nas" },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073C0 18.098 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.653c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.098 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

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
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const openSearch = () => {
    if (open) {
      searchRef.current?.focus();
      return;
    }
    setOpen(true);
  };

  return (
    <header className="site-header-sticky sticky top-0 z-50 shadow-sm">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex h-16 max-w-[88rem] items-center gap-4 px-4 md:h-[4.25rem] md:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="JednímHlasem — domů">
            <img
              src="/images/logo-jednim-hlasem.png"
              alt="JednímHlasem"
              width={264}
              height={60}
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/podporte-nas"
              className="hidden h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-primary transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Podpořte nás
            </Link>
            <button type="button" aria-label="Hledat" onClick={openSearch} className="rounded-md p-2 lg:hidden">
              <Search className="size-5" />
            </button>
            <button
              type="button"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-primary-foreground/30 p-2 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-border bg-background lg:block">
        <div className="mx-auto flex h-12 max-w-[88rem] items-center justify-between gap-8 px-4 md:px-6">
          <nav className="flex items-center gap-8" aria-label="Hlavní navigace">
            {NAV.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="group relative flex items-center"
                  onMouseEnter={() => setMenu(item.label)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <button
                    type="button"
                    onClick={() => setMenu((m) => (m === item.label ? null : item.label))}
                    aria-expanded={menu === item.label}
                    className="flex items-center gap-1 text-[13px] font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                    <ChevronDown className={`size-3.5 transition-transform ${menu === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {menu === item.label ? (
                    <div className="absolute left-0 top-full z-50 w-max min-w-[14rem] rounded-b-xl border border-t-0 border-border bg-background py-2 shadow-lg">
                      {item.children.map((c) => {
                        const currentFiltr = (location.search as { filtr?: string }).filtr;
                        const isActive =
                          c.to === "/clanky" && location.pathname === "/clanky"
                            ? c.search?.filtr
                              ? currentFiltr === c.search.filtr
                              : !currentFiltr
                            : false;
                        return c.to ? (
                          <Link
                            key={c.label}
                            to={c.to}
                            {...(c.search ? { search: c.search } : {})}
                            onClick={() => setMenu(null)}
                            className={`block whitespace-nowrap px-4 py-3 text-sm font-semibold text-primary transition-colors ${
                              isActive ? "opacity-100" : "hover:opacity-80"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ) : (
                          <span key={c.label} className="block cursor-default whitespace-nowrap px-4 py-3 text-sm font-semibold text-muted-foreground">
                            {c.label}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-[13px] font-semibold text-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (!q.trim()) return;
                void navigate({ to: "/hledat", search: { q } });
              }}
              className="flex h-9 w-56 items-center gap-2 rounded-full border border-border bg-card px-3"
            >
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Hledat články"
                aria-label="Hledat články"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>
            <a href="https://www.facebook.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na Facebooku" title="JednímHlasem na Facebooku" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-primary">
              <FacebookIcon className="size-4" />
            </a>
            <a href="https://www.instagram.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na Instagramu" title="JednímHlasem na Instagramu" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-primary">
              <InstagramIcon className="size-4" />
            </a>
            <a href="https://x.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na X" title="JednímHlasem na X" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-primary">
              <XIcon className="size-4" />
            </a>
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
              ref={searchRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat články"
              aria-label="Hledat články"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>
          <nav className="flex flex-col" aria-label="Mobilní menu">
            <Link to="/clanky" onClick={() => setOpen(false)} className="border-b border-border py-3 text-base font-semibold uppercase tracking-wide text-foreground">Články</Link>
            <Link to="/o-nas" onClick={() => setOpen(false)} className="border-b border-border py-3 text-base font-semibold uppercase tracking-wide text-foreground">O nás</Link>
            <Link to="/ptejte-se-ai" onClick={() => setOpen(false)} className="border-b border-border py-3 text-base font-semibold uppercase tracking-wide text-foreground">Ptejte se AI</Link>
            <Link to="/nahlasit-incident" onClick={() => setOpen(false)} className="border-b border-border py-3 text-base font-semibold uppercase tracking-wide text-foreground">Nahlásit incident</Link>
            <Link to="/podporte-nas" onClick={() => setOpen(false)} className="py-3 text-base font-semibold uppercase tracking-wide text-foreground">Podpořte nás</Link>
          </nav>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            <a href="https://www.facebook.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na Facebooku" title="JednímHlasem na Facebooku" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground">
              <FacebookIcon className="size-4" />
            </a>
            <a href="https://www.instagram.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na Instagramu" title="JednímHlasem na Instagramu" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground">
              <InstagramIcon className="size-4" />
            </a>
            <a href="https://x.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na X" title="JednímHlasem na X" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground">
              <XIcon className="size-4" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
