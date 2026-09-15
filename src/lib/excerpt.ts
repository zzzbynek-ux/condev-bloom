const SOFT = 190;
const HARD = 220;

const DONE = /[.!?…][„“”"»']?$/;
const WEAK =
  /^(?:[,;–—]|a|i|ale|že|nebo|či|ani|když|pokud|jak|aby|který|která|které|kterého|kterou|kteří|s|z|v|na|do|o|k|u|ve|ze|ke|po|pro|při|od|za|před|mezi)$/i;

function strip(text: string): string {
  return String(text ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function done(s: string): boolean {
  return DONE.test(s.trim());
}

function dropWeak(s: string): string {
  let t = s.trim().replace(/[,;–—]+$/u, "").trim();
  const words = t.split(/\s+/).filter(Boolean);
  while (words.length > 1 && WEAK.test(words[words.length - 1]!)) words.pop();
  return words.join(" ").replace(/[,;–—]+$/u, "").trim();
}

function cutWord(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return dropWeak(t);
  const slice = t.slice(0, max);
  const sp = slice.lastIndexOf(" ");
  return dropWeak((sp > 0 ? slice.slice(0, sp) : slice).trim());
}

function sentences(t: string): string[] {
  return t.split(/(?<=[.!?…][„“”"»']?)\s+/).filter(Boolean);
}

/** Card perex: ~160–190 chars, max 220, end on a sentence or a word + … */
export function clipPerex(text: string): string {
  const t = strip(text);
  if (!t) return "";

  const parts = sentences(t);
  const complete = parts.filter((p, i) => i < parts.length - 1 || done(p));

  if (complete.length) {
    const first = complete[0]!;
    const two = complete[1] ? `${first} ${complete[1]}` : "";
    if (two && two.length <= HARD) return two;
    if (first.length <= SOFT) return first;
    const body = first.replace(/\s*[.!?…][„“”"»']?$/, "");
    return `${cutWord(body, SOFT)}…`;
  }

  if (t.length <= SOFT) return dropWeak(t);
  return `${cutWord(t, SOFT)}…`;
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}
