import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ArticleCard({
  image,
  tag,
  date,
  title,
  perex,
  slug,
}: {
  image: string;
  tag: string;
  date?: string | undefined;
  title: string;
  perex: string;
  slug?: string;
}) {
  const href = slug ? `/clanky/${slug}` : "/clanky";
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={1280}
        height={720}
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/clanky"
            search={{ tag }}
            className="rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground hover:opacity-85"
          >
            {tag}
          </Link>
          {date ? (
            <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
              {date}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-primary">
          {slug ? (
            <Link to="/clanky/$slug" params={{ slug }} className="group-hover:underline">
              {title}
            </Link>
          ) : (
            <Link to="/clanky" className="group-hover:underline">
              {title}
            </Link>
          )}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{perex}</p>
        {slug ? (
          <Link
            to="/clanky/$slug"
            params={{ slug }}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:underline"
          >
            Číst dál <ArrowRight className="size-4" />
          </Link>
        ) : (
          <Link
            to="/clanky"
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary hover:underline"
          >
            Číst dál <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}