import { getMapSpots } from "@/app/actions/spots";
import { MapDashboard } from "@/components/Pages/Map/MapDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  console.time("dashboard:getSpots");

  const { data: spots, error } = await getMapSpots();

  console.timeEnd("dashboard:getSpots");

  if (error || !spots) {
    throw new Error(error ?? "Unable to load spots.");
  }

  return <MapDashboard spots={spots} />;
}
