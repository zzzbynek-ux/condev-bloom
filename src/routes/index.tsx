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

      <div className="relative mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-6 px-12 py-12 md:grid-cols-2 md:px-16 md:py-20">
        <div className="hidden md:block" />
        <div className="rounded-2xl bg-[#0a1730]/85 p-6 backdrop-blur-sm md:p-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {slide.kicker}
          </p>
          {i === 0 ? (
            <h1 key={slide.title} className="animate-rise mt-3 font-display text-3xl font-bold text-white md:text-5xl">
              {slide.title}
            </h1>
          ) : (
            <p key={slide.title} className="animate-rise mt-3 font-display text-3xl font-bold text-white md:text-5xl">
              {slide.title}
            </p>
          )}
          <p
            key={slide.text}
            className="animate-rise mt-4 text-sm leading-relaxed text-white/85 md:text-[17px]"
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
        className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 md:left-5"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Další"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 md:right-5"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="relative flex items-center justify-center gap-2 pb-6">
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
    title: "Antisemitismus",
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



function FeaturedArt({ tone }: { tone: (typeof FEATURED)[number]["tone"] }) {
  if (tone === "flag") {
    return (
      <div className="flex h-36 items-center justify-between gap-4 bg-linear-to-r from-white to-secondary px-6">
        <p className="font-display text-xl font-bold leading-tight text-primary md:text-2xl">
          JednimHlasem
          <br />
          pro Izrael
        </p>
        <svg viewBox="0 0 100 100" aria-hidden className="size-14 text-primary">
          <path
            fill="currentColor"
            d="M50 8 61 27h22L72 46l11 19H61L50 84 39 65H17l11-19L17 27h22L50 8Zm0 14-7 12h14l-7-12Zm-18 19 7 12-7 12h14l7-12-7-12H32Zm36 0H54l7 12-7 12h14l7-12-7-12ZM50 78l7-12H43l7 12Z"
          />
        </svg>
      </div>
    );
  }
  if (tone === "red") {
    return (
      <div className="grid h-36 place-items-center bg-[#7d1420]">
        <svg viewBox="0 0 120 60" aria-hidden className="h-20 w-40">
          <path d="M10 34c10-10 22-10 32-2l8 6 10-8c10-8 22-8 32 2l18 16H0l10-14Z" fill="#f3d7c4" />
          <path d="M2 46h116v14H2z" fill="#1b1b1b" />
          <path d="M52 26l10 8 10-8-10-8-10 8Z" fill="#fff" opacity=".35" />
        </svg>
      </div>
    );
  }
  return (
    <div className="grid h-36 place-items-center bg-[#f2e3cd]">
      <svg viewBox="0 0 120 70" aria-hidden className="h-24 w-40">
        <circle cx="42" cy="38" r="20" fill="none" stroke="#1f3050" strokeWidth="9" />
        <circle cx="42" cy="38" r="6" fill="#1f3050" />
        <path d="M60 52 96 18" stroke="#c02626" strokeWidth="9" strokeLinecap="round" />
        <path d="M78 16h20v20" fill="none" stroke="#c02626" strokeWidth="9" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        {/* rychlé akce */}
        <section className="mx-auto max-w-[88rem] px-5 pt-10 md:px-6">
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
        <section className="mt-10 border-y border-primary/15 bg-primary/[0.06]">
          <div className="mx-auto max-w-[88rem] px-5 py-12 md:px-6 md:py-14">

          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-primary pb-3">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-primary md:text-3xl">
                Doporučujeme
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Výběr redakce — začněte tady
              </p>
            </div>
            <Link
              to="/clanky"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
            >
              Zobrazit vše <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {FEATURED.map((f) => (
              <article
                key={f.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3 px-6 pt-6">
                  <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                    {f.tag}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                    {f.date}
                  </span>
                </div>
                <h3 className="whitespace-pre-line px-6 pb-5 pt-3 font-display text-2xl font-bold leading-tight text-primary">
                  <Link to="/clanky" className="group-hover:underline">
                    {f.title}
                  </Link>
                </h3>
                <FeaturedArt tone={f.tone} />
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  <Link
                    to="/clanky"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:underline"
                  >
                    Číst dál <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
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
            <div className="mx-auto max-w-[88rem] px-5 py-12 md:px-6 md:py-14">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-primary pb-3">
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-primary md:text-3xl">
                  {group.label}
                </h2>
                <Link
                  to="/clanky"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
                >
                  Zobrazit vše <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="mt-7 grid gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
                {group.items.slice(0, 3).map((item, idx) => (
                  <article key={`${group.id}-${item.slug}-${idx}`} className="group">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                        {item.tag}
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold leading-snug text-primary">
                      <Link to="/clanky" className="group-hover:underline">
                        {item.title}
                      </Link>
                    </h3>

                    <div className="mt-3 flex gap-4">
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.perex}
                      </p>
                      <img
                        src={IMAGES[item.image]}
                        alt={item.title}
                        loading="lazy"
                        width={400}
                        height={300}
                        className="h-[86px] w-[112px] shrink-0 rounded-sm object-cover"
                      />
                    </div>

                    <Link
                      to="/clanky"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:underline"
                    >
                      Číst dál <ArrowRight className="size-4" />
                    </Link>

                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}



        {/* témata – jednořádkový pás štítků */}
        <section className="border-t border-border bg-secondary/50">
          <div className="mx-auto max-w-[88rem] px-5 py-8 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Témata, která rozebíráme
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
                {TOPICS.map((t) => (
                  <Link
                    key={t.slug}
                    to="/temata"
                    className="shrink-0 rounded-full border border-primary/25 bg-card px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {t.title}
                  </Link>
                ))}
                <Link
                  to="/temata"
                  className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Všechna témata →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
