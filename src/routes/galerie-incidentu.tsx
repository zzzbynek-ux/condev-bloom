import { createFileRoute } from "@tanstack/react-router";

import { Tag } from "@/components/tag";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { csNbsp } from "@/lib/typo";

export const Route = createFileRoute("/galerie-incidentu")({
  head: () => ({
    meta: [
      { title: "Archiv incidentů — Jedním hlasem" },
      {
        name: "description",
        content:
          "Antisemitismus není uzavřená kapitola dějin. Dokumentujeme jeho současné podoby — ve veřejném prostoru, na sítích i v soukromých výhrůžkách.",
      },
      { property: "og:title", content: "Archiv incidentů — Jedním hlasem" },
      {
        property: "og:description",
        content:
          "Dokumentujeme současné podoby antisemitismu ve veřejném prostoru, na sítích i v soukromých výhrůžkách.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArchivIncidentu,
});

const INCIDENTS = [
  {
    src: "/images/galerie/dvere.jpg",
    chip: "Vandalismus",
    title: "Barva na dveřích židovské budovy",
    perex: "Červená barva rozlitá před vchodem. Útok na místo spojené s židovskou komunitou.",
  },
  {
    src: "/images/galerie/rukojmi.jpg",
    chip: "Veřejný prostor",
    title: "Stržené plakáty rukojmích",
    perex: "Portréty unesených 7. října stržené ze zdi. Útok na paměť obětí, ne na „politiku“.",
  },
  {
    src: "/images/galerie/slogan.jpg",
    chip: "Praha",
    title: "„From the river to the sea“",
    perex: "Happening Solidarity. Slogan, který popírá právo Izraele na existenci.",
  },
  {
    src: "/images/galerie/protest.jpg",
    chip: "Protest",
    title: "Transparent na pochodu",
    perex:
      "Izrael jako jediný viník. Typický posun od politiky k plošnému obvinění židovského státu.",
  },
  {
    src: "/images/galerie/pangea.jpg",
    chip: "Praha · 8. 3.",
    title: "Palestinian Feminist Bloc",
    perex: "Výzva na náměstí Jana Palacha. Pangea Prague, Mezinárodní den žen.",
  },
  {
    src: "/images/galerie/nazionismo.jpg",
    chip: "Online propaganda",
    title: "Plakát „Nazionismo“",
    perex: "Izraelská vlajka překrytá hákovým křížem. Klasická rovnice Žid = nacista.",
  },
] as const;

function ArchivIncidentu() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section className="section-y">
          <div className="mx-auto max-w-[88rem] px-5 md:px-6">
            <p className="kicker text-primary">{csNbsp("Klíčové téma")}</p>
            <h1 className="home-section-title mt-1">{csNbsp("Archiv incidentů")}</h1>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-[1.55] text-foreground">
              {csNbsp(
                "Antisemitismus není uzavřená kapitola dějin. Dokumentujeme jeho současné podoby — ve veřejném prostoru, na sítích i v soukromých výhrůžkách.",
              )}
            </p>

            <div className="galerie-grid mt-8">
              {INCIDENTS.map((item) => (
                <article key={item.src} className="galerie-card">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="galerie-photo"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={520}
                  />
                  <div className="galerie-card-body">
                    <Tag>{item.chip}</Tag>
                    <h2 className="mt-3 font-display text-[1.15rem] font-bold leading-snug text-primary">
                      {csNbsp(item.title)}
                    </h2>
                    <p className="mt-2 text-[0.95rem] leading-[1.55] text-muted-foreground">
                      {csNbsp(item.perex)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="galerie-mail">
              <div className="min-w-0">
                <p className="kicker text-primary">{csNbsp("Květen")}</p>
                <h2 className="font-display text-[1.15rem] font-bold text-primary">
                  {csNbsp("E-mail zaslaný zaměstnancům ŽOP")}
                </h2>
                <p className="mt-1 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  {csNbsp(
                    "„Tak vy sluzebnici zla, brzy uvidite, co se s vami bude dit. Vas cas se nachyluje. Fakt se teste vy perfidni zidi. My uz jsme na Vas nachystani.“",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
