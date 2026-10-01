# Pravidla pro Claude Code: web Jedním hlasem

- Web Jedním hlasem, publikovaný na jednimhlasem.grok.me. Stack: TanStack Start, React 19, Tailwind 4, Vite, balíčky přes bun.
- Kontroly typecheck, lint a build na main aktuálně selhávají kvůli platformním souborům Groku (chybí preview-host-bridge a balíček @lovable.dev/vite-tanstack-config) a kvůli formátování. Před sloučením proto porovnej výsledky se stavem main: nesmíš přidat žádnou novou chybu. Existující chyby neopravuj, pokud k tomu nedostaneš samostatné zadání.
- Postup: pracuj ve své větvi, otevři pull request do main a po úspěšných kontrolách ho slouč. Jedna změna = jedno téma.
- Nikdy force push, rebase, amend ani squash už pushnutých commitů.
- Nesahej na platformní soubory Groku: .grok/, src/server.ts, src/start.ts, src/routes/__root.tsx, scripts/with-app-env.mjs a skripty v package.json. Grok z main stahuje kód a publikuje web.
- Pokud kontrola selže kvůli chybě, která v kódu byla už před tvými změnami, neopravuj ji a napiš mi o ní.
- Texty česky, všude vykání. Česká sazba: krátká slova a čísla s jednotkami lep funkcemi csNbsp a csNbspHtml ze src/lib/typo.ts. Pomlčka „–“ s mezerami, uvozovky „…“.
- Text zarovnávej vlevo, nikdy do bloku. Nadpisy h1 až h3 mají text-wrap: balance.
