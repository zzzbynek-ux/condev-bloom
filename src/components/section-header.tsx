import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
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
      {kicker ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70">
          {kicker}
        </p>
      ) : null}
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.03em] text-primary md:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        {to ? (
          <Link
            to={to}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {linkLabel} <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
