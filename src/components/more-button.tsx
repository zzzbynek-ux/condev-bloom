import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Centrované pill tlačítko pod mřížkou článků.
 * Vede na další články stejné rubriky / tagu.
 */
export function MoreButton({
  label,
  to = "/clanky",
  search,
}: {
  label: string;
  to?: string;
  search?: { tag?: string };
}) {
  return (
    <div className="mt-8 flex justify-center">
      <Link
        to={to}
        search={search}
        className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        {label} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
