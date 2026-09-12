import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/eshop")({
  head: () => ({
    meta: [
      { title: "E-shop — JednímHlasem" },
      {
        name: "description",
        content: "E-shop iniciativy JednímHlasem.",
      },
      { property: "og:title", content: "E-shop — JednímHlasem" },
    ],
  }),
  component: Eshop,
});

function Eshop() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <div className="border-t-2 border-primary pt-5">
              <p className="kicker text-primary">E-shop</p>
              <h1 className="mt-2 font-display text-[1.5rem] font-bold text-primary md:text-[1.875rem]">
                E-shop
              </h1>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.55] text-foreground">
                Obchod připravujeme. Mezitím nás můžete podpořit darem.
              </p>
              <Link
                to="/podporte-nas"
                className="donate-pill mt-8"
              >
                Podpořte nás
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
