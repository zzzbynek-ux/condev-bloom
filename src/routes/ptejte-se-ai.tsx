import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/ptejte-se-ai")({
  head: () => ({
    meta: [
      { title: "Ptejte se AI — JednímHlasem" },
      {
        name: "description",
        content:
          "Zeptejte se na dezinformace o Izraeli a antisemitismu. Odpovědi stavíme na ověřených faktech a kontextu.",
      },
      { property: "og:title", content: "Ptejte se AI — JednímHlasem" },
      {
        property: "og:description",
        content: "AI asistent, který pomáhá věcně reagovat na dezinformace o Izraeli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PtejteSeAi,
});

const EXAMPLES = [
  "Co přesně znamená „nový antisemitismus“?",
  "Je kritika izraelské vlády antisemitismus?",
  "Odkud pocházejí čísla o obětech z Gazy?",
  "Jak reagovat na tvrzení o „apartheidu“?",
];

function PtejteSeAi() {
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Ptejte se AI</p>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
          Nevíte, jak reagovat? Zeptejte se.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Napište otázku nebo vložte tvrzení, které jste někde četli. Připravíme vám věcnou
          odpověď s kontextem a zdroji.
        </p>

        <form
          className="mt-8 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) setAsked(q.trim());
          }}
        >
          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            rows={4}
            placeholder="Např.: Jak odpovědět na tvrzení, že Izrael páchá genocidu?"
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm"
          />
          <button
            type="submit"
            className="justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Odeslat otázku
          </button>
        </form>

        {asked ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="size-4" /> Vaše otázka
            </p>
            <p className="mt-2 text-sm text-foreground">{asked}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Odpovědi zatím připravujeme ručně — otázku jsme zaznamenali a odpověď doplníme
              do sekce Témata. AI asistent bude spuštěn brzy.
            </p>
          </div>
        ) : null}

        <h2 className="mt-12 font-display text-xl font-bold">Časté otázky</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setQ(e)}
              className="rounded-full border border-primary/30 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
            >
              {e}
            </button>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
