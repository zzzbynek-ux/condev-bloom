import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleCard } from "@/components/article-card";
import { articleBySlug, IMPORTED, formatDate, rewriteImportedHtml, htmlHasImage, clipPerex } from "@/lib/articles";
import { articleAuthor, articleJsonLd, bylineSuffix } from "@/lib/author";
import { getArticleHtml } from "@/lib/get-article-html";
import { ARTICLE_HERO_SIZES } from "@/lib/img";

export const Route = createFileRoute("/clanky/$slug")({
  loader: async ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    const html = await getArticleHtml({ data: params.slug });
    return { article, html };
  },
  pendingComponent: ArticlePending,
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    const ld = article
      ? articleJsonLd({
          title: article.title,
          perex: article.perex,
          iso: article.iso,
          image: article.image,
          slug: article.slug,
          author: article.author,
        })
      : null;
    return {
      meta: [
        { title: `${article?.title ?? "Článek"} — JednímHlasem` },
        { name: "description", content: article?.perex ?? "" },
      ],
      scripts: ld
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(ld),
            },
          ]
        : [],
    };
  },
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
  const author = articleAuthor(article.author);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-12 md:px-6">
          <div className="article-folio md:rounded-2xl md:border md:border-border md:bg-card md:px-10 md:py-10 md:shadow-sm">
            <p className="kicker text-primary">{article.tag}</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{article.title}</h1>
            <p className="article-byline mt-3">
              {formatDate(article.iso)}
              <span aria-hidden="true"> · </span>
              {bylineSuffix(author)}
            </p>
            {showLeadImage ? (
              <img
                src={article.image}
                alt=""
                width={1280}
                height={720}
                sizes={ARTICLE_HERO_SIZES}
                decoding="async"
                className="mt-8 aspect-video w-full rounded-xl object-cover"
              />
            ) : null}
            <div className="article-body mt-8 text-[17px] leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: body }} />
            {author.kind === "translation" && author.original?.name ? (
              <div className="article-source">
                <p>Původní text: {author.original.name}</p>
                {author.original.medium || author.original.date ? (
                  <p>{[author.original.medium, author.original.date].filter(Boolean).join(", ")}</p>
                ) : null}
                <p>Překlad: Redakce JednímHlasem</p>
              </div>
            ) : null}
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
                <p className="kicker text-primary">Čtěte dál</p>
                <h2 className="home-section-title mt-2">
                  Související
                </h2>
                <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <ArticleCard
                      key={r.slug}
                      image={r.image}
                      tag={r.tag}
                      date={formatDate(r.iso)}
                      title={r.title}
                      perex={clipPerex(r.perex)}
                      slug={r.slug}
                    />
                  ))}
                </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
