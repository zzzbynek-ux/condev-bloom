import { createFileRoute, Link } from "@tanstack/react-router";
import type * as React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { MoreButton } from "@/components/more-button";
import { ARTICLE_SECTIONS, HERO_BANNER, VYBER_REDAKCE } from "@/lib/content";
import { heroSrcSet, HERO_SIZES } from "@/lib/img";

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
  }, [total, i]);

  const slide = HERO_BANNER[i] ?? HERO_BANNER[0]!;

  return (
    <section className={`hero-section relative isolate overflow-hidden bg-navy-900${slide.overlay === "strong" ? " hero-overlay-strong" : ""}`}>
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
          <p className="kicker text-white/85">
            {slide.kicker}
          </p>
          {i === 0 ? (
            <h1 key={slide.title} className="animate-rise mt-1.5 text-balance font-display text-[1.65rem] font-bold leading-[1.15] text-white lg:text-[2.1rem]">
              {slide.title}
            </h1>
          ) : (
            <p key={slide.title} className="animate-rise mt-1.5 text-balance font-display text-[1.65rem] font-bold leading-[1.15] text-white lg:text-[2.1rem]">
              {slide.title}
            </p>
          )}
          <p
            key={slide.text}
            className="hero-perex animate-rise mt-3 hidden max-w-md text-pretty text-[0.95rem] leading-[1.55] text-white md:block lg:max-w-lg"
          >
            {slide.text}
          </p>

          {i === 0 ? (
            <Link
              to="/o-nas"
              className="cta-link mt-3 inline-flex items-center gap-2 text-white hover:text-white"
            >
              O nás <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link
              to="/clanky/$slug"
              params={{ slug: slide.slug }}
              className="cta-link mt-3 inline-flex items-center gap-2 text-white hover:text-white"
            >
              Číst článek <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="hero-nav pointer-events-none absolute inset-0 z-40">
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
              className="hero-count pointer-events-none px-2 font-sans text-xs font-semibold tabular-nums text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
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
