import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, allArticles } from "@/lib/content";
import { articlesIn } from "@/lib/articles";
import { formatDate } from "@/lib/articles";

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

const FILTER_IDS = [
  { id: "nove", label: "Nové" },
  { id: "doporucujeme", label: "Doporučujeme" },
  { id: "cesi-a-izrael", label: "Češi a Izrael" },
  { id: "studie", label: "Studie a analýzy" },
  { id: "tydyt", label: "Tydýt týdne" },
] as const;

const FILTERS = [...FILTER_IDS.map((f) => f.label), "Všechny texty"];

const MORE_LABELS: Record<string, string> = {
  "Nové": "Další nové texty",
  "Doporučujeme": "Další z výběru redakce",
  "Češi a Izrael": "Další texty Česko a Izrael",
  "Studie a analýzy": "Další studie a analýzy",
  "Tydýt týdne": "Další tydýty",
};

function Clanky() {
  const { tag, filtr } = Route.useSearch();
  const navigate = useNavigate({ from: "/clanky" });
  const [visible, setVisible] = useState(3);

  const isTagFilter = Boolean(tag) && !FILTERS.includes(tag!);
  const active = isTagFilter
    ? "Všechny texty"
    : (FILTER_IDS.find((f) => f.id === filtr)?.label ?? "Všechny texty");

  useEffect(() => setVisible(3), [active, tag, filtr]);

  const articles =
    active === "Všechny texty"
      ? isTagFilter
        ? ALL_ARTICLES.filter((a) => a.tag === tag)
        : ALL_ARTICLES
      : (filtr ? articlesIn(filtr) : ALL_ARTICLES.filter((a) => a.section === active)).map((a) => ({
          slug: a.slug,
          tag: a.tag,
          date: "iso" in a ? formatDate(a.iso) : a.date,
          title: a.title,
          perex: a.perex,
          image: a.image,
          section: active,
        }));

  const remaining = articles.length - visible;
  // „Všechny texty“ bez tagu už ukazuje celý archiv — tlačítko skrýt.
  const hideMore = active === "Všechny texty" && !isTagFilter;
  const moreLabel = isTagFilter
    ? tag === "Antisemitismus"
      ? "Další texty o antisemitismu"
      : `Další texty s tagem ${tag}`
    : (MORE_LABELS[active] ?? `Další texty z rubriky ${active}`);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Texty</p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Články a analýzy</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Vše na jednom místě — od krátkých faktických vysvětlení po dlouhé studie.
        </p>

        {/* Filtr — tabová lišta v izraelské modři */}
        <nav
          aria-label="Filtrovat články"
          className="clanky-tabs mt-8 flex flex-nowrap gap-6 overflow-x-auto border-b border-border pb-0 md:flex-wrap"
        >
          {FILTERS.map((f) => {
            const filterId = FILTER_IDS.find((x) => x.label === f)?.id;
            const isActive = active === f;
            return (
              <Link
                key={f}
                to="/clanky"
                search={f === "Všechny texty" ? {} : { filtr: filterId }}
                aria-current={isActive}
                className={`whitespace-nowrap border-b-2 pb-2 text-base font-semibold leading-none text-[#0038B8] no-underline transition-colors ${
                  isActive
                    ? "-mb-[1px] border-[#0038B8]"
                    : "border-transparent hover:text-[#0038B8]/80"
                }`}
              >
                {f}
              </Link>
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
                width={1280}
                height={720}
                className="aspect-video w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/clanky"
                    search={{ tag: a.tag }}
                    className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground hover:opacity-85"
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
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.perex}</p>
              </div>
            </article>
          ))}
        </div>

        {articles.length === 0 ? (
          <p className="mt-10 text-muted-foreground">Pro tento filtr zatím žádné texty nemáme.</p>
        ) : null}

        {/* Tlačítko pod mřížkou — přibere další články stejného filtru / tagu */}
        {!hideMore && remaining > 0 && (
          <MoreButton
            label={moreLabel}
            onClick={() => setVisible((v) => v + Math.min(9, remaining))}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
