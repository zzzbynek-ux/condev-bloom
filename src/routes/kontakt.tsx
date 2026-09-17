import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Clock, Mail } from "lucide-react";

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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073C0 18.098 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.653c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.098 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.4l-5-6.5L5.8 22H2.7l7.3-8.3L1.5 2H8l4.5 6 6.4-6Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    </svg>
  );
}

function KontaktSidebar() {
  return (
    <aside className="flex flex-col gap-3">
      <div className="rounded-xl bg-muted/40 px-4 py-4">
        <p className="text-[13px] text-muted-foreground">Přímý kontakt</p>
        <a
          href="mailto:redakce@jednimhlasem.cz"
          className="mt-2 flex items-center gap-2 text-sm text-foreground hover:text-primary"
        >
          <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          redakce@jednimhlasem.cz
        </a>
        <p className="mt-2 flex items-center gap-2 text-[13px] text-muted-foreground">
          <Clock className="size-4 shrink-0" aria-hidden />
          odpovídáme do 3 pracovních dnů
        </p>
      </div>

      <div className="rounded-xl bg-muted/40 px-4 py-4">
        <p className="text-[13px] text-muted-foreground">Sledujte nás</p>
        <div className="mt-2 flex gap-2.5">
          <a
            href="https://www.facebook.com/JednimHlasem"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="JednímHlasem na Facebooku"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:text-primary"
          >
            <FacebookIcon className="size-4" />
          </a>
          <a
            href="https://www.instagram.com/JednimHlasem"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="JednímHlasem na Instagramu"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:text-primary"
          >
            <InstagramIcon className="size-4" />
          </a>
          <a
            href="https://x.com/JednimHlasem"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="JednímHlasem na X"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:text-primary"
          >
            <XIcon className="size-4" />
          </a>
        </div>
      </div>

      <div className="rounded-xl bg-muted/40 px-4 py-4">
        <p className="text-[13px] text-muted-foreground">Máte otázku k obsahu?</p>
        <Link
          to="/ptejte-se-ai"
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Zkuste Ptejte se AI
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}

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
            <h1 className="home-section-title mt-2">
              Napište nám
            </h1>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.55] text-foreground">
              Napište nám. Ozveme se.
            </p>

            {status === "ok" ? (
              <div className="mt-8 grid w-full max-w-[70rem] items-start gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="w-full rounded-xl border border-border bg-card p-8">
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
                <KontaktSidebar />
              </div>
            ) : (
              <div className="mt-8 grid w-full max-w-[70rem] items-start gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <form
                  className="relative grid w-full gap-5 rounded-xl border border-border bg-card p-6 md:p-8"
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
                <KontaktSidebar />
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
