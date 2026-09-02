import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";
import { TopicCard } from "@/components/topic-card";
import { Button } from "@/components/ui/button";
import {
  INTRO,
  VALUES,
  AXES,
  WHAT_WE_DO,
  MISSION,
  GET_INVOLVED,
} from "@/lib/about-content";
import heroBlindfold from "@/assets/hero-blindfold.jpg";

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
      <main className="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
        {/* 1. Intro */}
        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {INTRO.eyebrow}
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {INTRO.title}
          </h1>
          <div className="mx-auto mt-5 max-w-3xl space-y-4 text-left text-lg leading-relaxed text-muted-foreground md:text-xl">
            {INTRO.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-primary">
            {INTRO.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary/80 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <img
            src={heroBlindfold}
            alt={INTRO.image.alt}
            className="mx-auto mt-10 h-56 w-full max-w-3xl rounded-2xl object-cover"
          />
        </section>

        {/* 2. Naše hodnoty */}
        <section id="hodnoty" className="mt-20 scroll-mt-32">
          <SectionHeader kicker="Co nás definuje" title="Naše hodnoty" />
          <ul className="mt-8 max-w-3xl space-y-4">
            {VALUES.map((value, index) => (
              <li key={index} className="flex gap-3 text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Naše osy */}
        <section id="osy" className="mt-20 scroll-mt-32">
          <SectionHeader
            kicker="Naše osy"
            title="O čem mluvíme"
            subtitle="Osy, které nás vedou. Každá vede dál — na téma, článek nebo encyklopedii."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {AXES.map((axis) => (
              <TopicCard
                key={axis.title}
                kicker={axis.kicker}
                title={axis.title}
                text={axis.text}
                href={axis.href}
                cta={axis.cta}
                className={axis.featured ? "md:col-span-2" : ""}
              />
            ))}
          </div>
        </section>

        {/* 4. Co děláme */}
        <section className="mt-20">
          <SectionHeader kicker="Aktivity" title={WHAT_WE_DO.title} />
          <div className="mt-8 max-w-3xl space-y-4 text-left leading-relaxed text-muted-foreground">
            {WHAT_WE_DO.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* 5. Naše mise */}
        <section className="mt-20">
          <SectionHeader kicker="Proč to děláme" title={MISSION.title} />
          <div className="mt-8 max-w-3xl space-y-4 text-left leading-relaxed text-muted-foreground">
            {MISSION.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* 6. Zapojte se */}
        <section id="zapojte-se" className="mt-20 scroll-mt-32">
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
      </main>
      <SiteFooter />
    </div>
  );
}
