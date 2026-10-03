import { Link } from "@tanstack/react-router";

type Props = {
  /** Aktuální stránka (už ošetřená na rozsah 1 až totalPages). */
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  /** Trasa, na které se stránkuje (zachová ostatní vyhledávací parametry). */
  to?: "/clanky";
};

/** Seznam položek řady: první, poslední, aktuální a jedna na každou stranu, mezery jako „…“. */
export function pageItems(page: number, totalPages: number): (number | "gap")[] {
  const keep = new Set([1, totalPages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= totalPages));
  const sorted = [...keep].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1]! > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

/** Ošetří hodnotu z adresy (?strana=) na celé číslo v rozsahu 1 až totalPages. */
export function clampPage(raw: unknown, totalPages: number): number {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, Math.max(1, totalPages));
}

export function Pagination({ page, totalPages, totalItems, pageSize, to = "/clanky" }: Props) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const toItem = Math.min(page * pageSize, totalItems);
  const searchFor = (n: number) => (prev: Record<string, unknown>) => ({
    ...prev,
    strana: n === 1 ? undefined : n,
  });
  const link = (n: number) => ({
    to,
    // Odkaz je obyčejné <a href>; scroll na začátek seznamu řeší stránka sama.
    search: searchFor(n) as never,
    resetScroll: false,
  });

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav aria-label="Stránkování" className="pager mt-10">
      <ul className="pager-row">
        <li>
          {prevDisabled ? (
            <span className="pager-btn pager-step" aria-disabled="true" role="link">
              <span aria-hidden="true">‹</span>
              <span className="pager-step-label"> Předchozí</span>
            </span>
          ) : (
            <Link {...link(page - 1)} rel="prev" className="pager-btn pager-step" aria-label="Předchozí stránka">
              <span aria-hidden="true">‹</span>
              <span className="pager-step-label" aria-hidden="true"> Předchozí</span>
            </Link>
          )}
        </li>

        {pageItems(page, totalPages).map((it, idx) =>
          it === "gap" ? (
            <li key={`gap-${idx}`} className="pager-num pager-gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={it} className="pager-num">
              <Link
                {...link(it)}
                className="pager-btn"
                aria-current={it === page ? "page" : undefined}
                aria-label={`Stránka ${it}`}
              >
                {it}
              </Link>
            </li>
          ),
        )}

        <li className="pager-compact" aria-hidden="true">
          {page} / {totalPages}
        </li>

        <li>
          {nextDisabled ? (
            <span className="pager-btn pager-step" aria-disabled="true" role="link">
              <span className="pager-step-label">Další </span>
              <span aria-hidden="true">›</span>
            </span>
          ) : (
            <Link {...link(page + 1)} rel="next" className="pager-btn pager-step" aria-label="Další stránka">
              <span className="pager-step-label" aria-hidden="true">Další </span>
              <span aria-hidden="true">›</span>
            </Link>
          )}
        </li>
      </ul>
      <p className="pager-info">
        Články {from}–{toItem} z {totalItems} · stránka {page} z {totalPages}
      </p>
    </nav>
  );
}
