import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { formatCardDate } from "@/lib/excerpt";

type TagVariant = "solid" | "main" | "column" | "danger";

type TagProps = {
  /** solid: běžný tag; main: hlavní rubrika článku; column: hlavní rubrika sloupku; danger: incident. */
  variant?: TagVariant;
  /** Když je zadané, tag je odkaz na /clanky s tímto filtrem; jinak jde o obyčejný štítek. */
  search?: { tag?: string; filtr?: string };
  className?: string;
  children: ReactNode;
};

const VARIANT_CLASS: Record<TagVariant, string> = {
  solid: "",
  main: "tag--main",
  column: "tag--main tag--column",
  danger: "tag--danger",
};

/** Sdílený štítek (tag/rubrika) ve stylu starého webu: ostrý obdélník, styly jsou v src/styles.css (.tag). */
export function Tag({ variant = "solid", search, className, children }: TagProps) {
  const classes = cn("tag", VARIANT_CLASS[variant], className);
  if (search) {
    return (
      <Link to="/clanky" search={search} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}

/** Datum u karet vpravo ve tvaru dd/mm/yy (z českého zápisu „17. 9. 2026“). */
export function TagDate({ value, className }: { value?: string | undefined; className?: string }) {
  if (!value) return null;
  return <span className={cn("tag-date", className)}>{formatCardDate(value)}</span>;
}
