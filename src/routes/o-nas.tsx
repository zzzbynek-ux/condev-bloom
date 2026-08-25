import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
    ],
  }),
  component: ONas,
});

const PRINCIPLES = [
  {
    title: "Fakta před emocemi",
    text: "Každé tvrzení opíráme o dohledatelný zdroj. Když se spleteme, opravíme to viditelně.",
  },
  {
    title: "Klidný tón",
    text: "Nenadáváme, neponižujeme. Silný argument nepotřebuje velká písmena.",
  },
  {
    title: "Celý obraz",
    text: "Doplňujeme kontext, který v debatě chybí — i když je nepohodlný.",
  },
];

function ONas() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">O nás</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">
          Občanská komunita, ne redakce
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          JednímHlasem spojuje lidi, kterým vadí, že se veřejná debata o Izraeli a
          antisemitismu vede na základě zkratek. Píšeme, ověřujeme a hlavně reagujeme tam,
          kde se mínění opravdu tvoří — v komentářích a na sítích.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
