import imported from "@/data/search-index.json";
import { AXES } from "@/lib/about-content";

export type SearchResult = {
  title: string;
  text: string;
  kind: string;
  to: string;
};

type Indexed = SearchResult & { hay: string };

type Meta = {
  slug: string;
  title: string;
  perex: string;
  tag: string;
  tags?: string[];
  iso?: string;
};

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const RUBRICS = [
  "Izrael a Židé",
  "Antisemitismus",
  "Média a instituce",
  "Bezpečnost a ideologie",
  "Hlasy a příběhy",
  "Reporty",
] as const;

const INDEX: Indexed[] = (() => {
  const out: Indexed[] = [];
  const seenTo = new Set<string>();

  const push = (item: SearchResult, hay: string) => {
    if (seenTo.has(item.to)) return;
    seenTo.add(item.to);
    out.push({ ...item, hay });
  };

  const articles = (imported as Meta[]).slice().sort((a, b) => (b.iso || "").localeCompare(a.iso || ""));

  for (const a of articles) {
    if (!a.slug) continue;
    push(
      {
        title: a.title,
        text: `${a.tag} — ${a.perex}`,
        kind: "Článek",
        to: `/clanky/${a.slug}`,
      },
      norm(`${a.title} ${a.perex} ${a.tag} ${(a.tags ?? []).join(" ")}`),
    );
  }

  for (const axis of AXES) {
    push(
      {
        title: axis.title,
        text: `${axis.kicker} — ${axis.text}`,
        kind: "Téma",
        to: axis.href,
      },
      norm(`${axis.title} ${axis.kicker} ${axis.text}`),
    );
  }

  for (const s of RUBRICS) {
    out.push({
      title: s,
      text: "Rubrika",
      kind: "Rubrika",
      to: "/clanky",
      hay: norm(`${s} rubrika`),
    });
  }

  return out;
})();

export function searchSite(query: string): SearchResult[] {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return INDEX.filter((item) => terms.every((t) => item.hay.includes(t))).map(({ hay: _hay, ...item }) => item);
}
