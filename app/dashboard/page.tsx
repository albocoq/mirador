import { getSpots } from "@/app/actions/spots";
import { MapDashboard } from "@/components/Pages/Map/MapDashboard";
import { getCurrentUserId } from "@/lib/auth/get-current-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/");

  const { data: spots, error } = await getSpots();

  if (error || !spots) {
    throw new Error(error ?? "Unable to load spots.");
  }

  return <MapDashboard spots={spots} />;
}
