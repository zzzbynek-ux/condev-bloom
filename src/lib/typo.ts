/** Keep short Czech words, abbreviations, units and dates off the line end. */
const SHORT =
  /(?<=^|[\s\u00A0([„«"'])([KkSsVvZzOoUuAaIi]|[Oo]d|[Dd]o|[Nn]a|[Pp]od|[Pp]o|[Nn]ad|[Pp]řed|[Pp]ři|[Pp]ro|[Bb]ez|[Zz]a|[Vv]e|[Kk]e|[Ss]e|[Zz]e|[Kk]u|[Čč]i|[Tt]ím|[Čč]ím|[Nn]ež)[ \t]+(?=\p{L})/gu;

const ABBREV =
  /(?<=^|[^\p{L}\p{N}])([Tt]zv\.|[Tt]j\.|[Nn]apř\.|[Aa]pod\.|[Aa]tp\.)[ \t]+(?=\p{L})/gu;

const TITLE =
  /(?<=^|[^\p{L}\p{N}])(PhDr\.|MUDr\.|Ing\.|Mgr\.|Bc\.|[Pp]rof\.|[Dd]r\.)[ \t]+(?=\p{L})/gu;

const DATE = /(\d{1,2})\.[ \t]+(?=\d)/g;

const UNIT = /(\d)[ \t]+(?=Kč|%|°C|ks\b)/g;

/** Space after a dash stays with the next word. Space before the dash may break. */
const DASH = /([–—])[ \t]+/g;

function glue(pattern: RegExp, text: string): string {
  return text.replace(pattern, (match) => match.replace(/[ \t]+$/, "\u00A0"));
}

export function csNbsp(text: string): string {
  return glue(DASH, glue(UNIT, glue(DATE, glue(TITLE, glue(ABBREV, glue(SHORT, text))))));
}

export function csNbspHtml(html: string): string {
  return html.replace(/<[^>]*>|[^<]+/g, (chunk) => (chunk.startsWith("<") ? chunk : csNbsp(chunk)));
}
