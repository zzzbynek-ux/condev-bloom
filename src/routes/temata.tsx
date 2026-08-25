import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TOPICS } from "@/lib/content";

export const Route = createFileRoute("/temata")({
  head: () => ({
    meta: [
      { title: "Témata — JednímHlasem" },
      {
        name: "description",
        content:
          "Přehled rubrik: antisemitismus 2.0, média, katarský vliv, dezinformace i Blízký východ.",
      },
      { property: "og:title", content: "Témata — JednímHlasem" },
      {
        property: "og:description",
        content: "Přehled rubrik, kterým se dlouhodobě věnujeme.",
      },
    ],
  }),
  component: Temata,
});

function Temata() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Rubriky</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Témata</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Šest oblastí, kterým se věnujeme dlouhodobě a do hloubky.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {TOPICS.map((t) => (
            <article
              key={t.slug}
              className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-primary">{t.kicker}</p>
              <h2 className="mt-3 text-2xl font-semibold">{t.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.perex}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
