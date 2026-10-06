import { Link, useNavigate } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { Tag } from "@/components/tag";
import {
  AKTUALNE,
  BIG_MENU_COLUMNS,
  MOBILE_ROWS,
  NAV_GROUPS,
  NAV_PLAIN,
  PRIVACY_LINK,
  SOCIAL_LINKS,
  type NavGroup,
  type NavItem,
} from "@/lib/nav";
import type { SearchResult } from "@/lib/search";

function loadSearch() {
  return import("@/lib/search");
}

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

function SearchHits({
  results,
  query,
  onPick,
  className,
}: {
  results: SearchResult[];
  query: string;
  onPick: (to: string) => void;
  className?: string;
}) {
  if (query.trim().length < 2) return null;
  const shown = results.slice(0, 8);
  return (
    <ul role="listbox" className={className}>
      {shown.length === 0 ? (
        <li className="px-3 py-2.5 text-sm text-muted-foreground">Nic se nenašlo.</li>
      ) : (
        shown.map((r, i) => (
          <li key={`${r.kind}-${r.title}-${i}`}>
            <button
              type="button"
              role="option"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(r.to)}
              className="block w-full px-3 py-2 text-left hover:bg-accent-soft"
            >
              <span className="block text-sm font-semibold leading-snug text-foreground">
                {r.title}
              </span>
              <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {r.kind}
              </span>
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

const SOCIAL_ICONS = { facebook: FacebookIcon, instagram: InstagramIcon, x: XIcon } as const;

/** Odkaz z datového souboru nav.ts: interní přes Link, externí jako <a> do nového okna. */
function NavAnchor({
  item,
  className,
  onNavigate,
  children,
  ...rest
}: {
  item: NavItem;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
  "data-nav-item"?: string;
}) {
  if ("href" in item) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onNavigate}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={item.to}
      search={(item.search ?? {}) as never}
      className={className}
      onClick={onNavigate}
      {...rest}
    >
      {children}
    </Link>
  );
}

function ItemLabel({ item }: { item: NavItem }) {
  return (
    <>
      {item.label}
      {item.badge ? <Tag className="tag--sm ml-2 align-middle">{item.badge}</Tag> : null}
    </>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((l) => {
        const Icon = SOCIAL_ICONS[l.id];
        return (
          <a
            key={l.id}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            title={l.label}
            className="hdr-social social-link"
          >
            <Icon className="size-[1.125rem]" />
          </a>
        );
      })}
    </div>
  );
}

/** Desktop: odkazy s rozbalovací nabídkou (hover, klepnutí, klávesnice). */
function DesktopNav({ onNavigate }: { onNavigate: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const close = () => {
    setOpenId(null);
    setPinned(false);
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const itemsOf = (li: HTMLElement) =>
    Array.from(li.querySelectorAll<HTMLElement>("[data-nav-item]"));

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>, g: NavGroup) => {
    const li = e.currentTarget;
    const isOpen = openId === g.id;
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      close();
      li.querySelector<HTMLElement>("button")?.focus();
      return;
    }
    if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setOpenId(g.id);
      setPinned(true);
      requestAnimationFrame(() => itemsOf(li)[0]?.focus());
      return;
    }
    if (!isOpen) return;
    const items = itemsOf(li);
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[idx + 1 < items.length ? idx + 1 : 0]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[idx > 0 ? idx - 1 : items.length - 1]?.focus();
    } else if (e.key === "Home" && idx >= 0) {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End" && idx >= 0) {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  return (
    <nav ref={navRef} aria-label="Hlavní navigace" className="hidden min-w-0 md:block">
      <ul className="flex items-center gap-1">
        {NAV_GROUPS.map((g) => {
          const isOpen = openId === g.id;
          const panelId = `hdr-dd-${g.id}`;
          return (
            <li
              key={g.id}
              className="relative"
              onMouseEnter={() => {
                setOpenId(g.id);
                setPinned(false);
              }}
              onMouseLeave={() => {
                if (!pinned) setOpenId(null);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
              }}
              onKeyDown={(e) => onKeyDown(e, g)}
            >
              <button
                type="button"
                className="hdr-pill"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => {
                  if (isOpen && pinned) close();
                  else {
                    setOpenId(g.id);
                    setPinned(true);
                  }
                }}
              >
                {g.label}
                <ChevronDown className="hdr-chevron size-4" aria-hidden />
              </button>
              {isOpen ? (
                <div className="hdr-dd-wrap">
                  <ul id={panelId} className="hdr-panel hdr-dd" aria-label={g.label}>
                    {g.items.map((item) => (
                      <li key={item.label}>
                        <NavAnchor
                          item={item}
                          data-nav-item=""
                          className="hdr-dd-link"
                          onNavigate={() => {
                            close();
                            onNavigate();
                          }}
                        >
                          <ItemLabel item={item} />
                        </NavAnchor>
                      </li>
                    ))}
                    {g.all ? (
                      <li className="hdr-dd-all">
                        <NavAnchor
                          item={g.all}
                          data-nav-item=""
                          className="hdr-dd-link hdr-dd-link--all"
                          onNavigate={() => {
                            close();
                            onNavigate();
                          }}
                        >
                          {g.all.label} <span aria-hidden="true">→</span>
                        </NavAnchor>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
        {NAV_PLAIN.map((item) => (
          <li key={item.label}>
            <NavAnchor item={item} className="hdr-pill" onNavigate={onNavigate}>
              {item.label}
            </NavAnchor>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Velké menu pod pruhem (desktop). */
function BigMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div id="hdr-bigmenu" className="hdr-big hidden md:block">
      <div className="mx-auto max-w-[88rem] px-6 pb-6 pt-8">
        <nav aria-label="Menu" className="hdr-big-grid">
          {BIG_MENU_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="hdr-big-heading">{col.heading}</p>
              <ul className="mt-3 flex flex-col">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <NavAnchor item={item} className="hdr-big-link" onNavigate={onNavigate}>
                      <ItemLabel item={item} />
                    </NavAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <aside className="hdr-aktualne" aria-label={AKTUALNE.kicker}>
            <p className="hdr-big-heading">{AKTUALNE.kicker}</p>
            <p className="mt-3 font-display text-lg font-bold leading-snug text-navy-900">
              {AKTUALNE.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{AKTUALNE.text}</p>
            <NavAnchor
              item={AKTUALNE.link}
              className="hdr-big-link hdr-big-link--cta"
              onNavigate={onNavigate}
            >
              {AKTUALNE.link.label} <span aria-hidden="true">→</span>
            </NavAnchor>
          </aside>
        </nav>
        <div className="hdr-big-foot">
          <SocialLinks className="flex items-center gap-2" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jedním hlasem <span aria-hidden="true">·</span>{" "}
            <NavAnchor
              item={PRIVACY_LINK}
              className="underline-offset-2 hover:underline"
              onNavigate={onNavigate}
            >
              {PRIVACY_LINK.label}
            </NavAnchor>
          </p>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [acc, setAcc] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");
  const [panel, setPanel] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const deskInput = useRef<HTMLInputElement>(null);

  const showPanel = panel && q.trim().length >= 2;

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setResults([]);
      return;
    }
    let alive = true;
    void loadSearch().then(({ searchSite }) => {
      if (alive) setResults(searchSite(query));
    });
    return () => {
      alive = false;
    };
  }, [q]);

  useEffect(() => {
    if (searchOpen) deskInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (headerRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
      setSearchOpen(false);
      setPanel(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPanel(false);
      setSearchOpen((was) => {
        if (was) searchBtnRef.current?.focus();
        return false;
      });
      setMenuOpen((was) => {
        if (was) menuBtnRef.current?.focus();
        return false;
      });
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setPanel(false);
  };

  const goTo = (to: string) => {
    setQ("");
    closeAll();
    const hashIndex = to.indexOf("#");
    const hash = hashIndex >= 0 ? to.slice(hashIndex + 1) : undefined;
    const path = hashIndex >= 0 ? to.slice(0, hashIndex) : to;
    const article = path.match(/^\/clanky\/([^/?#]+)$/);
    if (article) {
      void navigate({ to: "/clanky/$slug", params: { slug: article[1] } });
      return;
    }
    void navigate({ to: path as "/", hash });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim().length < 2) return;
    if (results[0]) {
      goTo(results[0].to);
      return;
    }
    void loadSearch().then(({ searchSite }) => {
      const first = searchSite(q)[0];
      if (first) goTo(first.to);
    });
  };

  const searchField = (inputRef?: React.Ref<HTMLInputElement>) => (
    <form role="search" onSubmit={onSubmit} className="hdr-search">
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPanel(true);
        }}
        onFocus={() => {
          setPanel(true);
          void loadSearch();
        }}
        placeholder="Hledat články"
        aria-label="Hledat články"
        autoComplete="off"
        className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm"
      />
    </form>
  );

  const hits = showPanel ? (
    <SearchHits results={results} query={q} onPick={goTo} className="hdr-hits" />
  ) : null;

  return (
    <header ref={headerRef} className="site-header-sticky sticky top-0 z-[60]">
      <div className="hdr-bar">
        <div className="mx-auto flex h-full max-w-[88rem] items-center gap-3 px-4 md:gap-4 md:px-6">
          <Link to="/" className="hdr-brand" aria-label="Jedním hlasem — domů" onClick={closeAll}>
            <img
              src="/images/logo-bublina.png"
              alt=""
              width={280}
              height={218}
              className="h-11 w-auto md:hidden"
            />
            <img
              src="/images/logo-bublina-radek.png"
              alt=""
              width={4231}
              height={1103}
              className="hidden h-10 w-auto md:block"
            />
            <span aria-hidden="true" className="hdr-brand-text hidden lg:inline">
              Pro Izrael
            </span>
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <DesktopNav onNavigate={closeAll} />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-2">
            <div className="relative hidden md:block">
              <button
                ref={searchBtnRef}
                type="button"
                aria-label="Hledat"
                aria-expanded={searchOpen}
                aria-controls="hdr-search-panel"
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen((v) => !v);
                }}
                className="hdr-round"
              >
                <Search className="size-5" aria-hidden />
              </button>
              {searchOpen ? (
                <div id="hdr-search-panel" className="hdr-panel hdr-search-pop">
                  {searchField(deskInput)}
                  {hits}
                </div>
              ) : null}
            </div>
            <Link to="/podporte-nas" className="hdr-donate" onClick={closeAll}>
              Podpořte nás
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "hdr-bigmenu hdr-mobilemenu" : undefined}
              aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen((v) => !v);
              }}
              className="hdr-menu-btn"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
              <span className="hdr-menu-btn-label hidden lg:inline" aria-hidden="true">
                {menuOpen ? "Zavřít" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? <BigMenu onNavigate={closeAll} /> : null}

      {menuOpen ? (
        <div id="hdr-mobilemenu" className="hdr-mobile md:hidden">
          <div className="px-5 pb-8 pt-4">
            {searchField()}
            {hits}
            <nav aria-label="Mobilní menu" className="mt-2">
              {NAV_GROUPS.filter((g) => g.items.length > 0).map((g) => {
                const isOpen = Boolean(acc[g.id]);
                const listId = `hdr-acc-${g.id}`;
                return (
                  <div key={g.id} className="hdr-acc">
                    <button
                      type="button"
                      className="hdr-acc-btn"
                      aria-expanded={isOpen}
                      aria-controls={listId}
                      onClick={() => setAcc((v) => ({ ...v, [g.id]: !v[g.id] }))}
                    >
                      {g.label}
                      <ChevronDown className="hdr-chevron size-5" aria-hidden />
                    </button>
                    {isOpen ? (
                      <ul id={listId} className="pb-2">
                        {[
                          ...g.items,
                          ...(g.all ? [{ ...g.all, label: `${g.all.label} →` }] : []),
                        ].map((item) => (
                          <li key={item.label}>
                            <NavAnchor
                              item={item}
                              className="hdr-m-link hdr-m-link--sub"
                              onNavigate={closeAll}
                            >
                              <ItemLabel item={item} />
                            </NavAnchor>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
              {MOBILE_ROWS.map((item) => (
                <NavAnchor
                  key={item.label}
                  item={item}
                  className="hdr-m-link hdr-m-link--row"
                  onNavigate={closeAll}
                >
                  <ItemLabel item={item} />
                </NavAnchor>
              ))}
            </nav>
            <SocialLinks className="mt-5 flex items-center gap-3" />
            <p className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Jedním hlasem <span aria-hidden="true">·</span>{" "}
              <NavAnchor item={PRIVACY_LINK} className="hdr-privacy" onNavigate={closeAll}>
                {PRIVACY_LINK.label}
              </NavAnchor>
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
