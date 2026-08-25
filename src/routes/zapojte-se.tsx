import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, MessageCircle, ShieldAlert, Users } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/zapojte-se")({
  head: () => ({
    meta: [
      { title: "Zapojte se — JednímHlasem" },
      {
        name: "description",
        content:
          "Přidejte se na WhatsApp, nahlaste antisemitský incident nebo podpořte komunitu JednímHlasem.",
      },
      { property: "og:title", content: "Zapojte se — JednímHlasem" },
      {
        property: "og:description",
        content: "WhatsApp komunita, hlášení incidentů a podpora projektu.",
      },
    ],
  }),
  component: ZapojteSe,
});

const WAYS = [
  {
    icon: MessageCircle,
    title: "WhatsApp komunita",
    text: "Denně pošleme jeden až dva tipy, kde je potřeba věcná reakce. Bez spamu.",
    cta: "Přidat se",
  },
  {
    icon: ShieldAlert,
    title: "Nahlásit incident",
    text: "Antisemitský útok, výhrůžka nebo nenávistný obsah? Zdokumentujeme to.",
    cta: "Vyplnit hlášení",
  },
  {
    icon: Users,
    title: "Psát a překládat",
    text: "Hledáme lidi na rešerše, korektury a překlady zahraničních studií.",
    cta: "Ozvat se",
  },
  {
    icon: HeartHandshake,
    title: "Podpořit finančně",
    text: "Provoz, analýzy a propagace stojí peníze. Každá stovka pomůže.",
    cta: "Přispět",
  },
];

function ZapojteSe() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Zapojte se</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Čtyři způsoby, jak pomoct</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Vyberte si podle času, který máte. I pět minut denně dává smysl.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {WAYS.map((w) => (
            <div key={w.title} className="flex flex-col rounded-2xl border border-border bg-card p-7">
              <w.icon className="size-6 text-primary" />
              <h2 className="mt-4 text-xl font-semibold">{w.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              <button
                type="button"
                className="mt-6 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {w.cta}
              </button>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
