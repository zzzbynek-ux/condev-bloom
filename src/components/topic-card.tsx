import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CARD_SIZES, cardSrcSet } from "@/lib/img";
import { articleBySlug } from "@/lib/articles";
import { csNbsp } from "@/lib/typo";

export type TopicCardProps = {
  kicker?: string;
  title: string;
  text: string;
  href: string;
  cta?: string;
  className?: string;
};

function topicImage(href: string) {
  const slug = href.startsWith("/clanky/") ? href.slice("/clanky/".length).split(/[?#]/)[0] : "";
  const image = slug ? articleBySlug(slug)?.image : undefined;
  if (!image || image.includes("fallback")) return undefined;
  return image;
}

export function TopicCard({
  kicker,
  title,
  text,
  href,
  cta = "Číst dál",
  className,
}: TopicCardProps) {
  const isExternal = href.startsWith("http");
  const Wrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href, target: "_blank", rel: "noreferrer" }
    : { to: href };
  const image = topicImage(href);
  const webp = image ? cardSrcSet(image) : undefined;
  const photo = image ? (
    <img
      src={image}
      alt=""
      loading="lazy"
      decoding="async"
      width={1280}
      height={720}
      sizes={CARD_SIZES}
      className="aspect-video w-full object-cover"
    />
  ) : null;

  return (
    <article
      className={`card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card ${className ?? ""}`}
    >
      {photo ? (
        webp ? (
          <picture className="contents">
            <source type="image/webp" srcSet={webp} sizes={CARD_SIZES} />
            {photo}
          </picture>
        ) : (
          photo
        )
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {kicker ? <p className="kicker text-primary/70">{kicker}</p> : null}
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-primary">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-[1.55] text-muted-foreground">{csNbsp(text)}</p>
        <Wrapper
          {...wrapperProps}
          className="cta-link mt-4 inline-flex items-center gap-1.5 text-primary hover:underline"
        >
          {cta} <ArrowRight className="size-4" />
        </Wrapper>
      </div>
    </article>
  );
}