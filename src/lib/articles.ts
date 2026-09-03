import imported from "@/data/articles.json";

export type ImportedArticle = {
  id: number;
  slug: string;
  title: string;
  perex: string;
  html: string;
  date: string;
  iso: string;
  tags: string[];
  tag: string;
  sections: string[];
  image: string;
  url?: string;
};

export const IMPORTED = (imported as ImportedArticle[]).slice().sort((a, b) => (b.iso || "").localeCompare(a.iso || ""));

export function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

export function articlesIn(section: string) {
  return IMPORTED.filter((a) => a.sections.includes(section));
}

export function articleBySlug(slug: string) {
  return IMPORTED.find((a) => a.slug === slug);
}

export function articlesByTag(tag: string) {
  const t = tag.toLowerCase();
  return IMPORTED.filter((a) => a.tags.some((x) => x.toLowerCase() === t) || a.tag.toLowerCase() === t);
}

/** Stable shuffle so SSR matches the client. */
export function shuffle<T>(items: T[], seed = 20260903): T[] {
  const arr = items.slice();
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 16807 + 7) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}
