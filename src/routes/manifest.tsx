import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SLIDES } from "@/lib/content";

export const Route = createFileRoute("/manifest")({
  head: () => ({
    meta: [
      { title: "Manifest — JednímHlasem" },
      {
        name: "description",
        content:
          "Devět sdělení, na kterých stojíme: proč se Izraelem zabýváme, jak funguje nový antisemitismus a co do debaty vracíme.",
      },
      { property: "og:title", content: "Manifest — JednímHlasem" },
      {
        property: "og:description",
        content: "Devět sdělení, na kterých komunita JednímHlasem stojí.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Manifest,
});

function Manifest() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-[70rem] px-5 py-14 md:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Manifest</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight text-[#0b1a3a] md:text-5xl">
          Na čem stojíme
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Devět sdělení, která shrnují, proč tenhle projekt existuje a jakým tónem mluvíme.
        </p>

        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {SLIDES.map((s, i) => (
            <li
              key={s.title}
              className="rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl font-extrabold text-primary/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  {s.kicker}
                </p>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1a3a]">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
