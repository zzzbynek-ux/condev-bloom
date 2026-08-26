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

/** Tři zvýrazněné karty pod rychlými akcemi */
export const FEATURED = [
  {
    title: "Změň algoritmus\n— změníš realitu",
    text: "Diskuze a komentáře na sociálních sítích ovlivňují naši realitu.",
    tone: "sand",
  },
  {
    title: "Malý stát.\nGlobální přínos.",
    text: "Naše podpora a aktivity mají globální dosah.",
    tone: "flag",
  },
  {
    title: "Slogany živí\nemoce, ne mír",
    text: "Přestaňme podléhat prázdným heslům a hledejme skutečné řešení.",
    tone: "red",
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
  image: "flags" | "media" | "politics";
};

export type FeedGroup = {
  id: string;
  label: string;
  showAll: boolean;
  items: FeedItem[];
};

export const FEED: FeedGroup[] = [
  {
    id: "nove",
    label: "Nové",
    showAll: false,
    items: [
      {
        slug: "propustte-rukojmi",
        tag: "Ullamcorper",
        date: "05/07/25",
        title: "Propusťte rukojmí!",
        perex:
          "Izraelští rukojmí — někteří zavraždění, jiní stále ukrytí v tunelech Gazy. Svět zapomíná. My ne. Jejich příběhy musíme držet nad hladinou.",
        image: "flags",
      },
      {
        slug: "odlisni-virou",
        tag: "Ullamcorper",
        date: "05/07/25",
        title: "Odlišní vírou, spojeni svědomím",
        perex:
          "V debatě o Izraeli často nejsilněji hlasy nejchybějí jen z Jeruzaléma. Křesťané a muslimové otevřeně vystupují proti nenávisti.",
        image: "politics",
      },
      {
        slug: "masinerie-lzi",
        tag: "Ullamcorper",
        date: "05/07/25",
        title: "Mašinerie lží: když média mluví za Hamás",
        perex:
          "Západní média se tváří jako objektivní strážci pravdy. Ale když přijde na Izrael, často bez váhání přebírají informace od teroristů.",
        image: "media",
      },
    ],
  },
  {
    id: "cesi-a-izrael",
    label: "Češi a Izrael",
    showAll: true,
    items: [
      {
        slug: "maly-stat-globalni-prinos",
        tag: "Viverrae",
        date: "05/07/25",
        title: "Malý stát. Globální přínos.",
        perex:
          "Izrael není jen spojencem Západu, je jeho součástí. A právě proto si zaslouží naši pozornost i podporu. Přináší světu víc, než by odpovídalo jeho velikosti.",
        image: "flags",
      },
      {
        slug: "masinerie-lzi",
        tag: "Ullamcorper",
        date: "05/07/25",
        title: "Mašinerie lží: když média mluví za Hamás",
        perex:
          "Západní média se tváří jako objektivní strážci pravdy. Ale když přijde na Izrael, často bez váhání přebírají informace od teroristů.",
        image: "media",
      },
      {
        slug: "zamereno-na-katar",
        tag: "Ullamcorper",
        date: "24/06/25",
        title: "Zaměřeno na Katar: peníze, moc, propaganda",
        perex:
          "Protesty na univerzitách, výkřiky v ulicích i virální příspěvky mají společného víc, než se zdá. Za atmosférou nenávisti stojí kampaň.",
        image: "politics",
      },
    ],
  },
  {
    id: "studie-a-analyzy",
    label: "Studie a analýzy",
    showAll: true,
    items: [
      {
        slug: "propustte-rukojmi",
        tag: "Ullamcorper",
        date: "05/07/25",
        title: "Propusťte rukojmí!",
        perex:
          "Izraelští rukojmí — někteří zavraždění, jiní stále ukrytí v tunelech Gazy. Svět zapomíná. My ne. Jejich příběhy musíme držet nad hladinou.",
        image: "flags",
      },
      {
        slug: "novy-antisemitismus",
        tag: "Ullamcorper",
        date: "02/07/25",
        title: "Nový antisemitismus: o Palestinu tady vůbec nejde",
        perex:
          "Nový antisemitismus se tváří jako morální apel — mluví jazykem solidarity, obětí a historické křivdy. Ale pod pláštíkem vznešených slov nejde o Palestinu.",
        image: "politics",
      },
      {
        slug: "wiki-jako-nastroj-vlivu",
        tag: "Ullamcorper",
        date: "24/06/25",
        title: "Když fakta nejsou fakta: Wiki jako nástroj vlivu",
        perex:
          "Wikipedia je symbolem otevřeného sdílení znalostí. Ale co když právě její otevřenost umožňuje i tiché přepisování reality?",
        image: "media",
      },
    ],
  },
];
