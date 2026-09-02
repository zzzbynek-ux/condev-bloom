import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

type NavTo = "/clanky" | "/temata" | "/o-nas" | "/zapojte-se" | "/manifest" | "/nahlasit-incident" | "/ptejte-se-ai";
type NavChild = { label: string; to?: NavTo; search?: { filtr?: string } };
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

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* horní modrý pruh: identita + rychlé kontakty */}
      <div className="bg-primary text-primary-foreground">

        <div className="mx-auto flex max-w-[88rem] items-stretch gap-4 pr-4 md:pr-6">
          {/* textové logo na modré */}
          <Link to="/" className="flex shrink-0 flex-col justify-center py-4 pl-4 md:pl-6">
            <span className="font-display text-xl font-extrabold uppercase leading-none tracking-[0.02em] text-primary-foreground md:text-2xl">
              Jedním Hlasem
            </span>
            <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/75 md:text-[10px]">
              Fakta proti dezinformacím
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-4">


            <Link
              to="/podporte-nas"
              className="hidden rounded-full bg-white px-6 py-2 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 hover:bg-white/90 lg:inline-flex"
            >
              Podpořte nás
            </Link>






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
        <div className="mx-auto flex max-w-[88rem] items-stretch gap-7 px-4 md:px-6">
          <nav className="flex flex-1 items-stretch gap-7">



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
                            {...(c.search ? { search: c.search } : {})}
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

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (!q.trim()) return;
              void navigate({ to: "/hledat", search: { q } });
            }}
            className="my-auto flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 transition-colors focus-within:border-primary"
          >
            <Search className="size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat články"
              aria-label="Hledat články"
              className="w-40 bg-transparent text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:w-56"
            />
          </form>


          <div className="my-auto flex shrink-0 items-center gap-2">
            <a
              href="https://www.facebook.com/JednimHlasem"
              target="_blank"
              rel="noreferrer"
              aria-label="JednímHlasem na Facebooku"
              title="JednímHlasem na Facebooku"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/JednimHlasem"
              target="_blank"
              rel="noreferrer"
              aria-label="JednímHlasem na Instagramu"
              title="JednímHlasem na Instagramu"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href="https://x.com/JednimHlasem"
              target="_blank"
              rel="noreferrer"
              aria-label="JednímHlasem na X"
              title="JednímHlasem na X"
              className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
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
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat články"
              aria-label="Hledat články"
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
                          {...(c.search ? { search: c.search } : {})}
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
