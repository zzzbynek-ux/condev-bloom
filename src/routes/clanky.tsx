import { createFileRoute, Link, Outlet, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, allArticles, KONRAD } from "@/lib/content";
import { articlesIn, articlesByTag, formatDate, shuffle, clipPerex } from "@/lib/articles";
import { CARD_SIZES } from "@/lib/img";

const searchSchema = z.object({
  tag: z.string().optional(),
  filtr: z.string().optional(),
});

export const Route = createFileRoute("/clanky")({
  validateSearch: (search) => searchSchema.parse(search),
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

const FILTER_IDS = [
  { id: "nove", label: "Nové" },
  { id: "doporucujeme", label: "Doporučujeme" },
  { id: "cesi-a-izrael", label: "Češi a Izrael" },
  { id: "studie", label: "Studie a analýzy" },
  { id: "tydyt", label: "Tydýt týdne" },
] as const;

const FILTERS = [...FILTER_IDS.map((f) => f.label), "Všechny texty"];

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
    perex: a.perex,
    image: a.image,
    section,
  };
}

function Clanky() {
  const params = useParams({ strict: false }) as { slug?: string };
  if (params.slug) return <Outlet />;

  const { tag, filtr } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [visible, setVisible] = useState(12);

  const isTagFilter = Boolean(tag) && !FILTERS.includes(tag!);
  const active = isTagFilter
    ? "Všechny texty"
    : filtr === "vse"
      ? "Všechny texty"
      : (FILTER_IDS.find((f) => f.id === filtr)?.label ?? "Nové");

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
        <h1 className="mt-2 font-display text-[1.5rem] font-bold text-primary md:text-[1.875rem]">Články a analýzy</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Vše na jednom místě — od krátkých faktických vysvětlení po dlouhé studie.
        </p>

        {/* Filtr — tabová lišta v izraelské modři */}
        <nav
          aria-label="Filtrovat články"
          className="clanky-tabs mt-8 flex flex-nowrap overflow-x-auto border-b border-border pb-0 lg:flex-wrap lg:overflow-visible"
        >
          {FILTERS.map((f) => {
            const filterId = FILTER_IDS.find((x) => x.label === f)?.id;
            const isActive = active === f;
            const search =
              f === "Všechny texty"
                ? { filtr: "vse" }
                : f === "Nové"
                  ? {}
                  : { filtr: filterId };
            const href =
              f === "Všechny texty"
                ? "/clanky?filtr=vse"
                : f === "Nové"
                  ? "/clanky"
                  : `/clanky?filtr=${filterId}`;
            return (
              <a
                key={f}
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
                {f}
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
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, visible).map((a, idx) => (
            <article
              key={`${a.slug}-${idx}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                sizes={CARD_SIZES}
                className="aspect-video w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/clanky"
                    search={{ tag: a.tag }}
                    className="article-tag rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] hover:opacity-85"
                  >
                    {a.tag}
                  </Link>
                  {a.date ? (
                    <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                      {a.date}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug text-primary">
                  <Link to="/clanky/$slug" params={{ slug: a.slug }} className="group-hover:underline">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{clipPerex(a.perex)}</p>
              </div>
            </article>
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
