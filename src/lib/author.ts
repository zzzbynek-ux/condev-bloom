export type AuthorKind = "house" | "column" | "external" | "translation";

export type ArticleAuthor = {
  publicId: string;
  kind: AuthorKind;
  display: string;
  original?: {
    name: string;
    medium?: string;
    url?: string;
    date?: string;
  };
};

export const HOUSE_AUTHOR: ArticleAuthor = {
  publicId: "redakce",
  kind: "house",
  display: "Redakce",
};

export function articleAuthor(author?: ArticleAuthor | null): ArticleAuthor {
  return author ?? HOUSE_AUTHOR;
}

export function bylineSuffix(author?: ArticleAuthor | null): string {
  const a = articleAuthor(author);
  if (a.kind === "translation") return "Překlad";
  return a.display;
}

export function articleJsonLd(input: {
  title: string;
  perex?: string;
  iso?: string;
  image?: string;
  slug: string;
  author?: ArticleAuthor | null;
}) {
  const a = articleAuthor(input.author);
  const org = {
    "@type": "Organization",
    name: "Jedním hlasem",
    url: "https://www.jednimhlasem.cz/",
  };
  const originalPerson = a.original?.name
    ? { "@type": "Person", name: a.original.name }
    : null;
  const author =
    a.kind === "external"
      ? { "@type": "Person", name: a.display }
      : a.kind === "translation" && originalPerson
        ? originalPerson
        : org;

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.perex || undefined,
    datePublished: input.iso || undefined,
    image: input.image && !input.image.includes("fallback") ? input.image : undefined,
    mainEntityOfPage: `https://www.jednimhlasem.cz/clanky/${input.slug}`,
    author,
    publisher: org,
  };
  if (a.kind === "translation") {
    ld.translator = org;
  }
  return ld;
}
