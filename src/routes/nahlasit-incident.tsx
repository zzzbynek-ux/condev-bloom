import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeader } from "@/components/section-header";

export const Route = createFileRoute("/nahlasit-incident")({
  head: () => ({
    meta: [
      { title: "Nahlaš nenávist, než zdomácní — JednímHlasem" },
      {
        name: "description",
        content:
          "Pokud máte zkušenost s projevem antisemitismu, extremismu nebo nenávisti, nahlaste to. Formulář Federace židovských obcí i náš formulář.",
      },
      { property: "og:title", content: "Nahlaš nenávist, než zdomácní — JednímHlasem" },
      {
        property: "og:description",
        content:
          "Antisemitismus není uzavřená kapitola dějin. Každé nahlášení má smysl.",
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

const FZO_FORM =
  "https://www.fzo.cz/projekty-fzo/forum-proti-antisemitismu/formular-nahlaseni/";

function NahlasitIncident() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <p className="kicker text-primary">Nahlásit incident</p>
            <h1 className="mt-3 max-w-3xl font-display text-[1.65rem] font-bold leading-[1.15] text-primary md:text-[1.85rem] lg:text-[2.1rem]">
              Nahlaš nenávist, než zdomácní
            </h1>
            <p className="mt-4 max-w-3xl text-[0.95rem] leading-[1.55] text-foreground">
              Pokud máte zkušenost s projevem antisemitismu, extremismu, jednáním na
              základě předsudků, nenávisti nebo diskriminace, můžete to nahlásit.
            </p>

            <img
              src="/images/nahlas-nenavist.jpg"
              alt="Nahlaš nenávist, než zdomácní"
              width={715}
              height={367}
              decoding="async"
              fetchPriority="high"
              className="mt-8 h-48 w-full rounded-xl object-cover md:h-64 lg:h-72"
            />

            <div className="mt-8 max-w-3xl space-y-4 text-[0.95rem] leading-[1.55] text-foreground">
              <p>
                Antisemitismus není uzavřená kapitola dějin. Je to přizpůsobivý
                společenský virus. Přežívá staletí, mutuje s dobou a mění jazyk a
                argumentaci. Cíl však zůstává stejný – vyčlenit, zněvěrohodnit,
                odlidštit. Každá generace se musí znovu rozhodnout, jak se k tomuto
                jedinečnému fenoménu postaví.
              </p>
              <p>
                Antisemitismus dnes nevypadá jen jako hákový kříž na zdi a nepatří
                jen extremistům. Proplétá se kulturou, politikou i internetem, často
                maskovaný jako „kritika Izraele“ nebo „jen názor“. Stejně nebezpečně
                ale přežívá v konspiračních teoriích i běžné řeči – v narážkách,
                memech a mýtech. Jeho podstata se ale nemění: vždy míří k tomu
                samému – k podezření, že Židé jsou nějak jiní.
              </p>
              <p>
                Šíření antisemitismu často odráží náladu ve společnosti. Není
                hrozbou jen pro židovskou komunitu, když se normalizuje, stává se
                nebezpečným pro všechny. Proto má být boj proti antisemitismu
                sdílenou odpovědností.
              </p>
              <p>
                Antisemitské incidenty se odehrávají ve fyzickém i online prostoru a
                mohou nabývat různých podob: fyzických či verbálních útoků,
                vandalizace majetku, vyhrožování, obtěžujícího chování, diskriminace,
                nenávistné korespondence, příspěvků na sociálních sítích, urážlivých
                letáků či plakátů apod. Projevy protižidovské předsudečné nenávisti
                mohou být namířeny proti Židům či proti osobám, které jsou za Židy
                považovány, proti institucím a proti majetku, který je skutečně či
                domněle spojen s židovskou komunitou.
              </p>
              <p>
                Podle dostupných analýz je antisemitismus v Česku i v Evropě výrazně
                podreportovaný. Zamlčené případy tak znamenají zamlčený problém.
                Proto má každé nahlášení smysl. Pomáhá zviditelnit realitu, dává
                obětem hlas a společnosti signál, že nenávist není legitimní názor,
                ale hrozba.
              </p>
              <p>
                Podle Strategie ČR pro boj proti antisemitismu je právě systematické
                hlášení klíčové pro účinnou prevenci a ochranu. Tam, kde není vidět
                problém, není vůle ho řešit.
              </p>
            </div>

            <p className="mt-8 font-display text-xl font-bold text-primary md:text-2xl">
              Antisemitismus roste tam, kde mlčíme.
            </p>
            <p className="mt-2 text-[0.95rem] leading-[1.55] text-foreground">
              Ticho není neutrální.
            </p>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader kicker="Kam nahlásit" title="Oficiální kanály" />
            <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
              <li className="card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <ExternalLink className="size-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-display text-lg font-bold text-primary">
                  Formulář Federace židovských obcí v ČR
                </h2>
                <p className="mt-2 flex-1 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  Oficiální hlášení antisemitského incidentu u FŽO.
                </p>
                <a
                  href={FZO_FORM}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-link mt-4 inline-flex items-center gap-1.5 text-primary"
                >
                  Otevřít formulář FŽO
                </a>
              </li>
              <li className="card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <Mail className="size-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-display text-lg font-bold text-primary">E-mail</h2>
                <p className="mt-2 flex-1 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  Napište přímo na adresu FŽO.
                </p>
                <a
                  href="mailto:antisemitismus@fzo.cz"
                  className="cta-link mt-4 inline-flex items-center gap-1.5 text-primary"
                >
                  antisemitismus@fzo.cz
                </a>
              </li>
              <li className="card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <Phone className="size-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-display text-lg font-bold text-primary">
                  Tísňová linka
                </h2>
                <p className="mt-2 flex-1 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  V případě nouze nebo ohrožení volejte tísňovou linku.
                </p>
                <a
                  href="tel:112"
                  className="cta-link mt-4 inline-flex items-center gap-1.5 text-primary"
                >
                  112
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="formular" className="scroll-mt-32">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <SectionHeader
              kicker="Nahlásit u nás"
              title="Formulář JednímHlasem"
              subtitle="Popište, co se stalo. Hlášení můžete poslat i anonymně — kontakt vyplňte jen, pokud se máme doptat. Formulář nenahrazuje trestní oznámení."
            />

            {sent ? (
              <div className="mt-8 max-w-3xl rounded-xl border border-border bg-card p-8 text-center">
                <h2 className="font-display text-2xl font-bold text-primary">
                  Děkujeme za hlášení
                </h2>
                <p className="mt-3 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  Hlášení jsme přijali. Pokud jste uvedli kontakt, ozveme se vám.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 inline-flex h-11 items-center rounded-full border border-primary px-6 text-sm font-semibold text-primary"
                >
                  Nahlásit další
                </button>
              </div>
            ) : (
              <form
                className="mt-8 grid max-w-3xl gap-5 rounded-xl border border-border bg-card p-6 md:p-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Typ incidentu</span>
                  <select
                    required
                    className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
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
                    <input
                      type="date"
                      className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Kde (město, web, síť)</span>
                    <input
                      type="text"
                      placeholder="např. Praha, Facebook…"
                      className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Popis incidentu</span>
                  <textarea
                    required
                    rows={6}
                    placeholder="Co se stalo, kdo byl přítomen, co bylo řečeno…"
                    className="rounded-lg border border-border bg-paper px-4 py-3 text-sm"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Odkaz na důkaz (nepovinné)</span>
                  <input
                    type="url"
                    placeholder="https://…"
                    className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Váš e-mail (nepovinné)</span>
                  <input
                    type="email"
                    placeholder="abychom se mohli doptat"
                    className="h-11 rounded-lg border border-border bg-paper px-4 text-sm"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex h-11 w-fit items-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Odeslat hlášení
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
