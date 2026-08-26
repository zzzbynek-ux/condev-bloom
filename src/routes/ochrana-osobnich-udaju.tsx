import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/ochrana-osobnich-udaju")({
  head: () => ({
    meta: [
      { title: "Ochrana osobních údajů — Jedním Hlasem" },
      {
        name: "description",
        content:
          "Jak zpracováváme osobní údaje návštěvníků webu Jedním Hlasem: rozsah, účel a vaše práva.",
      },
      { property: "og:title", content: "Ochrana osobních údajů — Jedním Hlasem" },
      {
        property: "og:description",
        content: "Zásady zpracování osobních údajů projektu Jedním Hlasem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-20">
        <h1 className="font-display text-3xl font-bold text-primary md:text-4xl">
          Ochrana osobních údajů
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Osobní údaje zpracováváme jen v nezbytném rozsahu — typicky když nám sami napíšete,
            nahlásíte incident nebo se přihlásíte k odběru.
          </p>
          <p>
            Údaje nepředáváme třetím stranám k marketingovým účelům a uchováváme je pouze po dobu
            nutnou k vyřízení vašeho podnětu.
          </p>
          <p>
            Máte právo na přístup k údajům, jejich opravu i výmaz. Napište nám a ozveme se.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
