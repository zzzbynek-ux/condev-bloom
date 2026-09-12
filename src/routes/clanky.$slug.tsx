import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { articleBySlug, IMPORTED, formatDate, rewriteImportedHtml, htmlHasImage, clipPerex } from "@/lib/articles";
import { getArticleHtml } from "@/lib/get-article-html";
import { ARTICLE_HERO_SIZES, RELATED_SIZES, cardSrcSet } from "@/lib/img";

export const Route = createFileRoute("/clanky/$slug")({
  loader: async ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    const html = await getArticleHtml({ data: params.slug });
    return { article, html };
  },
  pendingComponent: ArticlePending,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.article.title ?? "Článek"} — JednímHlasem` },
      { name: "description", content: loaderData?.article.perex ?? "" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePending() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-12 md:px-6">
          <p className="kicker text-primary">Článek</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
            Načítám článek…
          </h1>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function relatedArticles(slug: string, tag: string) {
  const rest = IMPORTED.filter((a) => a.slug !== slug);
  const same = rest.filter((a) => a.tag === tag);
  const others = rest.filter((a) => a.tag !== tag);
  return [...same, ...others].slice(0, 3);
}

function ArticlePage() {
  const { article, html } = Route.useLoaderData();
  const related = relatedArticles(article.slug, article.tag);
  const body = rewriteImportedHtml(html, article.image);
  const showLeadImage = Boolean(article.image) && !article.image.includes("fallback") && !htmlHasImage(html);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-12 md:px-6">
          <div className="article-folio md:rounded-2xl md:border md:border-border md:bg-card md:px-10 md:py-10 md:shadow-sm">
            <p className="kicker text-primary">{article.tag}</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{article.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">{formatDate(article.iso)}</p>
            {showLeadImage ? (
              <img
                src={article.image}
                alt=""
                width={1280}
                height={720}
                sizes={ARTICLE_HERO_SIZES}
                decoding="async"
                className="mt-8 w-full rounded-xl object-cover"
              />
            ) : null}
            <div className="article-body mt-8 text-[17px] leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: body }} />
            {article.tags.length ? (
              <div className="mt-10 flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <Link key={t} to="/clanky" search={{ tag: t }} className="article-tag rounded-sm px-2 py-1 text-[11px] font-semibold">
                    {t}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </article>

        {related.length ? (
          <section className="related-section bg-paper">
            <div className="section-y mx-auto max-w-[88rem] px-5 md:px-6">
              <div className="border-t-2 border-primary pt-5">
                <p className="kicker text-primary">Čtěte dál</p>
                <h2 className="mt-2 font-display text-[1.5rem] font-bold text-primary md:text-[1.875rem]">
                  Související
                </h2>
                <div className="related-grid mt-6">
                  {related.map((r) => {
                    const relatedWebp = cardSrcSet(r.image);
                    const relatedImg = (
                      <img
                        src={r.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={1280}
                        height={720}
                        sizes={RELATED_SIZES}
                        className="related-card-img w-full object-cover"
                      />
                    );
                    return (
                    <Link
                      key={r.slug}
                      to="/clanky/$slug"
                      params={{ slug: r.slug }}
                      className="related-card card-lift group flex flex-col overflow-hidden rounded-xl border border-border bg-card no-underline"
                    >
                      {relatedWebp ? (
                        <picture className="contents">
                          <source type="image/webp" srcSet={relatedWebp} sizes={RELATED_SIZES} />
                          {relatedImg}
                        </picture>
                      ) : (
                        relatedImg
                      )}
                      <div className="related-card-body flex min-h-0 flex-1 flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <span className="article-tag rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                            {r.tag}
                          </span>
                          <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
                            {formatDate(r.iso)}
                          </span>
                        </div>
                        <h3 className="related-card-title font-display font-bold leading-snug text-primary">
                          {r.title}
                        </h3>
                        {r.perex ? (
                          <p className="related-card-perex text-[0.95rem] leading-[1.55] text-muted-foreground">
                            {clipPerex(r.perex)}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
