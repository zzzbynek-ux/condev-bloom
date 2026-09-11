import { articlesIn, formatDate, shuffle, IMPORTED } from "./articles";

export type Topic = {
  slug: string;
  kicker: string;
  title: string;
  perex: string;
};

export const TOPICS: Topic[] = [
  {
    slug: "masinerie-lzi-kdyz-media-mluvi-za-hamas",
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
    slug: "mir-zacina-pravdou",
    kicker: "Blízký východ",
    title: "Mír začíná s pravdou",
    perex:
      "Konflikt není jen o dvou stranách. Arabské státy a mezinárodní instituce ho nejen sledují — udržují ho při životě.",
  },
];

/** Rubriky ve druhém navigačním pruhu */
export const SECTIONS = [
  "Izrael a Židé",
  "Antisemitismus",
  "Média a instituce",
  "Bezpečnost a ideologie",
  "Hlasy a příběhy",
  "Reporty",
] as const;
