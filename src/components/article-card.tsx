import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CARD_SIZES, cardSrcSet } from "@/lib/img";
import { articleBySlug } from "@/lib/articles";
import { csNbsp } from "@/lib/typo";
import { Tag, TagDate } from "@/components/tag";

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
  const isColumn = Boolean(slug && articleBySlug(slug)?.author?.kind === "column");
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
      <h3 className="card-title font-display text-xl font-bold leading-snug text-primary group-hover:underline">
        {csNbsp(title)}
      </h3>
      <p className="card-perex mt-3 text-[0.95rem] leading-[1.55] text-muted-foreground">{csNbsp(perex)}</p>
      <span className="cta-link mt-auto inline-flex items-center gap-2 pt-4 text-primary">
        Číst článek <ArrowRight className="size-4" aria-hidden />
      </span>
    </>
  );

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-tile border border-border bg-card">
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
          <Tag variant={isColumn ? "column" : "main"} search={{ tag }}>
            {tag}
          </Tag>
          <TagDate value={date} />
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