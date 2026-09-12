import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Napište nám — JednímHlasem" },
      {
        name: "description",
        content: "Kontaktní formulář iniciativy JednímHlasem. Napište nám, ozveme se.",
      },
      { property: "og:title", content: "Napište nám — JednímHlasem" },
    ],
  }),
  component: Kontakt,
});

type Status = "idle" | "sending" | "ok" | "err";

function Kontakt() {
  const formId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  const configured = Boolean(formId && formId.trim());
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "").trim()) {
      setStatus("ok");
      form.reset();
      return;
    }
    if (!configured) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-20">
        <p className="kicker text-primary">Kontakt</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">
          Napište nám
        </h1>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.55] text-muted-foreground">
          Formulář jde přímo k nám. Adresu neschováváme na webu — ozveme se na e-mail, který
          uvedete.
        </p>

        {status === "ok" ? (
          <p className="mt-8 rounded-xl border border-border bg-card p-6 text-[0.95rem] leading-[1.55] text-foreground">
            Zpráva odešla. Ozveme se.
          </p>
        ) : (
          <form className="mt-8 grid gap-5 rounded-xl border border-border bg-card p-6 md:p-8" onSubmit={onSubmit}>
            <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
              Website
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Jméno</span>
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Váš e-mail</span>
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Zpráva</span>
              <textarea
                required
                name="message"
                rows={6}
                className="rounded-lg border border-border bg-paper px-4 py-3 text-sm"
              />
            </label>
            <button
              type="submit"
              disabled={!configured || status === "sending"}
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {status === "sending" ? "Odesílám…" : "Odeslat"}
            </button>
            {!configured ? (
              <p className="text-sm text-muted-foreground">
                Odesílání se dopojí po nastavení schránky.
              </p>
            ) : null}
            {status === "err" ? (
              <p className="text-sm text-destructive">Teď to nešlo odeslat. Zkuste to znovu.</p>
            ) : null}
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
