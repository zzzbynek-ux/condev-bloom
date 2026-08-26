import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Flag, HelpCircle, Users } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FEATURED, SLIDES, TOPICS } from "@/lib/content";
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

function Hero() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 8000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[i] ?? SLIDES[0]!;

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
          <h1 key={slide.title} className="animate-rise mt-3 text-3xl font-bold text-white md:text-5xl">
            {slide.title}
          </h1>
          <p
            key={slide.text}
            className="animate-rise mt-4 text-sm leading-relaxed text-white/85 md:text-[17px]"
          >
            {slide.text}
          </p>
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

      <div className="relative flex flex-col items-center gap-3 pb-6">
        <div className="flex items-center gap-2">
          {SLIDES.map((s, idx) => (
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
        <div className="hidden flex-wrap justify-center gap-6 px-6 text-xs text-white/55 md:flex">
          {SLIDES.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setI(idx)}
              className={idx === i ? "text-white" : "hover:text-white/85"}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const ACTIONS = [
  {
    icon: Users,
    title: "Zapojte se",
    text: "Přidejte se k nám a staňte se součástí řešení.",
    tone: "bg-primary",
  },
  {
    icon: HelpCircle,
    title: "Ptejte se AI",
    text: "Zeptejte se naší AI na dezinformace a fakta.",
    tone: "bg-primary",
  },
  {
    icon: Flag,
    title: "Nahlásit incident",
    text: "Pomozte nám monitorovat a reagovat.",
    tone: "bg-destructive",
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
          <div className="grid gap-6 md:grid-cols-3">
            {ACTIONS.map((a) => (
              <Link
                key={a.title}
                to="/zapojte-se"
                className="flex items-center gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className={`grid size-14 shrink-0 place-items-center rounded-full ${a.tone}`}>
                  <a.icon className="size-7 text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold text-foreground">{a.title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">{a.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* zvýrazněné karty */}
        <section className="mx-auto max-w-[88rem] px-5 pt-6 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED.map((f) => (
              <article
                key={f.title}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="whitespace-pre-line px-6 pb-5 pt-6 font-display text-2xl font-bold leading-tight text-primary">
                  {f.title}
                </h2>
                <FeaturedArt tone={f.tone} />
                <div className="px-6 pb-6 pt-5">
                  <p className="text-sm leading-relaxed text-foreground/80">{f.text}</p>
                  <Link
                    to="/clanky"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary"
                  >
                    Číst dál <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* témata */}
        <section className="border-t border-border bg-secondary/50">
          <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-6">
            <h2 className="font-display text-3xl font-bold text-primary">Témata, která rozebíráme</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((t) => (
                <article
                  key={t.slug}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                    {t.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{t.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t.perex}</p>
                  <Link to="/clanky" className="mt-5 text-sm font-semibold text-primary">
                    Číst více →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
