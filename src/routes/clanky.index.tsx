import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { Pagination, clampPage } from "@/components/pagination";
import { ARTICLE_SECTIONS, CLANKY_FILTERS, allArticles } from "@/lib/content";
import { articlesIn, articlesByTag, formatDate, shuffle, clipPerex, IMPORTED } from "@/lib/articles";

export const Route = createFileRoute("/clanky/")({
  head: () => ({
    meta: [
      { title: "Články — Jedním hlasem" },
      {
        name: "description",
        content:
          "Studie, analýzy a české příběhy o antisemitismu, médiích a dezinformacích kolem Izraele.",
      },
      { property: "og:title", content: "Články — Jedním hlasem" },
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

/** Záložky ve filtru; Tydýt týdne v nich není (články zůstávají ve „Všechny texty“) */
const TABS = CLANKY_FILTERS;

/** Počet článků na stránku (dřív prvních 12 a pak +9 po kliknutí) */
const PAGE_SIZE = 12;

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
  const { tag, filtr: filtrParam, strana } = Route.useSearch();
  // Starý odkaz ?filtr=tydyt otevře výchozí záložku „Nové“
  const filtr = filtrParam === "tydyt" ? undefined : filtrParam;
  const navigate = Route.useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const isTagFilter = Boolean(tag) && !TABS.some((f) => f.label === tag);
  const active = isTagFilter
    ? "Všechny texty"
    : (TABS.find((f) => f.id === (filtr ?? "nove"))?.label ?? "Nové");

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
    if (filtr === "sloupky") {
      return IMPORTED.filter((a) => a.author?.kind === "column").map((a) => toCard(a, active));
    }
    return articlesIn(filtr).map((a) => toCard(a, active));
  })();

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const page = clampPage(strana, totalPages);
  const pageArticles = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Změna stránky posune okno na začátek seznamu (první vykreslení se přeskočí)
  const lastPage = useRef(page);
  useEffect(() => {
    if (lastPage.current === page) return;
    lastPage.current = page;
    listRef.current?.scrollIntoView({ block: "start" });
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Texty</p>
        <h1 className="home-section-title mt-2">Články</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Vše na jednom místě — od krátkých faktických vysvětlení po dlouhé studie.
        </p>

        {/* Filtr — tabová lišta v izraelské modři */}
        <nav
          aria-label="Filtrovat články"
          className="clanky-tabs mt-8 flex flex-nowrap overflow-x-auto border-b border-border pb-0 lg:flex-wrap lg:overflow-visible"
        >
          {TABS.map((f) => {
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
        <div ref={listRef} className="mt-10 grid scroll-mt-24 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pageArticles.map((a, idx) => (
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

        <Pagination page={page} totalPages={totalPages} totalItems={articles.length} pageSize={PAGE_SIZE} />
      </main>
      <SiteFooter />
    </div>
  );
}
