import { redirect } from "next/navigation";

import { getSpots } from "@/app/actions/spots";
import { createClient } from "@/lib/supabase/server";
import { MapDashboard } from "@/components/Pages/Map/MapDashboard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: spots } = await getSpots();

  return <MapDashboard spots={spots ?? []} />;
}
