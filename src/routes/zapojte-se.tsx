import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/zapojte-se")({
  head: () => ({
    meta: [{ title: "O nás — Jedním hlasem" }],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/o-nas", replace: true });
  },
  component: ZapojteSeRedirect,
});

function ZapojteSeRedirect() {
  return <Navigate to="/o-nas" replace />;
}
