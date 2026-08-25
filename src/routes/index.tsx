import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, ShieldAlert, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SLIDES, TOPICS } from "@/lib/content";

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

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[i] ?? SLIDES[0]!;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 md:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Občanská komunita
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] text-foreground md:text-6xl">
          Do debaty o Izraeli vracíme fakta,
          <span className="text-primary"> kontext a klidný tón.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Píšeme analýzy, ověřujeme tvrzení a pomáháme lidem reagovat tam, kde se rozhoduje
          o veřejném mínění — v komentářích, v médiích i ve školách.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/clanky"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Začněte číst <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/zapojte-se"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Zapojte se
          </Link>
        </div>

        {/* Slider: pomalý, s indikátory a možností přeskočit */}
        <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-primary">{slide.kicker}</p>
          <h2 key={slide.title} className="animate-rise mt-3 text-2xl font-semibold md:text-3xl">
            {slide.title}
          </h2>
          <p key={slide.text} className="animate-rise mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {slide.text}
          </p>
          <div className="mt-6 flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Zobrazit: ${s.title}`}
                aria-current={idx === i}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 bg-primary" : "w-4 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-3 text-xs text-muted-foreground">
              {i + 1} / {SLIDES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const ACTIONS = [
  {
    icon: MessageCircle,
    title: "Přidej se na WhatsApp",
    text: "Denní tipy, kde je potřeba jeden věcný komentář.",
  },
  {
    icon: ShieldAlert,
    title: "Nahlaste incident",
    text: "Zaznamenali jste antisemitský útok nebo výhrůžku? Dejte nám vědět.",
  },
  {
    icon: Sparkles,
    title: "Ptejte se AI",
    text: "Ověřte si fakta a kontext dřív, než je sdílíte dál.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />

        <section className="border-y border-border bg-card/40">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-3">
            {ACTIONS.map((a) => (
              <Link
                key={a.title}
                to="/zapojte-se"
                className="group rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <a.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  Pokračovat <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Rubriky</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Témata, která rozebíráme</h2>
            </div>
            <Link to="/temata" className="text-sm text-muted-foreground hover:text-primary">
              Všechna témata →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <article
                key={t.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-primary">{t.kicker}</p>
                <h3 className="mt-3 text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t.perex}</p>
                <Link to="/clanky" className="mt-5 text-sm text-foreground hover:text-primary">
                  Číst více →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-secondary p-8 md:p-12">
            <h2 className="max-w-2xl text-2xl font-semibold md:text-4xl">
              Jeden hlas nic nezmění. Tisíc hlasů ano.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Přidejte se ke komunitě, která reaguje společně, věcně a bez nadávek.
            </p>
            <Link
              to="/zapojte-se"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Chci se zapojit <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
