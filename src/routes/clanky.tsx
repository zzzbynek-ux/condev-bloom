import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  tag: z.string().optional(),
  filtr: z.string().optional(),
  strana: z.coerce.number().optional().catch(undefined),
});

export const Route = createFileRoute("/clanky")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ClankyLayout,
});

function ClankyLayout() {
  return <Outlet />;
}
