import imported from "@/data/articles.meta.json";

export type ImportedArticle = {
  id: number;
  slug: string;
  title: string;
  perex: string;
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

let bodyCache: Record<string, string> | null = null;

export async function articleHtml(slug: string): Promise<string> {
  if (!bodyCache) {
    const mod = await import("@/data/articles.body.json");
    bodyCache = (mod.default ?? mod) as Record<string, string>;
  }
  return bodyCache[slug] ?? "";
}

const WP_UPLOAD = /https?:\/\/(?:www\.)?jednimhlasem\.cz\/wp-content\/uploads\/[^"'\s]+/gi;

/** WordPress uploads are behind auth (401). Point body images at the local file. */
export function rewriteImportedHtml(html: string, localImage?: string) {
  if (!html) return html;
  let out = html;
  const usable = Boolean(localImage) && !localImage!.includes("fallback");
  if (usable) {
    out = out.replace(WP_UPLOAD, localImage!);
  } else {
    out = out.replace(/<div class="wp-block-image">[\s\S]*?<\/div>/gi, "");
    out = out.replace(/<img[^>]*>/gi, (tag) =>
      /jednimhlasem|wp-content/i.test(tag) ? "" : tag,
    );
  }
  out = out.replace(/\s+srcset="[^"]*"/gi, "");
  out = out.replace(/\s+sizes="[^"]*"/gi, "");
  return out;
}

export function htmlHasImage(html: string) {
  return /<img\s/i.test(html);
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
    [arr[i], arr[j]!] = [arr[j]!, arr[i]!];
  }
  return arr;
}
