import { FEATURED, FEED, LATEST, SECTIONS, SLIDES, TOPICS } from "@/lib/content";

export type SearchResult = {
  title: string;
  text: string;
  kind: string;
  to: string;
};

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const INDEX: SearchResult[] = [
  ...TOPICS.map((t) => ({
    title: t.title,
    text: `${t.kicker} — ${t.perex}`,
    kind: "Téma",
    to: "/temata",
  })),
  ...SECTIONS.map((s) => ({ title: s, text: "Rubrika", kind: "Rubrika", to: "/temata" })),
  ...SLIDES.map((s) => ({
    title: s.title,
    text: `${s.kicker} — ${s.text}`,
    kind: "Manifest",
    to: "/",
  })),
  ...FEATURED.map((f) => ({
    title: f.title.replace(/\n/g, " "),
    text: f.text,
    kind: "Doporučujeme",
    to: "/clanky",
  })),
  ...LATEST.map((n) => ({
    title: n.title,
    text: `${n.tag} · ${n.date} — ${n.perex}`,
    kind: "Článek",
    to: "/clanky",
  })),
  ...FEED.flatMap((g) =>
    g.items.map((i) => ({
      title: i.title,
      text: `${i.tag} · ${i.date} — ${i.perex}`,
      kind: g.label,
      to: "/clanky",
    })),
  ),
];

export function searchSite(query: string): SearchResult[] {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const seen = new Set<string>();

  return INDEX.filter((item) => {
    const hay = norm(`${item.title} ${item.text} ${item.kind}`);
    if (!terms.every((t) => hay.includes(t))) return false;
    const key = `${item.kind}|${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
