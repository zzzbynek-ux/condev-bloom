import webpManifest from "./webp-manifest.json";

/** Public paths of WebP files that actually exist on disk (generated snapshot). */
const WEBP = new Set(webpManifest as string[]);

/** Šířky zdrojových souborů hero; výchozí je 1235 a 2470 px, v2 fotky mají 1920 a 3840 px. */
function heroWidths(src: string): [number, number] {
  return src.includes("-v2.") ? [1920, 3840] : [1235, 2470];
}

/** Retina srcset for hero JPEGs that have a matching @2x file. */
export function heroSrcSet(src: string): string | undefined {
  if (!src.startsWith("/images/hero/") || !src.endsWith(".jpg") || src.includes("@2x")) return undefined;
  const [w1, w2] = heroWidths(src);
  return `${src}?v=dr ${w1}w, ${src.replace(/\.jpg$/, "@2x.jpg")}?v=dr ${w2}w`;
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
  const [d1, d2] = heroWidths(src);
  if (webpExists(w1) && webpExists(w2)) return `${w1}?v=dr ${d1}w, ${w2}?v=dr ${d2}w`;
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

/** Rozpracované předběžné stahování; reference brání tomu, aby prohlížeč nedokončený požadavek zrušil. */
const prefetching = new Set<HTMLImageElement>();

/**
 * Předem načte fotku hero stejnou variantou, jakou si vybere <picture> v hero: webp srcset (1× / @2×) se
 * sizes=100vw, takže se na vyšším DPR stáhne @2x a po přepnutí slidu už je v cache.
 */
export function prefetchHero(src: string) {
  if (typeof window === "undefined") return;
  const webpSrc = `${src.replace(/\.jpg$/, ".webp")}?v=dr`;
  const webp = heroWebpSrcSet(src);
  const set = webp ?? heroSrcSet(src);
  const img = new Image();
  img.decoding = "async";
  if ("fetchPriority" in img)
    (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "low";
  if (set) {
    img.sizes = HERO_SIZES;
    img.srcset = set;
  }
  img.src = webp || webpExists(src.replace(/\.jpg$/, ".webp")) ? webpSrc : `${src}?v=dr`;
  prefetching.add(img);
  const done = () => prefetching.delete(img);
  img.onload = done;
  img.onerror = done;
}

/** Předběžné stahování v klidové chvíli (po načtení stránky); vrací funkci pro zrušení plánu. */
export function prefetchHeroIdle(srcs: string[]): () => void {
  if (typeof window === "undefined") return () => {};
  const run = () => srcs.forEach(prefetchHero);
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(run, { timeout: 3000 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(run, 400);
  return () => window.clearTimeout(id);
}
