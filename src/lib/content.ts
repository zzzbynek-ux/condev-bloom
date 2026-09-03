import { articlesIn, formatDate, shuffle, IMPORTED } from "./articles";

export type Topic = {
  slug: string;
  kicker: string;
  title: string;
  perex: string;
};

export const TOPICS: Topic[] = [
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

/** Rubriky ve druhém navigačním pruhu */
export const SECTIONS = [
  "Izrael a Židé",
  "Antisemitismus",
  "Média a instituce",
  "Bezpečnost a ideologie",
  "Hlasy a příběhy",
  "Reporty",
] as const;

/** Manifesty v hero slideru */
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
    kicker: "Antisemitismus",
    title: "Antisemitismus 2.0",
    text: "Nový antisemitismus mluví jazykem solidarity a historické křivdy. Nacistickou pásku nahradila kefíja — ale posedlost Židy zůstala.",
  },
  {
    kicker: "Co doplňujeme",
    title: "Celý obraz. Bez ořezu.",
    text: "Když veřejný prostor ovládají silná slova a jednostranné příběhy, přinášíme témata, která zůstávají mimo pozornost. Spravedlnost není selektivní.",
  },
  {
    kicker: "Ideologie",
    title: "Rudo-zelená aliance",
    text: "Útoky na Židy rostou z ideologického spojenectví progresivní levice a islamismu, jež pod pláštíkem lidských práv legitimizuje násilí.",
  },
  {
    kicker: "Média",
    title: "Média ve službách teroru",
    text: "Západní média se prezentují jako objektivní strážci pravdy. Když ale přijde na Izrael, přebírají informace od teroristů bez váhání.",
  },
  {
    kicker: "Vliv",
    title: "Zaměřeno na Katar",
    text: "Protesty na univerzitách, výkřiky v ulicích i virální příspěvky spojuje víc, než se zdá. Ukazujeme, jak hluboko sahá katarský vliv.",
  },
  {
    kicker: "Blízký východ",
    title: "Mír začíná s pravdou",
    text: "Konflikt není jen o dvou stranách. Arabské státy a mezinárodní instituce ho nejen sledují — udržují ho při životě.",
  },
];

/** Zkrácený výběr pro hero slider — zbytek žije na /manifest */
export const HERO_SLIDES = SLIDES.slice(0, 4);


/** Tři zvýrazněné karty pod rychlými akcemi */
export const FEATURED = [
  {
    title: "Změň algoritmus\n— změníš realitu",
    text: "Diskuze a komentáře na sociálních sítích ovlivňují naši realitu.",
    tone: "sand",
    tag: "Výběr redakce",
    date: "05/07/25",
  },
  {
    title: "Malý stát.\nGlobální přínos.",
    text: "Naše podpora a aktivity mají globální dosah.",
    tone: "flag",
    tag: "Výběr redakce",
    date: "05/07/25",
  },
  {
    title: "Slogany živí\nemoce, ne mír",
    text: "Přestaňme podléhat prázdným heslům a hledejme skutečné řešení.",
    tone: "red",
    tag: "Výběr redakce",
    date: "05/07/25",
  },
] as const;


export type NewsItem = {
  slug: string;
  tag: string;
  tagTone: "primary" | "dark";
  title: string;
  perex: string;
  date: string;
  image: "flags" | "media" | "politics";
};

export const LATEST: NewsItem[] = [
  {
    slug: "propustte-rukojmi",
    tag: "Analýza",
    tagTone: "primary",
    title: "Propusťte rukojmí!",
    perex: "Informace o zadržovaných izraelských rukojmích v Gaze.",
    date: "5. 7. 2026",
    image: "flags",
  },
  {
    slug: "media-ve-sluzbach-teroru",
    tag: "Média",
    tagTone: "dark",
    title: "Média ve službách teroru",
    perex: "Jak západní média šíří dezinformace.",
    date: "12. 6. 2026",
    image: "media",
  },
  {
    slug: "rudo-zelena-aliance",
    tag: "Analýza",
    tagTone: "primary",
    title: "Rudo-zelená aliance",
    perex: "Spojenectví progresivní levice a islámu.",
    date: "28. 5. 2026",
    image: "politics",
  },
  {
    slug: "zamereno-na-katar",
    tag: "Report",
    tagTone: "dark",
    title: "Zaměřeno na Katar",
    perex: "Kdo financuje kampaně na univerzitách.",
    date: "14. 5. 2026",
    image: "politics",
  },
  {
    slug: "wiki-jako-nastroj-vlivu",
    tag: "Dezinformace",
    tagTone: "primary",
    title: "Wiki jako nástroj vlivu",
    perex: "Systematické zkreslování otevřené encyklopedie.",
    date: "30. 4. 2026",
    image: "media",
  },
  {
    slug: "mir-zacina-s-pravdou",
    tag: "Analýza",
    tagTone: "dark",
    title: "Mír začíná s pravdou",
    perex: "Mýty, které konflikt udržují při životě.",
    date: "19. 4. 2026",
    image: "flags",
  },
];

export type FeedItem = {
  slug: string;
  tag: string;
  date: string;
  title: string;
  perex: string;
  image: string;
};

export type FeedGroup = {
  id: string;
  label: string;
  showAll: boolean;
  items: FeedItem[];
};


export const HERO_BANNER = [
  { kicker: "Proč to děláme", title: "Malý stát. Globální přínos.", text: "Izrael není jen spojencem Západu, je jeho součástí. Přináší světu víc, než by odpovídalo jeho velikosti — od technologií přes medicínu až po humanitární pomoc.", image: "/images/hero/maly-stat.jpg", focus: "80% 45%" },
  { kicker: "Jak to funguje", title: "Jeden klik mění svět", text: "Pod příspěvkem s tisíci lajky se objeví jediný věcný komentář a naruší sdílený obraz. Algoritmus je jednoduchý: čím víc reakcí, tím větší dosah.", image: "/images/hero/jeden-klik.jpg", focus: "50% 40%" },
  { kicker: "Antisemitismus", title: "Antisemitismus 2.0", text: "Nový antisemitismus mluví jazykem solidarity a historické křivdy. Nacistickou pásku nahradila kefíja — ale posedlost Židy zůstala.", image: "/images/hero/antisemitismus.jpg", focus: "70% 30%" },
  { kicker: "Výběr redakce", title: "Slogany živí emoce, ne mír", text: "Přestaňme podléhat prázdným heslům a hledejme skutečné řešení.", image: "/images/hero/slogany.jpg", focus: "50% 50%" },
  { kicker: "Ideologie", title: "Rudo-zelená aliance", text: "Útoky na Židy rostou z ideologického spojenectví progresivní levice a islamismu, jež pod pláštíkem lidských práv legitimizuje násilí.", image: "/images/hero/rudo-zelena.jpg", focus: "45% 40%" },
  { kicker: "Média", title: "Média ve službách teroru", text: "Západní média se prezentují jako objektivní strážci pravdy. Když ale přijde na Izrael, přebírají informace od teroristů bez váhání.", image: "/images/hero/media-teror.jpg", focus: "50% 45%" },
  { kicker: "Vliv", title: "Zaměřeno na Katar", text: "Protesty na univerzitách, výkřiky v ulicích i virální příspěvky spojuje víc, než se zdá. Ukazujeme, jak hluboko sahá katarský vliv.", image: "/images/hero/katar.jpg", focus: "55% 40%" },
  { kicker: "Dezinformace", title: "Wiki jako nástroj vlivu", text: "Záměrná manipulace a systematické zkreslování faktů proměňují otevřenou encyklopedii ve vlivový nástroj.", image: "/images/hero/wiki.jpg", focus: "50% 40%" },
] as const;

function toItem(a: { slug: string; tag: string; iso: string; title: string; perex: string; image: string }) {
  return { slug: a.slug, tag: a.tag, date: formatDate(a.iso), title: a.title, perex: a.perex, image: a.image };
}

const KONRAD = {
  slug: "tydyt-konrad-stavridis",
  tag: "Tydýt",
  date: "2. 9. 2026",
  title: "Konrad Stavridis",
  perex: "Tento týden vysvětluje, proč se o Izraeli mluví jinak než o jiných státech. Krátký, věcný pohled na jedno téma.",
  image: "/images/tydyt-konrad.jpg",
};

export const ARTICLE_SECTIONS: FeedGroup[] = [
  { id: "nove", label: "Nové", showAll: true, items: articlesIn("nove").slice(0, 12).map(toItem) },
  { id: "doporucujeme", label: "Doporučujeme", showAll: true, items: shuffle(articlesIn("doporucujeme")).slice(0, 12).map(toItem) },
  { id: "cesi-a-izrael", label: "Češi a Izrael", showAll: true, items: articlesIn("cesi-a-izrael").slice(0, 12).map(toItem) },
  { id: "studie", label: "Studie a analýzy", showAll: true, items: articlesIn("studie").slice(0, 12).map(toItem) },
  { id: "tydyt", label: "Tydýt týdne", showAll: true, items: [KONRAD] },
  { id: "vse", label: "Všechny texty", showAll: true, items: IMPORTED.slice(0, 24).map(toItem) },
];

export const FEED: FeedGroup[] = ARTICLE_SECTIONS.filter((g) => g.id === "nove" || g.id === "cesi-a-izrael");

export const TYDYT_RECENT = [
  { slug: "tydyt-konrad-stavridis", title: "Konrad Stavridis", date: "02/09/26" },
] as const;

export function allArticles() {
  const seen = new Set<string>();
  const out: FeedItem[] = [];
  for (const a of IMPORTED) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    out.push(toItem(a));
  }
  return out;
}
