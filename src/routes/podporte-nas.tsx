import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";
import heroBlindfold from "@/assets/hero-blindfold.jpg";

type AmountKey = "301" | "901" | "2501";

const AMOUNTS: {
  key: AmountKey;
  name: string;
  oneTime: string;
  monthly: string;
  vs: string;
  recommended?: boolean;
}[] = [
  {
    key: "301",
    name: "Hlas",
    oneTime: "300 Kč jednorázově",
    monthly: "150 Kč měsíčně trvalým příkazem",
    vs: "301",
  },
  {
    key: "901",
    name: "Podporovatel",
    oneTime: "900 Kč jednorázově",
    monthly: "300 Kč měsíčně trvalým příkazem",
    vs: "901",
    recommended: true,
  },
  {
    key: "2501",
    name: "Patron",
    oneTime: "2 500 Kč jednorázově",
    monthly: "800 Kč měsíčně trvalým příkazem",
    vs: "2501",
  },
];

export const Route = createFileRoute("/podporte-nas")({
  head: () => ({
    meta: [
      { title: "Podpořte nás — JednímHlasem" },
      {
        name: "description",
        content:
          "Podpořte komunitu JednímHlasem darem na provoz, analýzy a propagaci faktů o Izraeli.",
      },
      { property: "og:title", content: "Podpořte nás — JednímHlasem" },
      {
        property: "og:description",
        content:
          "Podpořte komunitu JednímHlasem darem na provoz, analýzy a propagaci faktů o Izraeli.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PodporteNas,
});

function PodporteNas() {
  const [selected, setSelected] = useState<AmountKey>("901");
  const selectedAmount = AMOUNTS.find((a) => a.key === selected)!;

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <div className="border-t-2 border-primary pt-5 text-left">
              <img
                src="/images/logo-bublina-modra.png"
                alt="JednímHlasem"
                width={280}
                height={218}
                decoding="async"
                className="h-24 w-auto md:h-32"
              />
              <p className="kicker mt-6 text-primary">Podpořte nás</p>
              <h1 className="mt-3 max-w-3xl text-balance font-display text-[1.65rem] font-bold leading-[1.15] text-foreground md:text-[1.85rem] lg:text-[2.1rem]">
                Jedním hlasem neznamená všichni stejně, ale společně za to, co nás spojuje.
              </h1>
              <div className="mt-4 max-w-3xl space-y-3 text-[0.95rem] leading-[1.55] text-foreground">
                <p>
                  JednímHlasem je nezávislá občanská iniciativa a otevřená platforma, která vznikla jako reakce na rostoucí dezinformace, selektivní empatii a zkreslený obraz Izraele ve veřejném prostoru.
                </p>
                <p>
                  Naším cílem je vracet fakta, kontext a důstojnost do debaty – v době, kdy se realita ohýbá podle ideologie a pravda přizpůsobuje algoritmům.
                </p>
              </div>
              <div className="mt-8 overflow-hidden rounded-xl border border-border">
                <img
                  src={heroBlindfold}
                  alt="Ilustrační foto k podpoře iniciativy JednímHlasem"
                  className="h-48 w-full object-cover md:h-64 lg:h-72"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader
              kicker="Vaše podpora"
              title="Vyberte částku"
              subtitle="Nebo pošlete libovolnou částku na účet níž."
            />
            <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
              {AMOUNTS.map((amount) => {
                const active = selected === amount.key;
                return (
                  <button
                    key={amount.key}
                    type="button"
                    onClick={() => setSelected(amount.key)}
                    className={`card-lift relative flex h-full flex-col rounded-xl border bg-card p-6 text-left ${
                      active ? "border-primary" : "border-border"
                    }`}
                  >
                    {amount.recommended ? (
                      <span className="article-tag absolute right-4 top-4 rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                        Doporučeno
                      </span>
                    ) : null}
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        }`}
                      >
                        {active ? <Check className="size-3" /> : null}
                      </span>
                      <h3 className="font-display text-lg font-bold text-primary">
                        {amount.name}
                      </h3>
                    </div>
                    <p className="mt-4 font-display text-2xl font-bold text-foreground">
                      {amount.oneTime.split(" ")[0]}{" "}
                      <span className="font-sans text-base font-normal text-muted-foreground">
                        {amount.oneTime.split(" ").slice(1).join(" ")}
                      </span>
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-[1.55] text-muted-foreground">
                      {amount.monthly}
                    </p>
                    <p className="cta-link mt-4 text-primary">VS {amount.vs}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Jak poslat dar" title="Bankovní spojení" />
            <div className="mt-8 grid gap-4 md:grid-cols-[220px_1fr] md:items-stretch">
              <div className="card-lift flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
                <div className="flex size-[180px] items-center justify-center rounded-xl border border-border bg-paper md:size-[200px]">
                  <span className="text-sm text-muted-foreground">QR kód</span>
                </div>
                <p className="text-center text-[0.95rem] leading-[1.55] text-muted-foreground">
                  QR platba — naskenujte v bankovní aplikaci
                </p>
              </div>

              <div className="card-lift rounded-xl border border-border bg-card p-6">
                <dl className="grid gap-x-6 gap-y-4 text-[0.95rem] leading-[1.55] md:grid-cols-[auto_1fr]">
                  <dt className="kicker text-primary/70">Příjemce</dt>
                  <dd className="font-semibold text-foreground">JednímHlasem z. s.</dd>

                  <dt className="kicker text-primary/70">Číslo účtu</dt>
                  <dd className="font-semibold text-foreground">2301987654 / 2010</dd>

                  <dt className="kicker text-primary/70">IBAN</dt>
                  <dd className="font-semibold text-foreground">CZ65 2010 0000 0023 0198 7654</dd>

                  <dt className="kicker text-primary/70">BIC</dt>
                  <dd className="font-semibold text-foreground">FIOBCZPPXXX</dd>

                  <dt className="kicker text-primary/70">Zpráva pro příjemce</dt>
                  <dd className="font-semibold text-foreground">Dar JednímHlasem</dd>

                  <dt className="kicker text-primary/70">Variabilní symbol</dt>
                  <dd className="font-semibold text-primary">{selectedAmount.vs}</dd>
                </dl>
                <p className="mt-6 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  Údaje jsou ukázkové a před spuštěním se nahradí skutečným účtem. Nejsme veřejná sbírka. Jde o dar na činnost iniciativy. Při platbě na transparentní účet může být jméno a částka vidět ve výpisu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Kam dar směřuje" title="Co podpora drží" />
            <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
              {[
                "Publikujeme analýzy, komentáře a investigativní články, které vyvracejí dezinformace a doplňují kontext.",
                "Budujeme komunitu lidí, kterým není lhostejné, když se realita mění v propagandu.",
                "Věříme, že pravda potřebuje obhájce.",
              ].map((text) => (
                <li
                  key={text}
                  className="card-lift flex h-full rounded-xl border border-border bg-card p-6 text-[0.95rem] leading-[1.55] text-foreground"
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <div className="border-t-2 border-primary pt-5">
              <p className="kicker text-primary">Kontakt</p>
              <h2 className="mt-2 font-display text-[1.5rem] font-bold text-primary md:text-[1.875rem]">
                Potřebujete potvrzení daru?
              </h2>
              <p className="mt-4 max-w-3xl text-[0.95rem] leading-[1.55] text-foreground">
                Napište nám na{" "}
                <a
                  href="mailto:info@jednimhlasem.cz"
                  className="font-semibold text-primary hover:text-[var(--accent-blue)] hover:underline"
                >
                  info@jednimhlasem.cz
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
