import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Flag, HelpCircle, Users } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FEATURED, FEED, HERO_SLIDES, TOPICS } from "@/lib/content";
import heroImg from "@/assets/hero-blindfold.jpg";
import flagsImg from "@/assets/news-flags.jpg";
import mediaImg from "@/assets/news-media.jpg";
import politicsImg from "@/assets/news-politics.jpg";
import featuredAlgorithmImg from "@/assets/featured-algorithm.jpg";
import featuredInnovationImg from "@/assets/featured-innovation.jpg";
import featuredSlogansImg from "@/assets/featured-slogans.jpg";




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
  kicker: "JednímHlasem",
  title: "Do debaty o Izraeli vracíme fakta, kontext a klidný tón.",
  text: "Píšeme analýzy, ověřujeme tvrzení a pomáháme lidem reagovat tam, kde se rozhoduje o veřejném mínění — v komentářích, v médiích i ve školách.",
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
            to="/manifest"
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/85 hover:text-white"
          >
            Číst celý manifest <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-label="Předchozí"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-105 md:grid md:left-5"
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Další"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-105 md:grid md:right-5"
      >
        <ChevronRight className="size-4" />
      </button>

      <div className="relative flex items-center justify-center gap-3 pb-6">
        <button
          type="button"
          aria-label="Předchozí"
          onClick={() => go(-1)}
          className="grid size-8 place-items-center rounded-full bg-primary text-white shadow-md md:hidden"
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
          className="grid size-8 place-items-center rounded-full bg-primary text-white shadow-md md:hidden"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

    </section>
  );
}


function StarOfDavidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
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
    icon: StarOfDavidIcon,
    title: "Antisemitismus 2.0",
    text: "Co je nový antisemitismus a jak ho poznat.",
    tone: "bg-primary",
    to: "/temata",
  },
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
  {
    icon: Users,
    title: "Zapojte se",
    text: "Přidejte se k nám a staňte se součástí řešení.",
    tone: "bg-primary",
    to: "/zapojte-se",
  },
];



const FEATURED_IMAGES: Record<string, string> = {
  sand: featuredAlgorithmImg,
  flag: featuredInnovationImg,
  red: featuredSlogansImg,
};



function ArticleCard({
  image,
  tag,
  date,
  title,
  perex,
}: {
  image: string;
  tag: string;
  date: string;
  title: string;
  perex: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={1280}
        height={720}
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
            {tag}
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
            {date}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-primary">
          <Link to="/clanky" className="group-hover:underline">
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{perex}</p>
        <Link
          to="/clanky"
          className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:underline"
        >
          Číst dál <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
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
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70">{kicker}</p>
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

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* intro nad hero */}
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-[88rem] px-5 py-12 md:px-6 md:py-16">
            <h1 className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-balance text-foreground md:text-5xl">
              Do debaty o Izraeli vracíme fakta,{" "}
              <span className="text-primary">kontext a klidný tón.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base text-muted-foreground md:text-lg">
              Píšeme analýzy, ověřujeme tvrzení a pomáháme lidem reagovat tam, kde se
              rozhoduje o veřejném mínění — v komentářích, v médiích i ve školách.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/clanky"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Začněte číst <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/zapojte-se"
                className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Zapojte se
              </Link>
            </div>
          </div>
        </section>

        <Hero />












        {/* rychlé akce */}
        <section className="mx-auto max-w-[88rem] px-5 py-14 md:px-6 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


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

        {/* zvýrazněné karty */}
        <section className="border-y border-primary/15 bg-primary/[0.06]">
          <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-6 md:py-16">
            <SectionHeader
              kicker="Výběr redakce"
              title="Doporučujeme"
              subtitle="Začněte tady"
              to="/clanky"
            />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {FEATURED.map((f) => (
                <ArticleCard
                  key={f.title}
                  image={FEATURED_IMAGES[f.tone] ?? featuredAlgorithmImg}
                  tag={f.tag}
                  date={f.date}
                  title={f.title.replace("\n", " ")}
                  perex={f.text}
                />
              ))}
            </div>
          </div>
        </section>

        {/* rubriky s výpisy článků */}
        {FEED.map((group, gi) => (
          <section
            key={group.id}
            className={
              gi % 2 === 1
                ? "border-y border-border bg-secondary/50"
                : "bg-background"
            }
          >
            <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-6 md:py-16">
              <SectionHeader kicker="Rubrika" title={group.label} to="/clanky" />

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.slice(0, 3).map((item, idx) => (
                  <ArticleCard
                    key={`${group.id}-${item.slug}-${idx}`}
                    image={IMAGES[item.image]}
                    tag={item.tag}
                    date={item.date}
                    title={item.title}
                    perex={item.perex}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* vybrané texty – mřížka */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-[88rem] px-5 py-10 md:px-6">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Vybrané texty
              </h2>
              <Link
                to="/clanky"
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
              >
                Všechny články →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TOPICS.slice(0, 3).map((t, idx) => (
                <ArticleCard
                  key={t.slug}
                  image={[mediaImg, politicsImg, flagsImg][idx % 3]!}
                  tag={t.kicker}
                  date="Vybrané"
                  title={t.title}
                  perex={t.perex}
                />
              ))}
            </div>
          </div>
        </section>




      </main>
      <SiteFooter />
    </div>
  );
}
