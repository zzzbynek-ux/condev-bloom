import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, CLANKY_FILTERS, allArticles, KONRAD } from "@/lib/content";
import { articlesIn, articlesByTag, formatDate, shuffle, clipPerex } from "@/lib/articles";

export const Route = createFileRoute("/clanky/")({
  head: () => ({
    meta: [
      { title: "Články a analýzy — JednímHlasem" },
      {
        name: "description",
        content:
          "Studie, analýzy a české příběhy o antisemitismu, médiích a dezinformacích kolem Izraele.",
      },
      { property: "og:title", content: "Články a analýzy — JednímHlasem" },
      {
        property: "og:description",
        content: "Studie, analýzy a české příběhy o antisemitismu a dezinformacích.",
      },
    ],
  }),
  component: Clanky,
});

type Article = {
  slug: string;
  tag: string;
  date?: string;
  title: string;
  perex: string;
  image: string;
  section: string;
};

/** Všechny články napříč rubrikami, bez duplicit podle slug */
const ALL_ARTICLES: Article[] = allArticles().map((item) => ({
  ...item,
  section: ARTICLE_SECTIONS.find((g) => g.id !== "nove" && g.id !== "vse" && g.items.some((i) => i.slug === item.slug))?.label ?? "Nové",
}));

const DOPORUCUJEME = shuffle(articlesIn("doporucujeme"));

function toCard(a: {
  slug: string;
  tag: string;
  title: string;
  perex: string;
  image: string;
  iso?: string;
  date?: string;
}, section: string): Article {
  return {
    slug: a.slug,
    tag: a.tag,
    date: a.iso ? formatDate(a.iso) : a.date,
    title: a.title,
    perex: clipPerex(a.perex),
    image: a.image,
    section,
  };
}

function Clanky() {
  const { tag, filtr } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [visible, setVisible] = useState(12);

  const isTagFilter = Boolean(tag) && !CLANKY_FILTERS.some((f) => f.label === tag);
  const active = isTagFilter
    ? "Všechny texty"
    : (CLANKY_FILTERS.find((f) => f.id === (filtr ?? "nove"))?.label ?? "Nové");

  useEffect(() => setVisible(12), [active, tag, filtr]);

  const articles: Article[] = (() => {
    if (isTagFilter) {
      return articlesByTag(tag!).map((a) => toCard(a, "Všechny texty"));
    }
    if (filtr === "vse") {
      return ALL_ARTICLES;
    }
    if (!filtr || filtr === "nove") {
      return articlesIn("nove").map((a) => toCard(a, "Nové"));
    }
    if (filtr === "doporucujeme") {
      return DOPORUCUJEME.map((a) => toCard(a, active));
    }
    if (filtr === "tydyt") {
      const fromData = articlesIn("tydyt").map((a) => toCard(a, active));
      if (fromData.length > 0) return fromData;
      return [toCard(KONRAD, active)];
    }
    return articlesIn(filtr).map((a) => toCard(a, active));
  })();

  const remaining = articles.length - visible;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Texty</p>
        <h1 className="home-section-title mt-2">Články a analýzy</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Vše na jednom místě — od krátkých faktických vysvětlení po dlouhé studie.
        </p>

        {/* Filtr — tabová lišta v izraelské modři */}
        <nav
          aria-label="Filtrovat články"
          className="clanky-tabs mt-8 flex flex-nowrap overflow-x-auto border-b border-border pb-0 lg:flex-wrap lg:overflow-visible"
        >
          {CLANKY_FILTERS.map((f) => {
            const isActive = active === f.label;
            const search = f.id === "nove" ? {} : { filtr: f.id };
            const href = f.id === "nove" ? "/clanky" : `/clanky?filtr=${f.id}`;
            return (
              <a
                key={f.id}
                href={href}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  void navigate({ to: "/clanky", search });
                  e.currentTarget.scrollIntoView({
                    inline: "nearest",
                    block: "nearest",
                    behavior: "smooth",
                  });
                }}
                className="whitespace-nowrap text-base font-semibold leading-none no-underline"
              >
                {f.label}
              </a>
            );
          })}
        </nav>

        {isTagFilter ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Filtr podle tagu <span className="font-semibold text-foreground">„{tag}“</span> —{" "}
            <Link to="/clanky" search={{}} className="font-semibold text-primary hover:underline">
              zrušit filtr
            </Link>
          </p>
        ) : null}

        {/* Mřížka článků */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, visible).map((a, idx) => (
            <ArticleCard
              key={`${a.slug}-${idx}`}
              image={a.image}
              tag={a.tag}
              date={a.date}
              title={a.title}
              perex={a.perex}
              slug={a.slug}
            />
          ))}
        </div>

        {articles.length === 0 ? (
          <p className="mt-10 text-muted-foreground">Pro tento filtr zatím žádné texty nemáme.</p>
        ) : null}

        {/* Tlačítko pod mřížkou — přibere další články stejného filtru / tagu */}
        {remaining > 0 && (
          <MoreButton
            label="Další texty"
            onClick={() => setVisible((v) => v + Math.min(9, remaining))}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
