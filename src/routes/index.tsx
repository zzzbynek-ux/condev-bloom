import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, HERO_BANNER } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JednímHlasem — fakta a kontext do debaty o Izraeli" },
      {
        name: "description",
        content:
          "Ověřená fakta, analýzy a české příběhy. Komunita, která do debaty o Izraeli a antisemitismu vrací kontext a klidný tón.",
      },
      { property: "og:title", content: "JednímHlasem — fakta a kontext do debaty o Izraeli" },
      {
        property: "og:description",
        content: "Ověřená fakta, analýzy a české příběhy. Zapojte se jedním hlasem.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const [i, setI] = useState(0);
  const total = HERO_BANNER.length;
  const go = (d: number) => setI((v) => (v + d + total) % total);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total, i]);

  const slide = HERO_BANNER[i] ?? HERO_BANNER[0]!;

  return (
    <section className="hero-section relative isolate overflow-hidden bg-[#0b1a3a]">
      <img
        src={slide.image}
        alt=""
        width={1600}
        height={900}
        className="hero-img pointer-events-none absolute inset-0 size-full object-cover"
        style={{ ["--hero-focus" as string]: slide.focus, objectPosition: slide.focus }}
      />
      <div
        aria-hidden
        className="hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/55 via-[#0b1a3a]/15 to-transparent"
      />

      <div className="hero-grid pointer-events-none relative z-10 mx-auto flex h-full max-w-[88rem] items-center justify-start px-5 py-6 md:px-16">
        <div className="hero-card pointer-events-auto w-full max-w-xl rounded-2xl bg-[#0a1730]/75 p-4 backdrop-blur-md md:p-5 lg:max-w-2xl lg:px-8 lg:py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {slide.kicker}
          </p>
          {i === 0 ? (
            <h1 key={slide.title} className="animate-rise mt-1.5 text-balance font-display text-2xl font-bold text-white md:text-[1.85rem] md:leading-[1.15]">
              {slide.title}
            </h1>
          ) : (
            <p key={slide.title} className="animate-rise mt-1.5 text-balance font-display text-2xl font-bold text-white md:text-[1.85rem] md:leading-[1.15]">
              {slide.title}
            </p>
          )}
          <p
            key={slide.text}
            className="animate-rise mt-2 hidden text-pretty text-sm leading-snug text-white/85 lg:line-clamp-2 lg:block"
          >
            {slide.text}
          </p>

          {i === 0 ? (
            <Link
              to="/manifest"
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/85 hover:text-white"
            >
              Číst celý manifest <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link
              to="/clanky/$slug"
              params={{ slug: slide.slug }}
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/85 hover:text-white"
            >
              Číst článek <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="hero-nav pointer-events-none absolute inset-0 z-40">
        <div className="hero-dots pointer-events-auto absolute inset-x-0 bottom-3 z-40 flex items-center justify-center">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Předchozí"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
              className="hero-nav-btn pointer-events-auto relative z-40 grid size-9 place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] transition-opacity hover:opacity-70"
            >
              <ChevronLeft className="pointer-events-none size-6" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-1.5 px-1">
              {HERO_BANNER.map((s, idx) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Zobrazit: ${s.title}`}
                  aria-current={idx === i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setI(idx);
                  }}
                  className="relative z-40 grid size-6 place-items-center"
                >
                  <span
                    className={`block rounded-full transition-all ${
                      idx === i ? "size-2 bg-white" : "size-1.5 bg-white/55 hover:bg-white/80"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Další"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
              className="hero-nav-btn pointer-events-auto relative z-40 grid size-9 place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] transition-opacity hover:opacity-70"
            >
              <ChevronRight className="pointer-events-none size-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



function StarOfDavid({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5 21 18H3L12 2.5Z" />
      <path d="M12 21.5 3 6h18l-9 15.5Z" />
    </svg>
  );
}












function SectionHeader({
  kicker,
  title,
  subtitle,
  to,
  linkLabel = "Zobrazit vše",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="border-t-2 border-primary pt-4">
      {kicker ? <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70">{kicker}</p> : null}
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">
            {title}
          </h2>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        {to ? (
          <Link
            to={to}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
          >
            {linkLabel} <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

const SECTION_LINKS = [
  { id: "nove", label: "Nové" },
  { id: "doporucujeme", label: "Doporučujeme" },
  { id: "cesi-a-izrael", label: "Češi a Izrael" },
  { id: "studie", label: "Studie a analýzy" },
  { id: "vse", label: "Všechny texty" },
] as const;

function ArticleTabs() {
  const [active, setActive] = useState<(typeof SECTION_LINKS)[number]["id"]>("nove");
  const sections = ARTICLE_SECTIONS.filter((g) => g.id !== "tydyt");
  const group = sections.find((g) => g.id === active) ?? sections[0]!;
  const items = group.items.slice(0, 6);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-6 md:py-16">
        <div className="border-t-2 border-primary pt-4" />
        <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">
          Články
        </h2>

        <nav
          aria-label="Rubriky článků"
          className="clanky-tabs mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 pb-3"
        >
          {SECTION_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => setActive(link.id)}
              aria-selected={active === link.id}
              aria-current={active === link.id}
              className={`text-base font-semibold normal-case transition-colors ${
                active === link.id ? "border-b-2 border-[#0038B8] text-[#0038B8]" : "text-[#0038B8] hover:text-[#0038B8]/70"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <ArticleCard
              key={`${group.id}-${item.slug}-${idx}`}
              image={item.image}
              tag={item.tag}
              date={item.date}
              title={item.title}
              perex={item.perex}
              slug={item.slug}
            />
          ))}
        </div>

        <MoreButton
          label={MORE_LABELS[group.label] ?? `Další texty z rubriky ${group.label}`}
          search={{ filtr: group.id }}
        />
      </div>
    </section>
  );
}

const MORE_LABELS: Record<string, string> = {
  "Nové": "Další nové texty",
  "Doporučujeme": "Další z výběru redakce",
  "Češi a Izrael": "Další texty Česko a Izrael",
  "Studie a analýzy": "Další studie a analýzy",
  "Tydýt týdne": "Další tydýty",
};

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        {/* Zvýrazněné téma: Antisemitismus */}
        <section className="bg-primary text-primary-foreground">
          <div className="tema-strip mx-auto flex max-w-[88rem] flex-col items-start gap-6 px-4 py-8 md:h-[135px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0">
            <div className="flex items-start gap-4 md:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/25">
                <StarOfDavid className="h-6 w-6" />
              </span>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                  Klíčové téma
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                  Antisemitismus
                </h2>
                <p className="tema-perex mt-2 text-sm leading-relaxed text-primary-foreground/85 md:text-base">
                  Nová podoba starých předsudků — jak ji poznat, pojmenovat a věcně vyvracet.
                  Sledujeme případy, kontext i data.
                </p>
              </div>
            </div>
            <div className="tema-buttons flex flex-wrap items-center gap-3">
              <Link
                to="/antisemitismus"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
              >
                Číst k tématu
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ptejte-se-ai"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
              >
                Ptejte se AI
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/nahlasit-incident"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-destructive px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Nahlásit incident
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>











        {/* Výběr redakce */}
        <section className="vyber-section bg-background">
          <div className="mx-auto max-w-[88rem] px-5 py-8 md:px-6 md:py-10 lg:pt-4">
            <div className="border-t-2 border-primary pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">Výběr redakce</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/ptejte-se-ai"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                  >
                    Ptejte se AI <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/clanky"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                  >
                    Všechny texty <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="vyber-grid mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(ARTICLE_SECTIONS.find((g) => g.id === "doporucujeme")?.items ?? []).slice(0, 3).map((item) => (
                <ArticleCard
                  key={item.slug}
                  image={item.image}
                  tag={item.tag}
                  date={item.date}
                  title={item.title}
                  perex={item.perex}
                  slug={item.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tydýt týdne + Dokumentujeme */}
        <section className="bg-background">
          <div className="mx-auto max-w-[88rem] px-5 pb-14 md:px-6 md:pb-16">
            <div className="border-t-2 border-primary pt-4" />

            <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-stretch">
              {/* Tydýt */}
              <div className="flex flex-col">
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">Tydýt týdne</h2>
                <article className="group mt-3 flex flex-1 flex-row gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <img
                    src="/images/tydyt-konrad.jpg"
                    alt="Tydýt týdne — Konrad Stavridis"
                    loading="lazy"
                    className="hidden shrink-0 object-cover sm:block sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px]"
                  />
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <Link
                          to="/clanky"
                          search={{ filtr: "tydyt" }}
                          className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground hover:opacity-85"
                        >
                          Tydýt
                        </Link>
                        <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                          02/09/26
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold leading-snug text-primary">
                        <Link to="/clanky" search={{ filtr: "tydyt" }} className="group-hover:underline">
                          Konrad Stavridis
                        </Link>
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        Tento týden vysvětluje, proč se o Izraeli mluví jinak než o jiných státech. Krátký, věcný pohled na jedno téma.
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        to="/clanky"
                        search={{ filtr: "tydyt" }}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:underline"
                      >
                        Číst celý tydýt <ArrowRight className="size-4" />
                      </Link>
                      <Link
                        to="/clanky"
                        search={{ filtr: "tydyt" }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                      >
                        Archiv tydýtů <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              {/* Dokumentujeme */}
              <div className="flex flex-col">
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">Dokumentujeme</h2>
                <article className="documentujeme-card mt-3 flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="documentujeme-inner flex flex-1 flex-col justify-between p-4 md:p-3">
                    <div className="documentujeme-entries flex flex-col gap-4">
                      {[
                        {
                          tag: "Incident",
                          date: "28/08/26",
                          text: "Poškozená výloha židovské restaurace v Praze — případ dokumentován a předán k ověření.",
                          destructive: true,
                        },
                        {
                          tag: "Výkřik",
                          date: "21/08/26",
                          text: "Poslanec v debatě zopakoval vyvrácené tvrzení o „genocidě“ bez jakéhokoliv kontextu.",
                          destructive: false,
                        },
                        {
                          tag: "Incident",
                          date: "14/08/26",
                          text: "Nenávistné komentáře pod profilem české židovské obce na sociální síti — hlášení evidováno.",
                          destructive: true,
                        },
                      ].map((d) => (
                        <div
                          key={d.text}
                          className="documentujeme-entry flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white ${
                                d.destructive ? "bg-destructive" : "bg-primary"
                              }`}
                            >
                              {d.tag}
                            </span>
                            <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                              {d.date}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="documentujeme-footer mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          to="/nahlasit-incident"
                          hash="archiv"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                        >
                          Archiv incidentů <ArrowRight className="size-4" />
                        </Link>
                        <Link
                          to="/vykriky"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                        >
                          Výkřiky <ArrowRight className="size-4" />
                        </Link>
                      </div>
                      <Link
                        to="/nahlasit-incident"
                        className="inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Nahlásit incident
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Sekce článků — záložky ve stylu Visegrad24 */}
        <ArticleTabs />







      </main>
      <SiteFooter />
    </div>
  );
}
