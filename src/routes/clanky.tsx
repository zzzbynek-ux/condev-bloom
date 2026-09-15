import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  tag: z.string().optional(),
  filtr: z.string().optional(),
});

export const Route = createFileRoute("/clanky")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ClankyLayout,
});

function ClankyLayout() {
  return <Outlet />;
}
