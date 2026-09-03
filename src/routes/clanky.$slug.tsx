import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { articleBySlug, IMPORTED, formatDate } from "@/lib/articles";

export const Route = createFileRoute("/clanky/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.article.title ?? "Článek"} — JednímHlasem` },
      { name: "description", content: loaderData?.article.perex ?? "" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = IMPORTED.filter((a) => a.slug !== article.slug && a.tag === article.tag).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{article.tag}</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{article.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{formatDate(article.iso)}</p>
        {article.image && !article.image.includes("fallback") ? (
          <img src={article.image} alt="" className="mt-8 w-full rounded-xl object-cover" />
        ) : null}
        <div className="article-body mt-8 text-[17px] leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: article.html }} />
        {article.tags.length ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <Link key={t} to="/clanky" search={{ tag: t }} className="rounded-sm bg-accent px-2 py-1 text-[11px] font-semibold text-primary">
                {t}
              </Link>
            ))}
          </div>
        ) : null}
        {related.length ? (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-xl font-bold text-primary">Související</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to="/clanky/$slug" params={{ slug: r.slug }} className="font-semibold text-primary hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
