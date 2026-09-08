/** Retina srcset for hero JPEGs that have a matching @2x file. */
export function heroSrcSet(src: string): string | undefined {
  if (!src.startsWith("/images/hero/") || !src.endsWith(".jpg") || src.includes("@2x")) return undefined;
  return `${src} 1235w, ${src.replace(/\.jpg$/, "@2x.jpg")} 2470w`;
}

export const HERO_SIZES = "100vw";
export const CARD_SIZES = "(min-width: 1280px) 410px, (min-width: 768px) 45vw, 100vw";
export const ARTICLE_HERO_SIZES = "(min-width: 768px) 768px, 100vw";
export const RELATED_SIZES = "(min-width: 1280px) 360px, (min-width: 768px) 33vw, 80vw";
