import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MAIL, ZAPOJTE } from "@/lib/zapojte-se-content";
import { csNbsp } from "@/lib/typo";

export const Route = createFileRoute("/zapojte-se")({
  head: () => ({
    meta: [
      { title: "Zapojte se — Jedním hlasem" },
      {
        name: "description",
        content: "Máte co říct? Napište to. Nestačí to sledovat. Je potřeba o tom psát.",
      },
    ],
  }),
  component: ZapojteSe,
});

function withMail(text: string) {
  const at = text.indexOf(MAIL);
  if (at < 0) return csNbsp(text);
  return (
    <>
      {csNbsp(text.slice(0, at))}
      <a
        href={`mailto:${MAIL}`}
        className="font-semibold text-primary underline underline-offset-2"
      >
        {MAIL}
      </a>
      {csNbsp(text.slice(at + MAIL.length))}
    </>
  );
}

function BlockLine({ text, split }: { text: string; split: boolean }) {
  if (!split) return csNbsp(text);
  const colon = text.indexOf(":");
  if (colon < 0) return csNbsp(text);
  return (
    <>
      <span className="font-semibold text-primary">{text.slice(0, colon + 1)}</span>
      {csNbsp(text.slice(colon + 1))}
    </>
  );
}

function ZapojteSe() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <section className="onas-hero zapojte-hero relative isolate overflow-hidden bg-navy-900">
          <picture className="contents">
            <source
              type="image/webp"
              srcSet="/images/zapojte-se.webp 1235w, /images/zapojte-se@2x.webp 2470w"
              sizes="100vw"
            />
            <img
              src={ZAPOJTE.image.src}
              srcSet="/images/zapojte-se.jpg 1235w, /images/zapojte-se@2x.jpg 2470w"
              sizes="100vw"
              alt={ZAPOJTE.image.alt}
              width={1235}
              height={459}
              decoding="async"
              fetchPriority="high"
              className="onas-hero-img pointer-events-none"
            />
          </picture>
          <div
            aria-hidden
            className="onas-hero-overlay pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b1a3a]/92 via-[#0b1a3a]/58 via-[42%] to-transparent"
          />
          <div className="onas-hero-grid relative z-10 mx-auto flex h-full w-full max-w-[88rem] items-start justify-start px-5 md:items-center md:px-6">
            <div className="onas-hero-card w-full text-left">
              <h1 className="max-w-xl text-balance font-display text-[1.65rem] font-bold leading-[1.15] text-white md:text-[1.85rem] lg:text-[2.1rem]">
                {csNbsp(ZAPOJTE.title)}
              </h1>
              <div className="onas-hero-copy mt-4 max-w-lg text-[0.95rem] leading-[1.55] text-white/90">
                <p>{csNbsp(ZAPOJTE.lead)}</p>
              </div>
              <p className="mt-3 max-w-lg text-[0.95rem] font-bold leading-[1.55] text-white">
                {csNbsp(ZAPOJTE.close[0])}
              </p>
              <div className="onas-hero-copy mt-3 max-w-lg text-[0.95rem] leading-[1.55] text-white/90">
                <p>{csNbsp(ZAPOJTE.platform)}</p>
              </div>
              <p className="mt-3 max-w-lg text-[0.95rem] font-bold leading-[1.55] text-white">
                {csNbsp(ZAPOJTE.close[1])}
              </p>
              <nav className="onas-hero-nav mt-5" aria-label="Sekce stránky Zapojte se">
                {ZAPOJTE.pills.map((link) => (
                  <a key={link.href} href={link.href} className="onas-hero-pill">
                    {csNbsp(link.label)}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section>
          <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
            <ul className="grid items-stretch gap-4 md:grid-cols-2">
              {ZAPOJTE.blocks.map((block) => (
                <li
                  key={block.id}
                  id={block.id}
                  className="zapojte-block card-lift flex h-full scroll-mt-32 flex-col rounded-tile border border-border bg-card p-6"
                >
                  <h2 className="font-display text-[1.35rem] font-bold leading-tight text-[#0b1a3a]">
                    {csNbsp(block.title)}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="text-[0.95rem] leading-[1.55] text-foreground">
                        <BlockLine text={item} split={block.split} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="zacit" className="onas-band scroll-mt-32">
          <div className="section-y mx-auto max-w-3xl px-5 md:px-6">
            <h2 className="home-section-title">{csNbsp(ZAPOJTE.startTitle)}</h2>
            <ol className="mt-8 space-y-4">
              {ZAPOJTE.start.map((step, index) => (
                <li key={step} className="flex items-baseline gap-4">
                  <span className="w-6 shrink-0 font-display text-2xl font-bold leading-none text-primary">
                    {index + 1}
                  </span>
                  <p className="text-[0.95rem] leading-[1.55] text-foreground">{withMail(step)}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.95rem] leading-[1.55] text-muted-foreground">
              {csNbsp(ZAPOJTE.pseudo)}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
