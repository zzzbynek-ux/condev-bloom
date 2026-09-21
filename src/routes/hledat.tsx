import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

type SearchParams = { q?: string | undefined };

export const Route = createFileRoute("/hledat")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [{ title: "Jedním hlasem" }],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
  component: HledatRedirect,
});

function HledatRedirect() {
  return <Navigate to="/" replace />;
}
