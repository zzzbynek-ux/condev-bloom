import bodies from "@/data/articles.body.json";

export function articleHtmlServer(slug: string): string {
  const map = bodies as Record<string, string>;
  return map[slug] ?? "";
}
