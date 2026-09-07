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
      className={`card-lift flex h-full flex-col rounded-xl border border-border bg-card p-6 ${className ?? ""}`}
    >
      {kicker ? <p className="kicker text-primary/70">{kicker}</p> : null}
      <h3 className="mt-2 font-display text-xl font-bold leading-snug text-primary">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-[1.55] text-muted-foreground">{text}</p>
      <Wrapper
        {...wrapperProps}
        className="cta-link mt-4 inline-flex items-center gap-1.5 text-primary hover:underline"
      >
        {cta} <ArrowRight className="size-4" />
      </Wrapper>
    </article>
  );
}
