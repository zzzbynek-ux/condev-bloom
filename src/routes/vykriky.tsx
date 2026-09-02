import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/vykriky")({
  head: () => ({
    meta: [
      { title: "Výkřiky — JednímHlasem" },
      {
        name: "description",
        content:
          "Dokumentujeme výkřiky veřejných činitelů a médií o Izraeli — citace, zdroj a datum.",
      },
      { property: "og:title", content: "Výkřiky — JednímHlasem" },
      {
        property: "og:description",
        content: "Citace veřejných činitelů a médií o Izraeli, se zdrojem a datem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vykriky,
});

const QUOTES = [
  {
    quote:
      "„Izrael provádí genocidu v Gaze — to je přece každému jasné.“",
    source: "Veřejný činitel, televizní debata",
    date: "21. 8. 2026",
  },
  {
    quote:
      "„Židé ovládají světová média, proto se pravda nedozvíte.“",
    source: "Komentář pod zpravodajským článkem",
    date: "12. 8. 2026",
  },
  {
    quote:
      "„Od řeky k moři — Palestina bude svobodná.“",
    source: "Transparent na studentské demonstraci",
    date: "30. 7. 2026",
  },
];

function Vykriky() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Zpět na úvod
        </Link>
        <p className="mt-8 text-xs uppercase tracking-[0.18em] text-primary">Dokumentujeme</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Výkřiky</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Citace veřejných činitelů, médií a demonstrací — se zdrojem a datem. Slova, která
          tvoří veřejnou debatu o Izraeli, si zaslouží být zaznamenána.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.quote}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                  Výkřik
                </span>
                <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                  {q.date}
                </span>
              </div>
              <blockquote className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
                {q.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                Zdroj: {q.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
