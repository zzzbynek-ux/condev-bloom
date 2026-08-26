import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { searchSite } from "@/lib/search";

type SearchParams = { q?: string | undefined };

export const Route = createFileRoute("/hledat")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Vyhledávání — JednímHlasem" },
      {
        name: "description",
        content: "Prohledejte články, témata a manifesty komunity JednímHlasem.",
      },
      { property: "og:title", content: "Vyhledávání — JednímHlasem" },
      { property: "og:description", content: "Najděte články, témata a analýzy na webu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Hledat,
});

function Hledat() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [value, setValue] = useState(q ?? "");
  const results = q ? searchSite(q) : [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <h1 className="text-4xl font-semibold md:text-5xl">Vyhledávání</h1>

        <form
          className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            void navigate({ search: { q: value } });
          }}
        >
          <Search className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Zadejte heslo, např. antisemitismus"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Hledaný výraz"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-primary-foreground"
          >
            Hledat
          </button>
        </form>

        {q ? (
          <p className="mt-6 text-sm text-muted-foreground">
            {results.length === 0
              ? `Pro „${q}“ jsme nic nenašli.`
              : `Nalezeno ${results.length} výsledků pro „${q}“.`}
          </p>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Prohledáváme články, témata, rubriky i manifesty.
          </p>
        )}

        <ul className="mt-6 divide-y divide-border border-t border-border">
          {results.map((r, i) => (
            <li key={`${r.kind}-${r.title}-${i}`} className="py-5">
              <p className="text-xs uppercase tracking-[0.16em] text-primary">{r.kind}</p>
              <Link
                to={r.to}
                className="mt-1 block text-xl font-semibold text-foreground hover:text-primary"
              >
                {r.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
