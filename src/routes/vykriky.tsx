import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/vykriky")({
  head: () => ({
    meta: [{ title: "Archiv incidentů — JednímHlasem" }],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/galerie-incidentu", replace: true });
  },
  component: VykrikyRedirect,
});

function VykrikyRedirect() {
  return <Navigate to="/galerie-incidentu" replace />;
}
