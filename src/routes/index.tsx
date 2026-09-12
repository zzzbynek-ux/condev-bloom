import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, HERO_BANNER, KAMPAN_SLIDES, VYBER_REDAKCE } from "@/lib/content";
import { heroSrcSet, heroWebpSrcSet, HERO_SIZES, webpExists } from "@/lib/img";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JednímHlasem — fakta a kontext do debaty o Izraeli" },
      {
        name: "description",
        content:
          "Ověřená fakta, analýzy a české příběhy. Komunita, která do debaty o Izraeli a antisemitismu vrací kontext a klidný tón.",
      },
      { property: "og:title", content: "JednímHlasem — fakta a kontext do debaty o Izraeli" },
      {
        property: "og:description",
        content: "Ověřená fakta, analýzy a české příběhy. Zapojte se jedním hlasem.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const [i, setI] = useState(0);
  const total = HERO_BANNER.length;
  const go = (d: number) => setI((v) => (v + d + total) % total);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const slide = HERO_BANNER[i] ?? HERO_BANNER[0]!;
  const heroWebp = heroWebpSrcSet(slide.image);
  const heroImg = (
      <img
        src={slide.image}
        srcSet={heroSrcSet(slide.image)}
        sizes={HERO_SIZES}
        alt=""
        width={1235}
        height={459}
        decoding="async"
        fetchPriority="high"
        className="hero-img pointer-events-none absolute inset-0 size-full object-cover"
        style={{ ["--hero-focus" as string]: slide.focus, objectPosition: slide.focus }}
      />
  );

  return (
    <section className={`hero-section relative isolate overflow-hidden bg-navy-900${slide.overlay === "strong" ? " hero-overlay-strong" : ""}`}>
      {heroWebp ? (
        <picture className="contents">
          <source type="image/webp" srcSet={heroWebp} sizes={HERO_SIZES} />
          {heroImg}
        </picture>
      ) : (
        heroImg
      )}
      <div
        aria-hidden
        className={
          slide.overlay === "strong"
            ? "hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/96 via-[#0b1a3a]/78 via-[40%] to-transparent"
            : "hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/92 via-[#0b1a3a]/62 via-[42%] to-transparent"
        }
      />

      <div className="hero-grid pointer-events-none relative z-10 mx-auto flex h-full max-w-[88rem] items-center justify-start px-5 py-6 md:px-16">
        <div className="hero-card pointer-events-auto w-full max-w-md md:max-w-md lg:max-w-lg">
          <p className="kicker text-white/70">
            {slide.kicker}
          </p>
          {i === 0 ? (
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
              {slide.text}
            </p>
          ) : null}

          {i === 0 ? (
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
              {i + 1} / {total}
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



function StarOfDavid({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5 21 18H3L12 2.5Z" />
      <path d="M12 21.5 3 6h18l-9 15.5Z" />
    </svg>
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

const SECTION_LINKS = [
  { id: "nove", label: "Nové" },
  { id: "doporucujeme", label: "Doporučujeme" },
  { id: "cesi-a-izrael", label: "Češi a Izrael" },
  { id: "studie", label: "Studie a analýzy" },
  { id: "vse", label: "Všechny texty" },
] as const;

function ArticleTabs() {
  const [active, setActive] = useState<(typeof SECTION_LINKS)[number]["id"]>("nove");
  const sections = ARTICLE_SECTIONS.filter((g) => g.id !== "tydyt");
  const group = sections.find((g) => g.id === active) ?? sections[0]!;
  const items = group.items.slice(0, 6);

  return (
    <section>
      <div className="mx-auto max-w-[88rem] px-5 section-y md:px-6">
        <div className="border-t-2 border-primary pt-5">
          <h2 className="home-section-title">
            Články a analýzy
          </h2>

        <nav
          aria-label="Rubriky článků"
          className="clanky-tabs mt-4 flex flex-nowrap items-center overflow-x-auto lg:flex-wrap lg:overflow-visible"
        >
          {SECTION_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={(e) => {
                setActive(link.id);
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

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        <MoreButton
          label="Další texty"
          search={{ filtr: group.id }}
        />
        </div>
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
  }, [total, i]);

  return (
    <section className="kampan-strip" aria-label="Kampaň Gaza GenoLIE">
      <div className="mx-auto max-w-[88rem] px-5 md:px-6">
        <div className="kampan-card">
          <a
            href={slide.href}
            target="_blank"
            rel="noreferrer"
            className="kampan-hit"
          >
            <div className="kampan-copy">
              <p className="kicker text-primary">Kampaň</p>
              <div key={slide.href} className="kampan-fade">
                <h2 className="mt-1 font-display text-[1.35rem] font-bold text-navy-900 md:text-[1.5rem]">
                  {slide.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-[0.95rem] leading-[1.55] text-muted-foreground">
                  {slide.text}
                </p>
              </div>
              <span className="kampan-cta">Gaza GenoLIE →</span>
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
        <Hero />

        {/* Zvýrazněné téma: Antisemitismus */}
        <section className="bg-primary text-primary-foreground">
          <div className="tema-strip mx-auto flex max-w-[88rem] w-full flex-col items-stretch gap-6 px-4 py-8 md:px-6">
            <div className="flex w-full items-center justify-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/25">
                <StarOfDavid className="h-6 w-6" />
              </span>
              <div className="max-w-2xl">
                <p className="kicker text-primary-foreground/70">
                  Klíčové téma
                </p>
                <h2 className="mt-1 font-display text-[1.5rem] font-bold tracking-tight md:text-[1.875rem]">
                  Antisemitismus
                </h2>
                <p className="tema-perex mt-1 max-w-xl text-[13px] leading-snug text-primary-foreground/85">
                  Nová podoba starých předsudků — jak ji poznat, pojmenovat a věcně vyvracet.
                </p>
              </div>
            </div>
            <div className="tema-buttons flex flex-wrap items-center gap-3">
              <Link
                to="/antisemitismus"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
              >
                Číst k tématu
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ptejte-se-ai"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
              >
                Ptejte se AI
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/nahlasit-incident"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-destructive px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Nahlásit incident
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <KampanStrip />

        {/* Výběr redakce */}
        <section className="vyber-section">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="home-section-title">Výběr redakce</h2>
              <Link
                to="/clanky"
                className="cta-link inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                Všechny texty <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="vyber-grid mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {VYBER_REDAKCE.map((item) => (
                <ArticleCard
                  key={item.slug}
                  image={item.image}
                  tag={item.tag}
                  date={item.date}
                  title={item.title}
                  perex={item.perex}
                  slug={item.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tydýt týdne + Dokumentujeme */}
        <section className="section-band">
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <div className="border-t-2 border-primary pt-5">
              <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-6">
                {/* Tydýt */}
                <div className="flex h-full min-h-0 flex-col">
                  <h2 className="home-section-title home-section-title--split">Tydýt týdne</h2>
                  <article className="tydyt-card card-lift group mt-3 flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card md:flex-row">
                    <img
                      src="/images/tydyt-konrad.jpg"
                      alt="Tydýt týdne — Konrad Stavridis"
                      loading="lazy"
                      className="tydyt-photo shrink-0 object-cover object-[50%_18%]"
                      width={363}
                      height={387}
                      decoding="async"
                    />
                    <div className="tydyt-body flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <Link
                            to="/clanky"
                            search={{ filtr: "tydyt" }}
                            className="article-tag rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] hover:opacity-85"
                          >
                            Tydýt
                          </Link>
                          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                            02/09/26
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-primary">
                          <Link to="/clanky" search={{ filtr: "tydyt" }} className="group-hover:underline">
                            Konrad Stavridis
                          </Link>
                        </h3>
                        <p className="mt-1.5 text-[0.95rem] leading-[1.55] text-muted-foreground">
                          Tento týden vysvětluje, proč se o Izraeli mluví jinak než o jiných státech.
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
                  <h2 className="home-section-title home-section-title--split">Dokumentujeme</h2>
                  <article className="documentujeme-card mt-3 flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="documentujeme-inner flex h-full flex-1 flex-col justify-start p-4">
                      <div className="documentujeme-entries flex flex-col gap-3">
                        {[
                          {
                            tag: "Incident",
                            date: "28/08/26",
                            text: "Poškozená výloha židovské restaurace v Praze — případ dokumentován a předán k ověření.",
                            destructive: true,
                          },
                          {
                            tag: "Výkřik",
                            date: "21/08/26",
                            text: "Poslanec v debatě zopakoval vyvrácené tvrzení o „genocidě“ bez jakéhokoliv kontextu.",
                            destructive: false,
                          },
                        ].map((d) => (
                          <div
                            key={d.text}
                            className="documentujeme-entry flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className={`rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white ${
                                  d.destructive ? "bg-destructive" : "bg-primary"
                                }`}
                              >
                                {d.tag}
                              </span>
                              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                                {d.date}
                              </span>
                            </div>
                            <p className="text-[0.95rem] leading-[1.55] text-muted-foreground">{d.text}</p>
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
                          className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          Nahlásit incident
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sekce článků — záložky ve stylu Visegrad24 */}
        <ArticleTabs />







      </main>
      <SiteFooter />
    </div>
  );
}
