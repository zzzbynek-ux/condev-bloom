export const INTRO = {
  eyebrow: "O NÁS",
  title:
    "Jedním hlasem neznamená všichni stejně, ale společně za to, co nás spojuje.",
  paragraphs: [
    "JednímHlasem podporujeme Izrael a jeho právo na existenci a sebeobranu. Bojujeme proti antisemitismu ve všech jeho formách. Vyvracíme dezinformace, které zkreslují realitu. Posilujeme odvážné hlasy, které se nebojí promluvit. A budujeme komunitu, která se navzájem inspiruje a chrání hodnoty, na nichž stojí svobodná společnost.",
    "JednímHlasem je nezávislá občanská iniciativa a otevřená platforma, která vznikla jako reakce na rostoucí dezinformace, selektivní empatii a zkreslený obraz Izraele ve veřejném prostoru.",
  ] as const,
};

export const SLOGAN = "Nechceme stejný názor. Chceme stejná fakta.";

export const VALUES = [
  {
    index: "01",
    title: "Izrael",
    text: "Podporujeme Izrael jako demokratický stát s právem na existenci a sebeobranu.",
  },
  {
    index: "02",
    title: "Antisemitismus",
    text: "Odmítáme antisemitismus ve všech jeho podobách – ať už se skrývá za tzv. kritiku politiky, levicový aktivismus nebo konspirační teorie krajní pravice.",
  },
  {
    index: "03",
    title: "Svobodný svět",
    text: "Věříme, že obhajoba Izraele je zároveň obranou principů svobodného světa.",
  },
] as const;

export type Axis = {
  kicker: string;
  title: string;
  text: string;
  href: string;
  cta: string;
};

export const AXES: Axis[] = [
  {
    kicker: "Klíčové téma",
    title: "Antisemitismus",
    text: "Nový antisemitismus se tváří jako morální apel. Pod pláštíkem solidarity jde o démonizaci židovského státu.",
    href: "/antisemitismus",
    cta: "Otevřít téma",
  },
  {
    kicker: "Identita",
    title: "Malý stát. Globální přínos.",
    text: "Izrael není jen spojencem Západu. Je jeho součástí — od technologií přes medicínu až po humanitární pomoc.",
    href: "/clanky/izrael-haji-vic-nez-jen-vlastni-hranice",
    cta: "Číst článek",
  },
  {
    kicker: "Média",
    title: "Média ve službách teroru",
    text: "Když přijde na Izrael, redakce často přebírají informace od teroristů. Lži letí rychleji než fakta.",
    href: "/clanky/masinerie-lzi-kdyz-media-mluvi-za-hamas",
    cta: "Číst článek",
  },
];

export const WHAT_WE_DO = {
  title: "Co děláme",
  paragraphs: [
    "Publikujeme analýzy, komentáře a investigativní články, které vyvracejí dezinformace a doplňují kontext.",
    "Vytváříme kampaně a obsah, který přináší věcný, srozumitelný a důstojný pohled na dění v Izraeli, České republice i v dalších západních zemích.",
    "Sledujeme a komentujeme mediální zkreslení i roli NGO, akademie a dalších institucí ve formování veřejného obrazu Izraele.",
    "Budujeme komunitu lidí, kterým není lhostejné, když se realita mění v propagandu.",
  ] as const,
};

export const MISSION = {
  title: "Naše mise",
  paragraphs: [
    "Věříme, že pravda potřebuje obhájce. V čase, kdy jsou fakta zpochybňována a nenávist se maskuje jako humanismus, je potřeba mluvit jasně a přesvědčivě.",
    "JednímHlasem propojuje odborníky, novináře, akademiky i aktivní občany, kteří sdílejí závazek k odpovědné debatě o Izraeli, antisemitismu a hodnotách svobodného světa.",
  ] as const,
};

export const GET_INVOLVED = {
  title: "Zapojte se",
  text: "JednímHlasem je otevřená platforma. Nabízíme prostor autorům, kteří chtějí publikovat vlastní články, analýzy nebo komentáře.",
  primary: {
    label: "Napsat na info@jednimhlasem.cz",
    href: "mailto:info@jednimhlasem.cz",
  },
  secondary: { label: "Jak se zapojit", href: "/zapojte-se" },
} as const;
