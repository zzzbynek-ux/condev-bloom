import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/nahlasit-incident")({
  head: () => ({
    meta: [
      { title: "Nahlásit incident — JednímHlasem" },
      {
        name: "description",
        content:
          "Nahlaste antisemitský incident, výhrůžku nebo nenávistný obsah. Vaše hlášení zdokumentujeme a ověříme.",
      },
      { property: "og:title", content: "Nahlásit incident — JednímHlasem" },
      {
        property: "og:description",
        content: "Formulář pro nahlášení antisemitského incidentu nebo nenávistného obsahu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NahlasitIncident,
});

const TYPES = [
  "Nenávistný obsah online",
  "Verbální útok",
  "Fyzický útok",
  "Vandalismus",
  "Dezinformace v médiích",
  "Jiné",
];

function NahlasitIncident() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Nahlásit incident</p>
        <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
          Pomozte nám incidenty zdokumentovat
        </h1>
        <p className="mt-4 text-muted-foreground">
          Popište, co se stalo. Čím konkrétnější informace, tím lépe. Hlášení můžete poslat
          i anonymně — kontakt vyplňte jen, pokud chceme mít možnost se doptat.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p className="text-muted-foreground">
            Jde-li o bezprostřední ohrožení života nebo zdraví, volejte nejdřív <strong>158</strong>.
            Tento formulář nenahrazuje trestní oznámení.
          </p>
        </div>

        {sent ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-bold">Děkujeme za hlášení</h2>
            <p className="mt-3 text-muted-foreground">
              Hlášení jsme přijali. Pokud jste uvedli kontakt, ozveme se vám.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-medium"
            >
              Nahlásit další
            </button>
          </div>
        ) : (
          <form
            className="mt-10 grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Hlášení odesláno");
            }}
          >
            <label className="grid gap-2">
              <span className="text-sm font-medium">Typ incidentu</span>
              <select
                required
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Vyberte…
                </option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium">Kdy se to stalo</span>
                <input type="date" className="rounded-lg border border-border bg-card px-4 py-3 text-sm" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Kde (město, web, síť)</span>
                <input
                  type="text"
                  placeholder="např. Praha, Facebook…"
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Popis incidentu</span>
              <textarea
                required
                rows={6}
                placeholder="Co se stalo, kdo byl přítomen, co bylo řečeno…"
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Odkaz na důkaz (nepovinné)</span>
              <input
                type="url"
                placeholder="https://…"
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Váš e-mail (nepovinné)</span>
              <input
                type="email"
                placeholder="abychom se mohli doptat"
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
              />
            </label>

            <button
              type="submit"
              className="justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Odeslat hlášení
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
