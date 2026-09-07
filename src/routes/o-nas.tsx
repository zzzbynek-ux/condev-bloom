import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";
import { TopicCard } from "@/components/topic-card";
import { Button } from "@/components/ui/button";
import {
  INTRO,
  SLOGAN,
  VALUES,
  AXES,
  WHAT_WE_DO,
  MISSION,
  GET_INVOLVED,
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-[1120px] px-5 pt-12 text-left md:pt-16">
          <img
            src="/images/logo-bublina-modra.png"
            alt="JednímHlasem"
            width={280}
            height={218}
            decoding="async"
            className="h-20 w-auto md:h-28"
          />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {INTRO.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[1.65rem] font-bold leading-tight text-foreground md:text-[1.85rem] lg:text-[2.1rem]">
            {INTRO.title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-[0.95rem] leading-[1.55] text-muted-foreground md:text-base">
            {INTRO.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          className="mt-10 bg-[#0b1a3a] text-white md:mt-14"
          aria-label="Heslo"
        >
          <p className="mx-auto max-w-[1120px] px-5 py-8 font-display text-xl font-semibold leading-snug md:py-10 md:text-2xl">
            {SLOGAN}
          </p>
        </section>

        <div className="mx-auto max-w-[1120px] px-5 pb-14 md:pb-20">
          <section id="hodnoty" className="mt-14 scroll-mt-32 md:mt-16">
            <SectionHeader kicker="Co nás definuje" title="Naše hodnoty" />
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {VALUES.map((value) => (
                <li
                  key={value.index}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <p className="font-display text-2xl font-bold text-primary">
                    {value.index}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section id="osy" className="mt-16 scroll-mt-32 md:mt-20">
            <SectionHeader
              kicker="Naše osy"
              title="O čem mluvíme"
              subtitle="Tři témata, od kterých se odvíjí zbytek webu."
              to="/clanky"
              linkLabel="Další texty"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
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
          </section>

          <section className="mt-16 md:mt-20">
            <SectionHeader kicker="Aktivity" title={WHAT_WE_DO.title} />
            <ul className="mt-8 max-w-3xl space-y-4">
              {WHAT_WE_DO.paragraphs.map((paragraph) => (
                <li key={paragraph} className="flex gap-3 text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{paragraph}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 md:mt-20">
            <SectionHeader kicker="Proč to děláme" title={MISSION.title} />
            <div className="mt-8 max-w-3xl space-y-4 text-left leading-relaxed text-muted-foreground">
              {MISSION.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section id="zapojte-se" className="mt-16 scroll-mt-32 md:mt-20">
            <SectionHeader kicker="Přidejte se" title={GET_INVOLVED.title} />
            <p className="mt-8 max-w-3xl text-left leading-relaxed text-muted-foreground">
              {GET_INVOLVED.text}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="rounded-full bg-primary px-6 text-white hover:bg-primary/90"
              >
                <a href={GET_INVOLVED.primary.href}>
                  {GET_INVOLVED.primary.label}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/5"
              >
                <Link to={GET_INVOLVED.secondary.href}>
                  {GET_INVOLVED.secondary.label}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
