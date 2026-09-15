import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CARD_SIZES, cardSrcSet } from "@/lib/img";

export function ArticleCard({
  image,
  tag,
  date,
  title,
  perex,
  slug,
  priority = false,
}: {
  image: string;
  tag: string;
  date?: string | undefined;
  title: string;
  perex: string;
  slug?: string;
  priority?: boolean;
}) {
  const webp = cardSrcSet(image);
  const photo = (
    <img
      src={image}
      alt=""
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={1280}
      height={720}
      sizes={CARD_SIZES}
      className="aspect-video w-full object-cover"
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );

  const body = (
    <>
      <h3 className="font-display text-xl font-bold leading-snug text-primary group-hover:underline">
        {title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-[1.55] text-muted-foreground">{perex}</p>
      <span className="cta-link mt-auto inline-flex items-center gap-2 pt-4 text-primary">
        Číst článek <ArrowRight className="size-4" aria-hidden />
      </span>
    </>
  );

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {webp ? (
        <picture className="contents">
          <source type="image/webp" srcSet={webp} sizes={CARD_SIZES} />
          {photo}
        </picture>
      ) : (
        photo
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/clanky"
            search={{ tag }}
            className="article-tag rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] hover:opacity-85"
          >
            {tag}
          </Link>
          {date ? (
            <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
              {date}
            </span>
          ) : null}
        </div>
        {slug ? (
          <Link to="/clanky/$slug" params={{ slug }} className="mt-3 flex flex-1 flex-col no-underline">
            {body}
          </Link>
        ) : (
          <Link to="/clanky" className="mt-3 flex flex-1 flex-col no-underline">
            {body}
          </Link>
        )}
      </div>
    </article>
  );
}
