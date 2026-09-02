import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Flag, HelpCircle } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, HERO_SLIDES } from "@/lib/content";
import heroImg from "@/assets/hero-blindfold.jpg";
import tydytPortrait from "@/assets/tydyt-portrait.jpg";
import flagsImg from "@/assets/news-flags.jpg";
import mediaImg from "@/assets/news-media.jpg";
import politicsImg from "@/assets/news-politics.jpg";




const IMAGES = { flags: flagsImg, media: mediaImg, politics: politicsImg };

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

const CLAIM_SLIDE = {
  kicker: "Jedním hlasem",
  title: "Do debaty o Izraeli vracíme fakta, kontext a klidný tón.",
  text: "Píšeme analýzy, ověřujeme tvrzení a pomáháme lidem reagovat tam, kde se rozhoduje o veřejném mínění.",
};

const HERO = [CLAIM_SLIDE, ...HERO_SLIDES];

function Hero() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + HERO.length) % HERO.length);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO.length), 8000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO[i] ?? HERO[0]!;

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1a3a]">
      <img
        src={heroImg}
        alt=""
        width={1600}
        height={900}
        className="absolute inset-0 size-full object-cover object-left opacity-90"
      />
      <div aria-hidden className="absolute inset-0 bg-linear-to-r from-[#0b1a3a]/40 via-[#0b1a3a]/40 to-[#0b1a3a]/80" />

      <div className="relative mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-6 px-5 py-10 md:grid-cols-2 md:px-16 md:py-20">
        <div className="hidden md:block" />
        <div className="flex flex-col justify-center rounded-2xl bg-[#0a1730]/85 p-6 backdrop-blur-sm md:min-h-[22rem] md:p-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {slide.kicker}
          </p>
          {i === 0 ? (
            <h1 key={slide.title} className="animate-rise mt-3 text-balance font-display text-3xl font-bold text-white md:text-[2.75rem] md:leading-[1.1]">
              {slide.title}
            </h1>
          ) : (
            <p key={slide.title} className="animate-rise mt-3 text-balance font-display text-3xl font-bold text-white md:text-[2.75rem] md:leading-[1.1]">
              {slide.title}
            </p>
          )}
          <p
            key={slide.text}
            className="animate-rise mt-4 text-pretty text-sm leading-relaxed text-white/85 md:text-[17px]"
          >
            {slide.text}
          </p>

          <Link
            to={i === 0 ? "/manifest" : "/clanky"}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/85 hover:text-white"
          >
            {i === 0 ? "Číst celý manifest" : "Číst článek"} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-label="Předchozí"
        onClick={() => go(-1)}
        className="absolute left-5 top-[58%] hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:grid"
      >
        <ChevronLeft className="size-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="Další"
        onClick={() => go(1)}
        className="absolute right-5 top-[58%] hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:grid"
      >
        <ChevronRight className="size-4" strokeWidth={1.75} />
      </button>


      <div className="relative flex items-center justify-center gap-3 pb-6">
        <button
          type="button"
          aria-label="Předchozí"
          onClick={() => go(-1)}
          className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:hidden"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          {HERO.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Zobrazit: ${s.title}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`size-2.5 rounded-full transition-all ${
                idx === i ? "scale-125 bg-primary" : "bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Další"
          onClick={() => go(1)}
          className="grid size-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:hidden"
        >
          <ChevronRight className="size-4" />
        </button>
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

const ACTIONS: {
  icon?: React.ComponentType<{ className?: string }>;

  image?: string;
  title: string;
  text: string;
  tone: string;
  to: string;
}[] = [
  {
    icon: HelpCircle,
    title: "Ptejte se AI",
    text: "Zeptejte se naší AI na dezinformace a fakta.",
    tone: "bg-primary",

    to: "/ptejte-se-ai",
  },
  {
    icon: Flag,
    title: "Nahlásit incident",
    text: "Pomozte nám monitorovat a reagovat.",
    tone: "bg-destructive",
    to: "/nahlasit-incident",
  },
];











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

const ALL_TAB = { id: "vse", label: "Všechny texty" } as const;

function ArticleTabs() {
  const [active, setActive] = useState(0);
  // Tydýt týdne má na homepage vlastní blok — v záložkách ho nezobrazujeme.
  const sections = ARTICLE_SECTIONS.filter((g) => g.id !== "tydyt");
  const isAll = active === sections.length;
  const group = sections[active] ?? sections[0]!;
  const items = isAll
    ? ARTICLE_SECTIONS.flatMap((g) => g.items.map((item) => ({ ...item, sectionLabel: g.label })))
    : (group.items.map((item) => ({ ...item, sectionLabel: item.tag })) as ({
        slug: string;
        image: "flags" | "media" | "politics";
        tag: string;
        title: string;
        perex: string;
        date?: string;
        sectionLabel: string;
      })[]);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-6 md:py-16">
        {/* Záložky */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border">
          <div
            role="tablist"
            aria-label="Rubriky článků"
            className="flex flex-wrap gap-x-8 gap-y-2"
          >
            {[...sections, ALL_TAB].map((g, idx) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={idx === active}
                onClick={() => setActive(idx)}
                className={`-mb-px border-b-2 pb-3 font-display text-lg font-bold tracking-tight transition-colors md:text-xl ${
                  idx === active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* články aktivní záložky */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(isAll ? items : items.slice(0, 6)).map((item, idx) => (
            <ArticleCard
              key={`${isAll ? "all" : group.id}-${item.slug}-${idx}`}
              image={IMAGES[item.image]}
              tag={item.sectionLabel}
              date={item.date}
              title={item.title}
              perex={item.perex}
            />
          ))}
        </div>

        {/* tlačítko pod mřížkou — další články stejné rubriky */}
        {!isAll && (
          <MoreButton
            label={MORE_LABELS[group.label] ?? `Další texty z rubriky ${group.label}`}
            search={{ filtr: group.id }}
          />
        )}
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
          <div className="mx-auto flex max-w-[88rem] flex-col items-start gap-6 px-4 py-8 md:h-[135px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0">
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
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85 md:text-base">
                  Nová podoba starých předsudků — jak ji poznat, pojmenovat a věcně vyvracet.
                  Sledujeme případy, kontext i data.
                </p>
              </div>
            </div>
            <Link
              to="/antisemitismus"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
            >
              Číst k tématu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>











        {/* rychlé akce */}
        <section className="mx-auto max-w-[88rem] px-5 pb-10 pt-14 md:px-6 md:pb-12 md:pt-16">
          <SectionHeader kicker="Rozcestník" title="Rychlé akce" />
          <div className="mx-auto mt-8 grid max-w-[40rem] justify-center gap-5 sm:grid-cols-2 lg:grid-cols-2">



            {ACTIONS.map((a) => (
              <Link
                key={a.title}
                to={a.to}

                className="flex items-center gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {"image" in a && a.image ? (
                  <img
                    src={a.image}
                    alt=""
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className={`grid size-14 shrink-0 place-items-center rounded-full ${a.tone}`}>
                    {a.icon ? <a.icon className="size-7 text-white" /> : null}
                  </span>
                )}

                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold text-foreground">{a.title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{a.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Výběr redakce */}
        <section className="bg-background">
          <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-6 md:py-16">
            <SectionHeader kicker="Výběr redakce" title="To nejdůležitější" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ArticleCard
                image={IMAGES.flags}
                tag="Výběr redakce"
                date="05/07/26"
                title="Malý stát. Globální přínos."
                perex="Izrael přináší světu víc, než by odpovídalo jeho velikosti — od technologií po medicínu."
              />
              <ArticleCard
                image={IMAGES.media}
                tag="Výběr redakce"
                date="05/07/26"
                title="Změň algoritmus — změníš realitu"
                perex="Diskuze a komentáře na sociálních sítích ovlivňují naši realitu víc, než si myslíme."
              />
              <ArticleCard
                image={IMAGES.politics}
                tag="Výběr redakce"
                date="05/07/26"
                title="Slogany živí emoce, ne mír"
                perex="Přestaňme podléhat prázdným heslům a hledejme skutečné řešení."
              />
            </div>
            <MoreButton label="Všechny texty" search={{}} />
          </div>
        </section>

        {/* Tydýt týdne + Dokumentujeme */}
        <section className="bg-background">
          <div className="mx-auto max-w-[88rem] px-5 pb-14 md:px-6 md:pb-16">
            <div className="border-t-2 border-primary pt-4" />

            <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-stretch">
              {/* Tydýt */}
              <div className="flex flex-col">
                <p className="text-sm font-bold text-primary">Tydýt týdne</p>
                <article className="group mt-3 flex flex-1 flex-row gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <img
                    src={tydytPortrait}
                    alt="Tydýt týdne — Jméno Příjmení"
                    loading="lazy"
                    className="hidden w-2/5 shrink-0 object-cover sm:block"
                  />
                  <div className="flex flex-1 flex-col justify-between p-5">
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
                          Jméno Příjmení
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
                <p className="text-sm font-bold text-primary">Dokumentujeme</p>
                <article className="mt-3 flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="flex flex-col gap-4">
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
                          className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0"
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
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
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
