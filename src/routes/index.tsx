import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useState } from "react";
import { ArrowRight, Flag, HelpCircle } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS } from "@/lib/content";
import heroImg from "@/assets/hero-blindfold.jpg";
import flagsImg from "@/assets/news-flags.jpg";
import mediaImg from "@/assets/news-media.jpg";
import politicsImg from "@/assets/news-politics.jpg";
import algorithmImg from "@/assets/featured-algorithm.jpg";
import innovationImg from "@/assets/featured-innovation.jpg";
import slogansImg from "@/assets/featured-slogans.jpg";
import katarImg from "@/assets/sel-katar.jpg";
import rudozelenaImg from "@/assets/sel-rudozelena.jpg";
import selMediaImg from "@/assets/sel-media.jpg";








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

type HeroTopic = {
  name: string;
  kicker: string;
  perex: string;
  image: string;
  cta: string;
  to: string;
};

const HERO_TOPICS: HeroTopic[] = [
  {
    name: "Antisemitismus",
    kicker: "Klíčové téma",
    perex: "Nová podoba starých předsudků — jak ji poznat, pojmenovat a věcně vyvracet. Sledujeme případy, kontext i data.",
    image: heroImg,
    cta: "Otevřít téma",
    to: "/antisemitismus",
  },
  {
    name: "Malý stát",
    kicker: "Identita",
    perex: "Izrael přináší světu víc, než by odpovídalo jeho velikosti — od technologií po medicínu.",
    image: innovationImg,
    cta: "Číst článek",
    to: "/clanky",
  },
  {
    name: "Jeden klik",
    kicker: "Algoritmy",
    perex: "Diskuze a komentáře na sociálních sítích ovlivňují naši realitu víc, než si myslíme.",
    image: algorithmImg,
    cta: "Číst článek",
    to: "/clanky",
  },
  {
    name: "Celý obraz",
    kicker: "Manifest",
    perex: "Do debaty o Izraeli vracíme fakta, kontext a klidný tón. Bez ořezu a bez křiku.",
    image: flagsImg,
    cta: "Číst manifest",
    to: "/manifest",
  },
  {
    name: "Rudo-zelená aliance",
    kicker: "Ideologie",
    perex: "Nečekané spojenectví extrémní levice a islamismu — a proč ohrožuje západní hodnoty.",
    image: rudozelenaImg,
    cta: "Číst článek",
    to: "/clanky",
  },
  {
    name: "Média ve službách teroru",
    kicker: "Média",
    perex: "Jak se zpravodajství stává nástrojem propagandy a co s tím můžeme dělat jako čtenáři.",
    image: selMediaImg,
    cta: "Číst článek",
    to: "/clanky",
  },
  {
    name: "Katar",
    kicker: "Vliv",
    perex: "Peníze z Kataru mění univerzity, politiky i veřejné mínění. Sledujeme, kam tečou.",
    image: katarImg,
    cta: "Číst článek",
    to: "/clanky",
  },
  {
    name: "Mír začíná s pravdou",
    kicker: "Perspektiva",
    perex: "Přestaňme podléhat prázdným heslům a hledejme skutečné řešení — mír začíná s pravdou.",
    image: slogansImg,
    cta: "Číst článek",
    to: "/clanky",
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const topic = HERO_TOPICS[active] ?? HERO_TOPICS[0]!;

  return (
    <section className="bg-[#0b1a3a]">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-4 px-5 py-6 md:px-6 md:py-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6">
        {/* Velká plocha — aktivní téma */}
        <div className="relative isolate overflow-hidden rounded-2xl">
          <img
            src={topic.image}
            alt={topic.name}
            width={1280}
            height={720}
            className="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#0b1a3a]/90 via-[#0b1a3a]/45 to-[#0b1a3a]/15"
          />
          <div className="relative flex min-h-[20rem] flex-col justify-end p-6 md:min-h-[26rem] md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
              {topic.kicker}
            </p>
            <h1
              key={topic.name}
              className="animate-rise mt-3 text-balance font-display text-3xl font-bold text-white md:text-[2.5rem] md:leading-[1.1]"
            >
              {topic.name}
            </h1>
            <p
              key={topic.perex}
              className="animate-rise mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/85 md:text-base"
            >
              {topic.perex}
            </p>
            <Link
              to={topic.to}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
            >
              {topic.cta} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Mřížka 8 dlaždic */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
          {HERO_TOPICS.map((t, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(idx)}
                aria-pressed={isActive}
                className={`flex min-h-[5.5rem] items-start rounded-xl border p-4 text-left transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-white/15 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <span className="text-sm font-semibold leading-snug">{t.name}</span>
              </button>
            );
          })}
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
  const isAll = active === ARTICLE_SECTIONS.length;
  const group = ARTICLE_SECTIONS[active] ?? ARTICLE_SECTIONS[0]!;
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
            {[...ARTICLE_SECTIONS, ALL_TAB].map((g, idx) => (
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
            search={group.label === "Nové" ? {} : { tag: group.label }}
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
              to="/clanky"
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

        {/* Sekce článků — záložky ve stylu Visegrad24 */}
        <ArticleTabs />








      </main>
      <SiteFooter />
    </div>
  );
}
