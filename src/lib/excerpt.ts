const SOFT = 190;
const HARD = 220;
const MIN = 160;

const DONE = /[.!?…][„“”"»']?$/;
const WEAK =
  /^(?:[,;–—]|a|i|ale|že|nebo|či|ani|když|pokud|jak|aby|který|která|které|kterého|kterou|kteří|s|z|v|na|do|o|k|u|ve|ze|ke|po|pro|při|od|za|před|mezi)$/i;

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#39;|'/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function strip(text: string): string {
  return decodeEntities(String(text ?? ""))
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

function after(full: string, prefix: string): string {
  if (full.startsWith(prefix)) return full.slice(prefix.length).trim();
  return "";
}

function extend(head: string, rest: string): string {
  const t = rest.trim();
  if (!t) return head;
  const room = SOFT - head.length - 1;
  if (room < 8) return head;
  const cut = cutWord(t, room);
  if (!cut) return head;
  return `${head} ${cut}…`;
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
    let out = "";
    if (two && two.length <= HARD) out = two;
    else if (first.length <= SOFT) out = first;
    else {
      const body = first.replace(/\s*[.!?…][„“”"»']?$/, "");
      return `${cutWord(body, SOFT)}…`;
    }
    if (out.length < MIN) {
      const rest = after(t, out);
      if (rest) return extend(out, rest);
    }
    return out;
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
