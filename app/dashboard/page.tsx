import { getSpots } from "@/app/actions/spots";
import { MapDashboard } from "@/components/Pages/Map/MapDashboard";

export default async function DashboardPage() {
  const { data: spots, error } = await getSpots();

  if (error || !spots) {
    throw new Error(error ?? "Unable to load spots.");
  }

  return <MapDashboard spots={spots} />;
}
