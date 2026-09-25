import webpManifest from "./webp-manifest.json";

/** Public paths of WebP files that actually exist on disk (generated snapshot). */
const WEBP = new Set(webpManifest as string[]);

/** Retina srcset for hero JPEGs that have a matching @2x file. */
export function heroSrcSet(src: string): string | undefined {
  if (!src.startsWith("/images/hero/") || !src.endsWith(".jpg") || src.includes("@2x")) return undefined;
  return `${src}?v=dr 1235w, ${src.replace(/\.jpg$/, "@2x.jpg")}?v=dr 2470w`;
}

export const HERO_SIZES = "100vw";
export const CARD_SIZES = "(min-width: 1280px) 410px, (min-width: 768px) 45vw, 100vw";
export const ARTICLE_HERO_SIZES = "(min-width: 768px) 768px, 100vw";
export const RELATED_SIZES = "(min-width: 1280px) 360px, (min-width: 768px) 33vw, 80vw";

export function webpExists(path: string): boolean {
  return WEBP.has(path);
}

export function cardSrcSet(src: string): string | undefined {
  if (!src.endsWith(".jpg")) return undefined;
  if (!src.startsWith("/images/articles/") && src !== "/images/tydyt-konrad.jpg") return undefined;
  const base = src.slice(0, -4);
  const w480 = `${base}-480.webp`;
  const w960 = `${base}-960.webp`;
  if (webpExists(w480) && webpExists(w960)) return `${w480} 480w, ${w960} 960w`;
  return undefined;
}

export function heroWebpSrcSet(src: string): string | undefined {
  if (!src.startsWith("/images/hero/") || !src.endsWith(".jpg") || src.includes("@2x")) return undefined;
  const w1 = src.replace(/\.jpg$/, ".webp");
  const w2 = src.replace(/\.jpg$/, "@2x.webp");
  if (webpExists(w1) && webpExists(w2)) return `${w1}?v=dr 1235w, ${w2}?v=dr 2470w`;
  if (webpExists(w1)) return `${w1}?v=dr`;
  return undefined;
}

export function heroLcpPreload(src: string) {
  const webp = heroWebpSrcSet(src);
  if (webp) {
    const href = `${src.replace(/\.jpg$/, ".webp")}?v=dr`;
    return { href, type: "image/webp" as const, imageSrcSet: webp };
  }
  return { href: `${src}?v=dr`, type: "image/jpeg" as const, imageSrcSet: heroSrcSet(src) };
}

export function prefetchHero(src: string) {
  if (typeof window === "undefined") return;
  const href = webpExists(src.replace(/\.jpg$/, ".webp"))
    ? `${src.replace(/\.jpg$/, ".webp")}?v=dr`
    : `${src}?v=dr`;
  const img = new Image();
  img.decoding = "async";
  img.src = href;
}


