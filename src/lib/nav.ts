// Navigace a hlavička: skupiny, položky a odkazy na jednom místě.
// Změna menu = úprava tohoto souboru, komponenta site-header.tsx se nemění.

type InternalTarget = {
  to:
    | "/"
    | "/clanky"
    | "/antisemitismus"
    | "/galerie-incidentu"
    | "/nahlasit-incident"
    | "/o-nas"
    | "/zapojte-se"
    | "/kontakt"
    | "/eshop"
    | "/ochrana-osobnich-udaju";
  /** Filtr rubriky na /clanky (?filtr=…). */
  search?: { filtr?: string };
};
type ExternalTarget = { href: string };

export type NavItem = (InternalTarget | ExternalTarget) & {
  label: string;
  /** Malý štítek vedle popisku (např. „brzy“). */
  badge?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
  /** Poslední odkaz nabídky („Všechny texty →“). */
  all?: NavItem;
};

// PROVIZORNÍ: Gaza GenoLIE vede na úvod kampaně; Anticena, Výstavy a „Všechny projekty“ zatím nemají stránku,
// proto jsou zakomentované (odkomentujte, až stránky vzniknou).
const PROJEKTY_ITEMS: NavItem[] = [
  { label: "Gaza GenoLIE", href: "https://gazagenolie.com/" },
  // { label: "Anticena", to: "/anticena" },
  // { label: "Výstavy", to: "/vystavy" },
];

export const ARTICLES_GROUP: NavGroup = {
  id: "clanky",
  label: "Články",
  items: [
    { label: "Nové", to: "/clanky" },
    { label: "Doporučujeme", to: "/clanky", search: { filtr: "doporucujeme" } },
    { label: "Češi a Izrael", to: "/clanky", search: { filtr: "cesi-a-izrael" } },
    { label: "Studie a analýzy", to: "/clanky", search: { filtr: "studie" } },
  ],
  all: { label: "Všechny texty", to: "/clanky", search: { filtr: "vse" } },
};

export const ANTISEMITISMUS_GROUP: NavGroup = {
  id: "antisemitismus",
  label: "Antisemitismus",
  items: [
    { label: "Co je antisemitismus", to: "/antisemitismus" },
    // Ukázky incidentů = stávající stránka Archiv incidentů
    { label: "Ukázky incidentů", to: "/galerie-incidentu" },
    { label: "Nahlásit incident", to: "/nahlasit-incident" },
  ],
  all: { label: "Celá sekce", to: "/antisemitismus" },
};

export const PROJEKTY_GROUP: NavGroup = {
  id: "projekty",
  label: "Projekty",
  items: PROJEKTY_ITEMS,
  // all: { label: "Všechny projekty", to: "/projekty" },
};

/** Odkazy s rozbalovací nabídkou v hlavičce (desktop) a akordeon v mobilním menu. */
export const NAV_GROUPS: NavGroup[] = [ARTICLES_GROUP, ANTISEMITISMUS_GROUP, PROJEKTY_GROUP];

/** Odkaz v hlavičce bez nabídky. */
export const NAV_PLAIN: NavItem[] = [{ label: "O nás", to: "/o-nas" }];

/** Sloupec „Jedním hlasem“ ve velkém menu. */
export const ORG_ITEMS: NavItem[] = [
  { label: "O nás", to: "/o-nas" },
  { label: "Zapojte se", to: "/zapojte-se" },
  { label: "Kontakt", to: "/kontakt" },
  // PROVIZORNÍ: stránka E-shop zatím existuje jako zástupná
  { label: "E-shop", to: "/eshop", badge: "brzy" },
];

/** Řádky pod akordeonem v mobilním menu (E-shop je jen ve velkém menu). */
export const MOBILE_ROWS: NavItem[] = ORG_ITEMS.filter((item) => !item.badge);

/** Sloupce velkého menu (desktop). */
export const BIG_MENU_COLUMNS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Obsah",
    items: [{ label: "Články", to: "/clanky" }, ...ARTICLES_GROUP.items.slice(1)],
  },
  { heading: "Antisemitismus", items: ANTISEMITISMUS_GROUP.items },
  { heading: "Projekty JH", items: PROJEKTY_ITEMS },
  { heading: "Jedním hlasem", items: ORG_ITEMS },
];

/** Blok „Aktuálně“ ve velkém menu: obsah se mění tady, bez zásahu do komponenty. */
export const AKTUALNE: {
  kicker: string;
  title: string;
  text: string;
  link: NavItem;
} = {
  kicker: "Aktuálně",
  title: "Skládačka lží",
  text: "Partnerská kampaň Gaza GenoLIE: nejčastější tvrzení o válce v Gaze a jejich vyvrácení.",
  link: { label: "Gaza GenoLIE", href: "https://gazagenolie.com/" },
};

// Newsletter: na webu zatím neexistuje zpracování přihlášení, proto formulář v menu není.

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Jedním hlasem na Facebooku",
    href: "https://www.facebook.com/JednimHlasem",
  },
  {
    id: "instagram",
    label: "Jedním hlasem na Instagramu",
    href: "https://www.instagram.com/JednimHlasem",
  },
  { id: "x", label: "Jedním hlasem na X", href: "https://x.com/JednimHlasem" },
] as const;

export const PRIVACY_LINK: NavItem = {
  label: "Ochrana osobních údajů",
  to: "/ochrana-osobnich-udaju",
};
