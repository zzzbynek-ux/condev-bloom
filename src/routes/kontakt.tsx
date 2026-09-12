import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Napište nám — JednímHlasem" },
      {
        name: "description",
        content: "Napište iniciativě JednímHlasem. Formulář, bez zveřejněné schránky.",
      },
      { property: "og:title", content: "Napište nám — JednímHlasem" },
      {
        property: "og:description",
        content: "Zpráva přes formulář. Ozveme se na e-mail, který uvedete.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Kontakt,
});

const FORMSPREE_ID = String(import.meta.env.VITE_FORMSPREE_ID ?? "").trim();

type Status = "idle" | "sending" | "ok" | "error";

function Kontakt() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "").trim()) {
      setStatus("ok");
      return;
    }
    if (!FORMSPREE_ID) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <p className="kicker text-primary">Kontakt</p>
            <h1 className="mt-2 font-display text-[1.5rem] font-bold text-primary md:text-[1.875rem]">
              Napište nám
            </h1>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.55] text-foreground">
              Napište nám. Ozveme se.
            </p>

            {status === "ok" ? (
              <div className="mt-8 max-w-xl rounded-xl border border-border bg-card p-8">
                <h2 className="font-display text-2xl font-bold text-primary">
                  Zpráva odešla. Ozveme se.
                </h2>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex h-11 items-center rounded-full border border-primary px-6 text-sm font-semibold text-primary"
                >
                  Napsat další
                </button>
              </div>
            ) : (
              <form
                className="relative mt-8 grid max-w-xl gap-5 rounded-xl border border-border bg-card p-6 md:p-8"
                onSubmit={onSubmit}
              >
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Jméno</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Váš e-mail</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Zpráva</span>
                  <textarea
                    name="message"
                    required
                    rows={7}
                    className="rounded-lg border border-border bg-paper px-4 py-3 text-sm"
                  />
                </label>
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!FORMSPREE_ID || status === "sending"}
                  className="inline-flex h-11 w-fit items-center rounded-full bg-[#0038B8] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#002f9a] disabled:cursor-not-allowed disabled:bg-[#0038B8] disabled:text-white disabled:opacity-100"
                >
                  {status === "sending" ? "Odesílám…" : "Odeslat"}
                </button>
                {status === "error" ? (
                  <p className="text-sm font-medium text-destructive" role="alert">
                    Teď to nešlo odeslat. Zkuste to znovu.
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
