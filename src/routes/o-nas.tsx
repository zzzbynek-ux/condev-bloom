import { createFileRoute } from "@tanstack/react-router";

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

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nás — JednímHlasem" },
      {
        name: "description",
        content:
          "Kdo jsme, proč vznikla komunita JednímHlasem a jak pracujeme s fakty a zdroji.",
      },
      { property: "og:title", content: "O nás — JednímHlasem" },
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

function ONas() {
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
          <div className="onas-hero-grid relative z-10 mx-auto flex h-full max-w-[88rem] items-center px-5 md:px-6 lg:px-16">
            <div className="onas-hero-card w-full">
              <p className="kicker text-white/70">{INTRO.eyebrow}</p>
              <h1 className="mt-3 max-w-xl text-balance font-display text-[1.65rem] font-bold leading-[1.15] text-white md:text-[1.85rem] lg:text-[2.1rem]">
                {INTRO.title}
              </h1>
              <div className="onas-hero-copy mt-4 max-w-lg space-y-3 text-[0.95rem] leading-[1.55] text-white/90">
                {INTRO.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <nav className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-white">
                {INTRO.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-white/80 hover:underline"
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
                  className="card-lift flex h-full rounded-xl border border-border bg-card p-6 text-[0.95rem] leading-[1.55] text-foreground"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="osy" className="scroll-mt-32">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Naše témata" title="O čem mluvíme" />
            <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {AXES.map((axis) => (
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
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Aktivity" title={WHAT_WE_DO.title} />
            <ul className="mt-8 max-w-3xl space-y-4">
              {WHAT_WE_DO.paragraphs.map((paragraph) => (
                <li key={paragraph} className="flex gap-3 text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-[0.95rem] leading-[1.55]">{paragraph}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Proč to děláme" title={MISSION.title} />
            <div className="mt-8 max-w-3xl space-y-4 text-left text-[0.95rem] leading-[1.55] text-foreground">
              {MISSION.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
