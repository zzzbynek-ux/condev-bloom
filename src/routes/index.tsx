import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { Pagination } from "@/components/pagination";
import { Tag, TagDate } from "@/components/tag";
import { ARTICLE_SECTIONS, CLANKY_FILTERS, allArticles, HERO_BANNER, KAMPAN_SLIDES, KONRAD, VYBER_REDAKCE } from "@/lib/content";
import { heroSrcSet, heroWebpSrcSet, heroLcpPreload, prefetchHeroIdle, HERO_SIZES, webpExists } from "@/lib/img";
import { csNbsp } from "@/lib/typo";
import { articlesIn, clipPerex, formatDate } from "@/lib/articles";
import { SHOW_PTEJTE_SE_AI } from "@/lib/feature-flags";

// Přepínač sekcí „Tydýt týdne“ a „Incidenty“ vedle sebe na homepage.
// Pro jejich návrat stačí nastavit true.
const SHOW_TYDYT_A_INCIDENTY = false;

export const Route = createFileRoute("/")({
  head: () => {
    const first = HERO_BANNER[0]!.image;
    const lcp = heroLcpPreload(first);
    return {
      meta: [
        { title: "Jedním hlasem — fakta a kontext do debaty o Izraeli" },
        {
          name: "description",
          content:
            "Ověřená fakta, analýzy a české příběhy. Komunita, která do debaty o Izraeli a antisemitismu vrací kontext a klidný tón.",
        },
        { property: "og:title", content: "Jedním hlasem — fakta a kontext do debaty o Izraeli" },
        {
          property: "og:description",
          content: "Ověřená fakta, analýzy a české příběhy. Zapojte se jedním hlasem.",
        },
      ],
      links: [
        {
          rel: "preload",
          as: "image",
          href: lcp.href,
          type: lcp.type,
          imageSrcSet: lcp.imageSrcSet,
          imageSizes: HERO_SIZES,
        },
      ],
    };
  },
  component: Index,
});

/** Délka prolnutí fotek při přepnutí slidu; s prefers-reduced-motion se prolnutí vynechá. */
const HERO_FADE_MS = 280;
const HERO_AUTO_MS = 6000;

type HeroState = { shown: number; pending: number | null; ready: boolean; under: number[] };
type HeroAction =
  | { type: "request"; delta: number; total: number }
  | { type: "loaded"; idx: number }
  | { type: "settle" };

/**
 * shown = slide, který je vidět (fotka, overlay i text). pending = slide, jehož fotka se načítá; ready = fotka
 * je načtená a prolíná se. Text a overlay nového slidu se berou ze stejného slidu jako fotka, takže se nic
 * nepřepne dřív než obrázek. Další klik se počítá od naposledy vyžádaného slidu; starý požadavek se zahodí.
 * under = vrstvy, které zůstávají pod právě se prolínající fotkou, aby při kliknutí během prolnutí neprosvitlo pozadí.
 */
function heroReducer(state: HeroState, action: HeroAction): HeroState {
  switch (action.type) {
    case "request": {
      const base = state.pending ?? state.shown;
      const target = (base + action.delta + action.total) % action.total;
      // rozpracované prolnutí se uzná hned (slid se vyžádá od něj), stará vrstva zůstane pod ním do konce prolnutí
      const fading = state.ready && state.pending !== null;
      const shown = fading ? state.pending! : state.shown;
      const under = fading ? [...state.under, state.shown] : state.under;
      return { shown, pending: target === shown ? null : target, ready: false, under };
    }
    case "loaded":
      return state.pending === action.idx && !state.ready ? { ...state, ready: true } : state;
    case "settle":
      if (state.ready && state.pending !== null)
        return { shown: state.pending, pending: null, ready: false, under: [] };
      return state.under.length ? { ...state, under: [] } : state;
  }
}

function overlayClass(overlay: string) {
  if (overlay === "stronger")
    return "hero-overlay pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(11,26,58,0.96)_0%,rgba(11,26,58,0.9)_50%,rgba(11,26,58,0.5)_75%,transparent_100%)]";
  if (overlay === "strong")
    return "hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/96 via-[#0b1a3a]/78 via-[40%] to-transparent";
  return "hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/92 via-[#0b1a3a]/62 via-[42%] to-transparent";
}

/** Fotka hero (picture + img). Zdroj a sizes jsou stejné, jaké používá předběžné načítání (prefetchHero). */
function HeroFrame({
  slide,
  onReady,
}: {
  slide: (typeof HERO_BANNER)[number];
  onReady?: (el: HTMLImageElement) => void;
}) {
  const heroWebp = heroWebpSrcSet(slide.image);
  const markReady = (el: HTMLImageElement | null) => {
    if (!el || !onReady) return;
    if (el.complete && el.naturalWidth > 0) onReady(el);
  };
  const img = (
    <img
      ref={markReady}
      src={`${slide.image}?v=dr`}
      srcSet={heroSrcSet(slide.image)}
      sizes={HERO_SIZES}
      alt=""
      width={1235}
      height={459}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onLoad={(e) => onReady?.(e.currentTarget)}
      className="hero-img pointer-events-none absolute inset-0 size-full object-cover"
      style={{
        ["--hero-focus" as string]: slide.focus,
        ["--hero-focus-mobile" as string]: "focusMobile" in slide ? slide.focusMobile : slide.focus,
      }}
    />
  );
  return heroWebp ? (
    <picture className="contents">
      <source type="image/webp" srcSet={heroWebp} sizes={HERO_SIZES} />
      {img}
    </picture>
  ) : (
    img
  );
}

/** Vrstva slidu: fotka + overlay (s vlastní silou ztmavení), prolíná se jako celek. */
function HeroLayer({
  slide,
  visible,
  onReady,
}: {
  slide: (typeof HERO_BANNER)[number];
  visible: boolean;
  onReady?: (el: HTMLImageElement) => void;
}) {
  return (
    <div
      className={`hero-layer absolute inset-0 transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        ["--hero-shade-top" as string]: "shadeMobile" in slide ? slide.shadeMobile : undefined,
        ["--hero-shade-tablet" as string]: "shadeTablet" in slide ? slide.shadeTablet : undefined,
      }}
    >
      <HeroFrame slide={slide} {...(onReady ? { onReady } : {})} />
      <div aria-hidden className={overlayClass(slide.overlay)} />
    </div>
  );
}

function Hero() {
  const total = HERO_BANNER.length;
  const [{ shown, pending, ready, under }, dispatch] = useReducer(heroReducer, {
    shown: 0,
    pending: null,
    ready: false,
    under: [],
  });
  const go = (d: number) => dispatch({ type: "request", delta: d, total });

  // Fotka je načtená a dekódovaná: slide se (i s textem a overlayem) přepne najednou a fotka se prolne.
  const onPendingReady = (idx: number) => (el: HTMLImageElement) => {
    const done = () =>
      requestAnimationFrame(() => requestAnimationFrame(() => dispatch({ type: "loaded", idx })));
    if (el.decode) el.decode().then(done, done);
    else done();
  };

  // Po prolnutí se vrstva stane základní a stará se odstraní.
  const fading = ready || under.length > 0;
  useEffect(() => {
    if (!fading) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => dispatch({ type: "settle" }), reduce ? 0 : HERO_FADE_MS + 20);
    return () => clearTimeout(t);
  }, [fading, pending, shown, under.length]);

  // Auto-přepínání: čas se počítá od posledního přepnutí, ruční klik ho vynuluje a při načítání nového slidu neběží.
  useEffect(() => {
    if (pending !== null) return;
    const t = setTimeout(() => dispatch({ type: "request", delta: 1, total }), HERO_AUTO_MS);
    return () => clearTimeout(t);
  }, [shown, pending, total]);

  // Předem se načítají dva slidy dopředu a jeden zpět, v klidové chvíli a stejnou variantou fotky jako v hero.
  useEffect(() => {
    const at = (d: number) => HERO_BANNER[(shown + d + total) % total]!.image;
    return prefetchHeroIdle([at(1), at(2), at(-1)]);
  }, [shown, total]);

  const content = ready && pending !== null ? pending : shown;
  const slide = HERO_BANNER[content] ?? HERO_BANNER[0]!;
  const layers = [...under, shown, ...(pending !== null ? [pending] : [])];

  return (
    <section
      className={`hero-section relative isolate overflow-hidden bg-navy-900${slide.overlay === "strong" ? " hero-overlay-strong" : ""}`}
    >
      {layers.map((idx) => (
        <HeroLayer
          key={idx}
          slide={HERO_BANNER[idx]!}
          visible={idx !== pending || ready}
          {...(idx === pending ? { onReady: onPendingReady(idx) } : {})}
        />
      ))}

      <div className="hero-grid pointer-events-none relative z-10 mx-auto flex h-full max-w-[88rem] items-center justify-start px-5 py-6 md:px-16">
        <div className="hero-card pointer-events-auto w-full max-w-md md:max-w-md lg:max-w-lg">
          <p className="kicker text-white/70">
            {slide.kicker}
          </p>
          {content === 0 ? (
            <h1 key={slide.title} className="hero-title animate-rise text-balance font-display font-bold text-white">
              {slide.title}
            </h1>
          ) : (
            <p key={slide.title} className="hero-title animate-rise text-balance font-display font-bold text-white">
              {slide.title}
            </p>
          )}
          {slide.text ? (
            <p
              key={slide.text}
              className="hero-perex animate-rise hidden max-w-md text-pretty text-white/90 md:block lg:max-w-lg"
            >
              {csNbsp(slide.text)}
            </p>
          ) : null}

          {slide.slug === "o-nas" ? (
            <Link
              to="/o-nas"
              className="cta-link hero-cta inline-flex items-center gap-2 text-white hover:text-white"
            >
              O nás <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link
              to="/clanky/$slug"
              params={{ slug: slide.slug }}
              className="cta-link hero-cta inline-flex items-center gap-2 text-white hover:text-white"
            >
              Číst článek <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="hero-nav">
        <div className="hero-dots pointer-events-auto absolute inset-x-0 bottom-3 z-40 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <button
              type="button"
              aria-label="Předchozí"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
              className="hero-nav-btn pointer-events-auto relative z-40 grid size-9 place-items-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70"
            >
              <ChevronLeft className="pointer-events-none size-6" strokeWidth={2} />
            </button>
            <span
              className="hero-count"
              aria-live="polite"
            >
              {content + 1} / {total}
            </span>
            <button
              type="button"
              aria-label="Další"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
              className="hero-nav-btn pointer-events-auto relative z-40 grid size-9 place-items-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70"
            >
              <ChevronRight className="pointer-events-none size-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



function SectionHeader({
  kicker,
  title,
  subtitle,
  to,
  linkLabel = "Zobrazit vše",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="border-t-2 border-primary pt-4">
      {kicker ? <p className="kicker text-primary/70">{kicker}</p> : null}
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[1.5rem] font-bold text-primary md:text-[1.875rem]">
            {title}
          </h2>
          {subtitle ? <p className="mt-1 text-[0.95rem] leading-[1.55] text-muted-foreground">{subtitle}</p> : null}
        </div>
        {to ? (
          <Link
            to={to}
            className="cta-link inline-flex items-center gap-1.5 text-primary hover:underline"
          >
            {linkLabel} <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

const ARTICLE_PAGE_SIZE = 6;

function ArticleTabs() {
  const [active, setActive] = useState<(typeof CLANKY_FILTERS)[number]["id"]>("nove");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const group = ARTICLE_SECTIONS.find((g) => g.id === active) ?? ARTICLE_SECTIONS[0]!;
  // ARTICLE_SECTIONS drží jen prvních 12 textů rubriky; zbytek doplníme ve stejném pořadí,
  // aby stránkování dosáhlo na všechny texty jako /clanky?filtr=<rubrika>
  const all = useMemo(() => {
    if (group.id === "vse") return allArticles();
    const seen = new Set(group.items.map((i) => i.slug));
    const rest = articlesIn(group.id)
      .filter((a) => !seen.has(a.slug))
      .map((a) => ({
        slug: a.slug,
        tag: a.tag,
        date: formatDate(a.iso),
        title: a.title,
        perex: clipPerex(a.perex),
        image: a.image,
      }));
    return [...group.items, ...rest];
  }, [group]);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / ARTICLE_PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const items = all.slice((current - 1) * ARTICLE_PAGE_SIZE, current * ARTICLE_PAGE_SIZE);

  const changePage = (n: number) => {
    setPage(n);
    scrollAfterRender.current = true;
  };

  // Posun na začátek sekce až po vykreslení nové stránky, ne při přepnutí rubriky
  const scrollAfterRender = useRef(false);
  useEffect(() => {
    if (!scrollAfterRender.current) return;
    scrollAfterRender.current = false;
    const id = requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sectionRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [current]);

  // Když po klepnutí zmizí tlačítko, na kterém byl fokus (první/poslední stránka), přesune se na seznam karet
  const lastPage = useRef(current);
  useEffect(() => {
    if (lastPage.current === current) return;
    lastPage.current = current;
    const el = document.activeElement;
    if (!el || el === document.body || !document.contains(el)) {
      listRef.current?.focus({ preventScroll: true });
    }
  }, [current]);

  return (
    <section ref={sectionRef} className="scroll-below-header">
      <div className="home-flow mx-auto max-w-[88rem] px-5 md:px-6">
          <h2 className="home-section-title">
            Články
          </h2>

        <nav
          aria-label="Rubriky článků"
          className="clanky-tabs mt-4 flex flex-nowrap items-center overflow-x-auto lg:flex-wrap lg:overflow-visible"
        >
          {CLANKY_FILTERS.filter((link) => link.id !== "sloupky").map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={(e) => {
                setActive(link.id);
                setPage(1);
                e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
              }}
              aria-selected={active === link.id}
              aria-current={active === link.id}
              className="text-base font-semibold normal-case text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div
          ref={listRef}
          tabIndex={-1}
          className="mt-8 grid items-stretch gap-6 outline-none md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => (
            <ArticleCard
              key={`${group.id}-${item.slug}-${idx}`}
              image={item.image}
              tag={item.tag}
              date={item.date}
              title={item.title}
              perex={item.perex}
              slug={item.slug}
            />
          ))}
        </div>

        <Pagination
          page={current}
          totalPages={totalPages}
          onPageChange={changePage}
        />

        {total > ARTICLE_PAGE_SIZE && (
          <p className="mt-6 text-sm">
            <Link
              to="/clanky"
              search={{ filtr: group.id }}
              className="cta-link text-primary hover:underline"
            >
              Všechny texty v rubrice <span aria-hidden="true">→</span>
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

function KampanStrip() {
  const [i, setI] = useState(0);
  const total = KAMPAN_SLIDES.length;
  const slide = KAMPAN_SLIDES[i]!;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % total), 8000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className="kampan-strip" aria-label="Lež století">
      <div className="home-flow home-flow--last mx-auto max-w-[88rem] px-5 md:px-6">
        <p className="kicker text-primary">Partnerství</p>
        <h2 className="home-section-title">Lež století</h2>
        <div className="kampan-card mt-4">
          <a
            href={slide.href}
            target="_blank"
            rel="noreferrer"
            className="kampan-hit"
          >
            <div className="kampan-copy">
              <div key={slide.href} className="kampan-fade">
                <h2 className="font-display text-[1.35rem] font-bold text-navy-900 md:text-[1.5rem]">
                  {slide.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  {csNbsp(slide.text)}
                </p>
              </div>
              <span className="kampan-cta gap-2">
                Gaza GenoLIE <ArrowRight className="size-4" aria-hidden />
              </span>
            </div>
            {webpExists("/images/kampan-gazagenolie.webp") ? (
              <picture className="contents">
                <source type="image/webp" srcSet="/images/kampan-gazagenolie.webp" />
                <img
                  src="/images/kampan-gazagenolie.jpg"
                  alt="The Gaza GenoLIE"
                  className="kampan-photo"
                  width={720}
                  height={400}
                />
              </picture>
            ) : (
              <img
                src="/images/kampan-gazagenolie.jpg"
                alt="The Gaza GenoLIE"
                className="kampan-photo"
                width={720}
                height={400}
              />
            )}
          </a>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <div className="hero-frame">
          <Hero />
        </div>

        {/* Zvýrazněné téma: Antisemitismus */}
        <section className="tema-band">
          <div className="tema-strip mx-auto flex max-w-[88rem] w-full flex-col items-stretch gap-6 px-4 py-8 md:px-6">
            <div className="flex w-full items-center justify-start gap-4">
              <div className="max-w-2xl">
                <p className="kicker text-navy-900">
                  Klíčové téma
                </p>
                <h2 className="mt-1 font-display text-[1.5rem] font-bold tracking-tight text-navy-900 md:text-[1.875rem]">
                  Antisemitismus
                </h2>
                <p className="tema-perex mt-1 max-w-xl text-[13px] leading-snug text-navy-900">
                  Nová podoba starých předsudků — jak ji poznat, pojmenovat a věcně vyvracet.
                </p>
              </div>
            </div>
            <div className="tema-buttons flex flex-wrap items-center gap-3">
              <Link
                to="/antisemitismus"
                className="tema-btn-outline inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                Číst k tématu
                <ArrowRight className="h-4 w-4" />
              </Link>
              {SHOW_PTEJTE_SE_AI ? (
                <Link
                  to="/ptejte-se-ai"
                  className="tema-btn-outline inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition"
                >
                  Ptejte se AI
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              <Link
                to="/nahlasit-incident"
                className="btn-incident inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                Nahlásit incident
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Výběr redakce */}
        <section className="vyber-section">
          <div className="home-flow mx-auto max-w-[88rem] px-5 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="home-section-title">Výběr redakce</h2>
              <Link
                to="/clanky"
                className="cta-link inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                Všechny texty <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="vyber-grid mt-4 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {VYBER_REDAKCE.map((item, i) => (
                <ArticleCard
                  key={item.slug}
                  image={item.image}
                  tag={item.tag}
                  date={item.date}
                  title={item.title}
                  perex={item.perex}
                  slug={item.slug}
                  priority={i < 3}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tydýt týdne + Dokumentujeme (skryto přes SHOW_TYDYT_A_INCIDENTY) */}
        {SHOW_TYDYT_A_INCIDENTY && (
          <section className="section-band">
            <div className="home-flow mx-auto max-w-[88rem] px-5 md:px-6">
              <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-6">
                {/* Tydýt */}
                <div className="flex h-full min-h-0 flex-col">
                  <p className="kicker text-primary">Rubrika</p>
                  <h2 className="home-section-title">Tydýt týdne</h2>
                  <article className="tydyt-card card-lift group mt-4 flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-tile border border-border bg-card md:flex-row">
                    <img
                      src="/images/tydyt-konrad.jpg"
                      alt="Tydýt týdne — Konrad Stavridis"
                      loading="lazy"
                      className="tydyt-photo shrink-0 object-cover object-[50%_18%]"
                      width={363}
                      height={363}
                      decoding="async"
                    />
                    <div className="tydyt-body flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <Tag variant="main" search={{ filtr: "tydyt" }}>
                            Tydýt
                          </Tag>
                          <TagDate value={KONRAD.date} />
                        </div>
                        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy-900">
                          <Link
                            to="/clanky"
                            search={{ filtr: "tydyt" }}
                            className="group-hover:underline"
                          >
                            Konrad Stavridis
                          </Link>
                        </h3>
                        <p className="mt-1.5 text-[0.95rem] leading-[1.55] text-muted-foreground">
                          Tento týden vysvětluje, proč se o Izraeli mluví jinak než o jiných
                          státech.
                        </p>
                      </div>
                      <div className="tydyt-actions flex flex-wrap items-center gap-x-4 gap-y-2">
                        <Link
                          to="/clanky"
                          search={{ filtr: "tydyt" }}
                          className="cta-link inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          Číst článek <ArrowRight className="size-4" />
                        </Link>
                        <Link
                          to="/clanky"
                          search={{ filtr: "tydyt" }}
                          className="tydyt-archive cta-link inline-flex items-center gap-1.5 text-primary hover:underline"
                        >
                          Archiv tydýtů <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Dokumentujeme */}
                <div className="flex h-full min-h-0 flex-col">
                  <p className="kicker text-primary">Dokumentujeme</p>
                  <h2 className="home-section-title">Incidenty</h2>
                  <article className="documentujeme-card mt-4 flex h-full flex-1 flex-col overflow-hidden rounded-tile border border-border bg-card">
                    <div className="documentujeme-inner flex h-full flex-1 flex-col justify-start p-4">
                      <div className="documentujeme-entries flex flex-col gap-3">
                        {[
                          {
                            tag: "Incident",
                            date: "28. 8. 2026",
                            text: "Poškozená výloha židovské restaurace v Praze — případ dokumentován a předán k ověření.",
                            destructive: true,
                          },
                          {
                            tag: "Výkřik",
                            date: "21. 8. 2026",
                            text: "Poslanec v debatě zopakoval vyvrácené tvrzení o „genocidě“ bez jakéhokoliv kontextu.",
                            destructive: false,
                          },
                        ].map((d) => (
                          <div
                            key={d.text}
                            className="documentujeme-entry flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <Tag variant={d.destructive ? "danger" : "solid"}>{d.tag}</Tag>
                              <TagDate value={d.date} />
                            </div>
                            <p className="text-[0.95rem] leading-[1.55] text-muted-foreground">
                              {d.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="documentujeme-footer mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                        <Link
                          to="/galerie-incidentu"
                          className="cta-link inline-flex items-center gap-1.5 text-primary hover:underline"
                        >
                          Archiv incidentů <ArrowRight className="size-4" />
                        </Link>
                        <Link
                          to="/nahlasit-incident"
                          className="btn-incident inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
                        >
                          Nahlásit incident
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sekce článků — záložky ve stylu Visegrad24 */}
        <ArticleTabs />

        {/* Kampaň Gaza genolie: úplně dole, těsně nad patičkou */}
        <KampanStrip />







      </main>
      <SiteFooter />
    </div>
  );
}
