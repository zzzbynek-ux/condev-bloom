import { createServerFn } from "@tanstack/react-start";

export const getArticleHtml = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data }) => {
    const { articleHtmlServer } = await import("@/lib/article-html.server");
    return articleHtmlServer(data);
  });
