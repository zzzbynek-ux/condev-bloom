import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/zapojte-se")({
  head: () => ({
    meta: [{ title: "O nás — JednímHlasem" }],
  }),
  component: ZapojteSeRedirect,
});

function ZapojteSeRedirect() {
  return <Navigate to="/o-nas" replace />;
}
