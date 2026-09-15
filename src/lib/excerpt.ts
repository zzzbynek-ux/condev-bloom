/** Drop a trailing unfinished fragment so a card perex ends on . ! ? … */
export function clipPerex(text: string): string {
  const t = String(text ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!t) return "";

  const parts = t.split(/(?<=[.!?…][„“”"»]?)\s+/).filter(Boolean);
  const complete = parts.filter((p, i) => i < parts.length - 1 || /[.!?…][„“”"»]?$/.test(p));
  if (complete.length) return complete.slice(0, 2).join(" ");

  const lastSpace = t.lastIndexOf(" ");
  return lastSpace > 0 ? t.slice(0, lastSpace).trim() : t;
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}
