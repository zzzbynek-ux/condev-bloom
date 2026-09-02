import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";
import { Check } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-5 py-14 md:py-20">
        {/* 1. Intro */}
        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Podpořte nás
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            Jedním hlasem neznamená všichni stejně, ale společně za to, co nás spojuje.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-left text-lg leading-relaxed text-muted-foreground md:text-xl">
            JednímHlasem je nezávislá občanská iniciativa a otevřená platforma, která vznikla jako reakce na rostoucí dezinformace, selektivní empatii a zkreslený obraz Izraele ve veřejném prostoru.
            <br className="hidden md:block" />{" "}
            Naším cílem je vracet fakta, kontext a důstojnost do debaty – v době, kdy se realita ohýbá podle ideologie a pravda přizpůsobuje algoritmům.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl">
            <img
              src={heroBlindfold}
              alt="Ilustrační foto k podpoře iniciativy JednímHlasem"
              className="h-[200px] w-full object-cover md:h-[280px]"
              loading="eager"
            />
          </div>
        </section>

        {/* 2. Tři karty daru */}
        <section className="mt-20">
          <SectionHeader
            kicker="Vaše podpora"
            title="Vyberte částku"
            subtitle="Nebo pošlete libovolnou částku na účet níž."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {AMOUNTS.map((amount) => {
              const active = selected === amount.key;
              return (
                <button
                  key={amount.key}
                  type="button"
                  onClick={() => setSelected(amount.key)}
                  className={`relative flex flex-col rounded-2xl bg-card p-7 text-left shadow-sm transition-all ${
                    active
                      ? "ring-2 ring-primary"
                      : "ring-1 ring-border hover:shadow-md"
                  }`}
                >
                  {amount.recommended ? (
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                      Doporučeno
                    </span>
                  ) : null}
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {active ? <Check className="size-3" /> : null}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {amount.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-2xl font-bold text-foreground">
                    {amount.oneTime.split(" ")[0]}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      {amount.oneTime.split(" ").slice(1).join(" ")}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {amount.monthly}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary">
                    VS {amount.vs}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Platba */}
        <section className="mt-20">
          <SectionHeader kicker="Jak poslat dar" title="Bankovní spojení" />
          <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
              <div className="flex size-[180px] items-center justify-center rounded-xl bg-muted md:size-[220px]">
                <span className="text-sm text-muted-foreground">QR kód</span>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                QR platba — naskenujte v bankovní aplikaci
              </p>
            </div>

            <div className="rounded-2xl bg-card p-7 shadow-sm ring-1 ring-border">
              <dl className="grid gap-y-4 gap-x-6 text-sm md:grid-cols-[auto_1fr]">
                <dt className="font-medium text-muted-foreground">Příjemce</dt>
                <dd className="font-semibold text-foreground">JednímHlasem z. s.</dd>

                <dt className="font-medium text-muted-foreground">Číslo účtu</dt>
                <dd className="font-semibold text-foreground">2301987654 / 2010</dd>

                <dt className="font-medium text-muted-foreground">IBAN</dt>
                <dd className="font-semibold text-foreground">CZ65 2010 0000 0023 0198 7654</dd>

                <dt className="font-medium text-muted-foreground">BIC</dt>
                <dd className="font-semibold text-foreground">FIOBCZPPXXX</dd>

                <dt className="font-medium text-muted-foreground">Zpráva pro příjemce</dt>
                <dd className="font-semibold text-foreground">Dar JednímHlasem</dd>

                <dt className="font-medium text-muted-foreground">Variabilní symbol</dt>
                <dd className="font-semibold text-primary">{selectedAmount.vs}</dd>
              </dl>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Údaje jsou ukázkové a před spuštěním se nahradí skutečným účtem. Nejsme veřejná sbírka. Jde o dar na činnost iniciativy. Při platbě na transparentní účet může být jméno a částka vidět ve výpisu.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Co podpora drží */}
        <section className="mt-20">
          <SectionHeader kicker="Kam dar směřuje" title="Co podpora drží" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <p className="text-left leading-relaxed text-muted-foreground">
              Publikujeme analýzy, komentáře a investigativní články, které vyvracejí dezinformace a doplňují kontext.
            </p>
            <p className="text-left leading-relaxed text-muted-foreground">
              Budujeme komunitu lidí, kterým není lhostejné, když se realita mění v propagandu.
            </p>
            <p className="text-left leading-relaxed text-muted-foreground">
              Věříme, že pravda potřebuje obhájce.
            </p>
          </div>
        </section>

        {/* 5. Kontakt */}
        <section className="mt-20 rounded-2xl bg-primary p-8 text-primary-foreground md:p-10">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Potřebujete potvrzení daru?
          </h2>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Napište nám na{" "}
            <a
              href="mailto:info@jednimhlasem.cz"
              className="font-semibold underline hover:text-white"
            >
              info@jednimhlasem.cz
            </a>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
