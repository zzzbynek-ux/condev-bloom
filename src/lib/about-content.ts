export const INTRO = {
  eyebrow: "O NÁS",
  title: "Jedním hlasem neznamená všichni stejně, ale společně za to, co nás spojuje.",
  perex:
    "JednímHlasem je nezávislá občanská iniciativa a otevřená platforma, která vznikla jako reakce na rostoucí dezinformace, selektivní empatii a zkreslený obraz Izraele ve veřejném prostoru. Naším cílem je vracet fakta, kontext a důstojnost do debaty – v době, kdy se realita ohýbá podle ideologie a pravda přizpůsobuje algoritmům.",
  links: [
    { label: "Naše hodnoty", href: "#hodnoty" },
    { label: "Naše osy", href: "#osy" },
    { label: "Zapojte se", href: "#zapojte-se" },
  ] as const,
};

export const PILLARS = [
  {
    title: "Izrael",
    text: "Podporujeme Izrael a jeho právo na existenci a sebeobranu.",
  },
  {
    title: "Antisemitismus",
    text: "Bojujeme proti antisemitismu ve všech jeho formách.",
  },
  {
    title: "Pravda",
    text: "Vyvracíme dezinformace, posilujeme odvážné hlasy a chráníme hodnoty svobodné společnosti.",
  },
] as const;

export const VALUES = [
  "Podporujeme Izrael jako demokratický stát s právem na existenci a sebeobranu.",
  "Odmítáme antisemitismus ve všech jeho podobách – ať už se skrývá za tzv. kritiku politiky, levicový aktivismus nebo konspirační teorie krajní pravice.",
  "Věříme, že obhajoba Izraele je zároveň obranou principů svobodného světa.",
] as const;

export type Axis = {
  kicker: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  featured?: boolean;
};

export const AXES: Axis[] = [
  {
    kicker: "Identita",
    title: "Malý stát. Globální přínos.",
    text:
      "Izrael není jen spojencem Západu. Je jeho součástí. A právě proto si zaslouží naši pozornost i podporu. Přináší světu víc, než by odpovídalo jeho velikosti – od technologických inovací přes medicínu až po humanitární pomoc.",
    href: "/clanky/maly-stat-globalni-prinos",
    cta: "Číst článek",
  },
  {
    kicker: "Jeden klik",
    title: "Jeden klik mění svět",
    text:
      "Pod příspěvkem s tisíci lajky se objeví jediný komentář — stručný, věcný, rezonující. Naruší sdílený obraz a připomene, co ostatní přehlédli. Tak dnes vypadá zápas o pravdu. Algoritmus je jednoduchý: čím víc reakcí, tím větší dosah.",
    href: "/clanky",
    cta: "Číst článek",
  },
  {
    kicker: "KLÍČOVÉ TÉMA",
    title: "Antisemitismus",
    text:
      "Nový antisemitismus se tváří jako morální apel — mluví jazykem solidarity a historické křivdy. Ale pod pláštíkem vznešených slov jde o démonizaci a delegitimizaci židovského státu. Nacistickou pásku nahradila kefíja — ale posedlost Židy zůstala.",
    href: "https://community.condevweb.com/antisemitismus/",
    cta: "Otevřít téma",
    featured: true,
  },
  {
    kicker: "Ideologie",
    title: "Rudo-zelená aliance",
    text:
      "Spojenectví progresivní levice a islamismu pod pláštíkem lidských práv legitimizuje násilí a rozkládá morální páteř demokracií.",
    href: "/clanky/rudo-zelena-aliance",
    cta: "Číst článek",
  },
  {
    kicker: "Média",
    title: "Média ve službách teroru",
    text:
      "Když přijde na Izrael, redakce často bez váhání přebírají informace od teroristů. Výsledkem je informační válka, kde lži letí rychleji než fakta.",
    href: "/clanky/media-ve-sluzbach-teroru",
    cta: "Číst článek",
  },
  {
    kicker: "Vliv",
    title: "Zaměřeno na Katar",
    text:
      "Za atmosférou nenávisti vůči Izraeli stojí promyšlená, štědře financovaná kampaň s kořeny v Kataru. Ukazujeme, kam až sahá.",
    href: "/clanky/zamereno-na-katar",
    cta: "Číst článek",
  },
  {
    kicker: "Blízký východ",
    title: "Mír začíná s pravdou",
    text:
      "Konflikt není jen o dvou stranách. Arabské státy a mezinárodní instituce ho nejen sledují — udržují ho při životě.",
    href: "/clanky/mir-zacina-s-pravdou",
    cta: "Číst článek",
  },
  {
    kicker: "Dezinformace",
    title: "Wiki jako nástroj vlivu",
    text:
      "Záměrná manipulace a systematické zkreslování faktů proměňují otevřenou encyklopedii ve vlivový nástroj.",
    href: "/clanky/wiki-jako-nastroj-vlivu",
    cta: "Číst článek",
  },
  {
    kicker: "Hlasy",
    title: "Odlišní vírou, spojeni svědomím",
    text:
      "Křesťané i muslimové otevřeně vystupují proti nenávisti. Jejich hlasy v debatě chybí nejvíc.",
    href: "/clanky/odlisni-virou",
    cta: "Číst článek",
  },
] as const;

export const WHAT_WE_DO = {
  title: "Co děláme",
  text:
    "Publikujeme analýzy, komentáře a investigativní články, které vyvracejí dezinformace a doplňují kontext. Vytváříme kampaně a obsah, který přináší věcný, srozumitelný a důstojný pohled na dění v Izraeli, České republice i v dalších západních zemích. Sledujeme a komentujeme mediální zkreslení i roli NGO, akademie a dalších institucí ve formování veřejného obrazu Izraele. Budujeme komunitu lidí, kterým není lhostejné, když se realita mění v propagandu.",
} as const;

export const MISSION = {
  title: "Naše mise",
  text:
    "Věříme, že pravda potřebuje obhájce. V čase, kdy jsou fakta zpochybňována a nenávist se maskuje jako humanismus, je potřeba mluvit jasně a přesvědčivě. JednímHlasem propojuje odborníky, novináře, akademiky i aktivní občany, kteří sdílejí závazek k odpovědné debatě o Izraeli, antisemitismu a hodnotách svobodného světa.",
} as const;

export const GET_INVOLVED = {
  title: "Zapojte se",
  text:
    "JednímHlasem je otevřená platforma. Nabízíme prostor autorům, kteří chtějí publikovat vlastní články, analýzy nebo komentáře.",
  primary: { label: "Napsat na info@jednimhlasem.cz", href: "mailto:info@jednimhlasem.cz" },
  secondary: { label: "Jak se zapojit", href: "/zapojte-se" },
} as const;
