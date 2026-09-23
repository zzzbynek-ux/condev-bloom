import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { csNbsp } from "@/lib/typo";

export const Route = createFileRoute("/nahlasit-incident")({
  head: () => ({
    meta: [
      { title: "Nahlaš nenávist, než zdomácní — Jedním hlasem" },
      {
        name: "description",
        content:
          "Pokud máte zkušenost s projevem antisemitismu, extremismu nebo nenávisti, nahlaste to. Formulář Federace židovských obcí, e-mail a tísňová linka.",
      },
      { property: "og:title", content: "Nahlaš nenávist, než zdomácní — Jedním hlasem" },
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

const FZO_FORM =
  "https://www.fzo.cz/projekty-fzo/forum-proti-antisemitismu/formular-nahlaseni/";

function NahlasitIncident() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <p className="kicker text-primary">Nahlásit incident</p>
            <h1 className="home-section-title mt-3 max-w-3xl">
              Nahlaš nenávist, než zdomácní
            </h1>
            <p className="mt-4 max-w-3xl text-[0.95rem] leading-[1.55] text-foreground">
              Pokud máte zkušenost s projevem antisemitismu, extremismu, jednáním na
              základě předsudků, nenávisti nebo diskriminace, můžete to nahlásit.
            </p>

            <div className="mt-12">
            <p className="kicker text-primary">Kam nahlásit</p>
            <h2 className="home-section-title mt-2">Oficiální kanály</h2>
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
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <img
              src="/images/nahlas-nenavist.jpg"
              alt="Nahlaš nenávist, než zdomácní"
              width={715}
              height={367}
              decoding="async"
              loading="lazy"
              className="h-48 w-full rounded-xl object-cover md:h-64 lg:h-72"
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
      </main>
      <SiteFooter />
    </div>
  );
}
