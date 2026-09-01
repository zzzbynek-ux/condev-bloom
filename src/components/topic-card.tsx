import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export type TopicCardProps = {
  kicker?: string;
  title: string;
  text: string;
  href: string;
  cta?: string;
  className?: string;
};

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

  return (
    <article
      className={`rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className ?? ""}`}
    >
      {kicker ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70">
          {kicker}
        </p>
      ) : null}
      <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <Wrapper
        {...wrapperProps}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        {cta} <ArrowRight className="size-4" />
      </Wrapper>
    </article>
  );
}
