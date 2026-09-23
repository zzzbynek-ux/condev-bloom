import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";
import { TopicCard } from "@/components/topic-card";
import {
  INTRO,
  VALUES,
  AXES,
  WHAT_WE_DO,
  MISSION,
} from "@/lib/about-content";
import { csNbsp } from "@/lib/typo";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nás — Jedním hlasem" },
      {
        name: "description",
        content:
          "Kdo jsme, proč vznikla komunita Jedním hlasem a jak pracujeme s fakty a zdroji.",
      },
      { property: "og:title", content: "O nás — Jedním hlasem" },
      {
        property: "og:description",
        content: "Kdo jsme, proč komunita vznikla a jak pracujeme se zdroji.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ONas,
});

const DO_VERBS = ["Publikujeme", "Vytváříme", "Sledujeme", "Budujeme"] as const;

function ONas() {
  const [showAllAxes, setShowAllAxes] = useState(false);
  const axes = showAllAxes ? AXES : AXES.slice(0, 6);
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section className="onas-hero relative isolate overflow-hidden bg-navy-900">
          <img
            src={INTRO.image.src}
            alt={INTRO.image.alt}
            width={1920}
            height={720}
            decoding="async"
            fetchPriority="high"
            className="onas-hero-img pointer-events-none"
          />
          <div
            aria-hidden
            className="onas-hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/92 via-[#0b1a3a]/58 via-[42%] to-transparent"
          />
          <div className="onas-hero-grid relative z-10 mx-auto flex h-full w-full max-w-[88rem] items-start justify-start px-5 md:items-center md:px-6">
            <div className="onas-hero-card w-full text-left">
              <p className="kicker text-white/70">{INTRO.eyebrow}</p>
              <h1 className="mt-3 max-w-xl text-balance font-display text-[1.65rem] font-bold leading-[1.15] text-white md:text-[1.85rem] lg:text-[2.1rem]">
                {INTRO.title}
              </h1>
              <div className="onas-hero-copy mt-4 max-w-lg space-y-3 text-[0.95rem] leading-[1.55] text-white/90">
                {INTRO.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{csNbsp(paragraph)}</p>
                ))}
              </div>
              <nav className="onas-hero-nav mt-5" aria-label="Sekce stránky O nás">
                {INTRO.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="onas-hero-pill"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section id="hodnoty" className="scroll-mt-32">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Co nás definuje" title="Naše hodnoty" />
            <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
              {VALUES.map((value) => (
                <li
                  key={value}
                  className="onas-value card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-[0.95rem] leading-[1.55] text-foreground"
                >
                  {csNbsp(value)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="osy" className="onas-band scroll-mt-32">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Naše témata" title="O čem mluvíme" />
            <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {axes.map((axis) => (
                <TopicCard
                  key={axis.title}
                  kicker={axis.kicker}
                  title={axis.title}
                  text={axis.text}
                  href={axis.href}
                  cta={axis.cta}
                />
              ))}
            </div>
            {showAllAxes ? null : (
              <button
                type="button"
                className="cta-link mt-6 inline-flex items-center gap-2 text-primary"
                onClick={() => setShowAllAxes(true)}
              >
                Číst další <ArrowRight className="size-4" aria-hidden />
              </button>
            )}
          </div>
        </section>

        <section id="aktivity" className="scroll-mt-32">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Aktivity" title={WHAT_WE_DO.title} />
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {WHAT_WE_DO.paragraphs.map((paragraph, i) => (
                <li key={paragraph} className="rounded-2xl border border-border bg-card p-5">
                  <p className="kicker text-primary">{DO_VERBS[i]}</p>
                  <p className="mt-2 text-[0.95rem] leading-[1.55] text-foreground">
                    {csNbsp(paragraph)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="mise" className="onas-band scroll-mt-32">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Proč to děláme" title={MISSION.title} />
            <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
              {MISSION.paragraphs.map((paragraph) => (
                <li
                  key={paragraph}
                  className="onas-value card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-[0.95rem] leading-[1.55]"
                >
                  {csNbsp(paragraph)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <aside className="onas-close">
        <p>Nezávislý hlas drží jen čtenáři.</p>
        <Link to="/podporte-nas" className="donate-pill">
          Podpořte nás
        </Link>
      </aside>
      <SiteFooter />
    </div>
  );
}
