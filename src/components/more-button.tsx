import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const buttonClass =
  "cta-link inline-flex items-center gap-1.5 text-primary hover:underline";

export function MoreButton({
  label,
  to = "/clanky",
  search = {},
  onClick,
}: {
  label: string;
  to?: string;
  search?: { tag?: string; filtr?: string };
  /** Když je zadaný, tlačítko nenaviguje, ale přibere další karty na místě. */
  onClick?: () => void;
}) {
  return (
    <div className="mt-8 flex justify-start">
      {onClick ? (
        <button type="button" onClick={onClick} className={buttonClass}>
          {label} <ArrowRight className="size-4" aria-hidden />
        </button>
      ) : (
        <Link to={to} search={search} className={buttonClass}>
          {label} <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
