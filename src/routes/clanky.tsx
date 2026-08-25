import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TOPICS } from "@/lib/content";

export const Route = createFileRoute("/clanky")({
  head: () => ({
    meta: [
      { title: "Články a analýzy — JednímHlasem" },
      {
        name: "description",
        content:
          "Studie, analýzy a české příběhy o antisemitismu, médiích a dezinformacích kolem Izraele.",
      },
      { property: "og:title", content: "Články a analýzy — JednímHlasem" },
      {
        property: "og:description",
        content: "Studie, analýzy a české příběhy o antisemitismu a dezinformacích.",
      },
    ],
  }),
  component: Clanky,
});

const FILTERS = ["Nové", "Doporučujeme", "Studie a analýzy", "České příběhy"];

function Clanky() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Texty</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Články a analýzy</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Vše na jednom místě — od krátkých faktických vysvětlení po dlouhé studie.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f, idx) => (
            <span
              key={f}
              className={`rounded-full border px-4 py-2 text-sm ${
                idx === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {TOPICS.map((t) => (
            <article key={t.slug} className="grid gap-2 py-7 md:grid-cols-[10rem_1fr]">
              <p className="text-xs uppercase tracking-[0.16em] text-primary">{t.kicker}</p>
              <div>
                <h2 className="text-xl font-semibold">{t.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t.perex}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
