import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Centrované pill tlačítko pod mřížkou článků.
 * Vede na další články stejné rubriky / tagu.
 */
const buttonClass =
  "pill-solid inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold transition-colors";

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
    <div className="mt-8 flex justify-center">
      {onClick ? (
        <button type="button" onClick={onClick} className={buttonClass}>
          {label} <ArrowRight className="size-4" />
        </button>
      ) : (
        <Link to={to} search={search} className={buttonClass}>
          {label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
