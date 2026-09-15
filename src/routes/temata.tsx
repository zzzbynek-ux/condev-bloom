import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/temata")({
  head: () => ({
    meta: [{ title: "O nás — JednímHlasem" }],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/o-nas", hash: "osy", replace: true });
  },
  component: TemataRedirect,
});

function TemataRedirect() {
  return <Navigate to="/o-nas" hash="osy" replace />;
}
