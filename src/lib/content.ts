export type Topic = {
  slug: string;
  kicker: string;
  title: string;
  perex: string;
};

export const TOPICS: Topic[] = [
  {
    slug: "antisemitismus-2-0",
    kicker: "Antisemitismus",
    title: "Antisemitismus 2.0",
    perex:
      "Nový antisemitismus se tváří jako morální apel. Pod pláštíkem vznešených slov ale jde o démonizaci a delegitimizaci židovského státu.",
  },
  {
    slug: "media-ve-sluzbach-teroru",
    kicker: "Média",
    title: "Média ve službách teroru",
    perex:
      "Když přijde na Izrael, redakce často bez váhání přebírají informace od teroristů. Výsledkem je informační válka, kde lži letí rychleji než fakta.",
  },
  {
    slug: "zamereno-na-katar",
    kicker: "Vliv",
    title: "Zaměřeno na Katar",
    perex:
      "Za atmosférou nenávisti vůči Izraeli stojí promyšlená, štědře financovaná kampaň s kořeny v Kataru. Ukazujeme, kam až sahá.",
  },
  {
    slug: "rudo-zelena-aliance",
    kicker: "Ideologie",
    title: "Rudo-zelená aliance",
    perex:
      "Spojenectví progresivní levice a islamismu pod pláštíkem lidských práv legitimizuje násilí a rozkládá morální páteř demokracií.",
  },
  {
    slug: "wiki-jako-nastroj-vlivu",
    kicker: "Dezinformace",
    title: "Wiki jako nástroj vlivu",
    perex:
      "Záměrná manipulace a systematické zkreslování faktů proměňují otevřenou encyklopedii ve vlivový nástroj.",
  },
  {
    slug: "mir-zacina-s-pravdou",
    kicker: "Blízký východ",
    title: "Mír začíná s pravdou",
    perex:
      "Konflikt není jen o dvou stranách. Arabské státy a mezinárodní instituce ho nejen sledují — udržují ho při životě.",
  },
];

export const SLIDES = [
  {
    kicker: "Proč to děláme",
    title: "Malý stát. Globální přínos.",
    text: "Izrael není jen spojencem Západu, je jeho součástí. Přináší světu víc, než by odpovídalo jeho velikosti — od technologií přes medicínu až po humanitární pomoc.",
  },
  {
    kicker: "Jak to funguje",
    title: "Jeden klik mění svět",
    text: "Pod příspěvkem s tisíci lajky se objeví jediný věcný komentář a naruší sdílený obraz. Algoritmus je jednoduchý: čím víc reakcí, tím větší dosah.",
  },
  {
    kicker: "Co doplňujeme",
    title: "Celý obraz. Bez ořezu.",
    text: "Když veřejný prostor ovládají silná slova a jednostranné příběhy, přinášíme témata, která zůstávají mimo pozornost. Spravedlnost není selektivní.",
  },
];
