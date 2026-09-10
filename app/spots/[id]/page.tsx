import { notFound } from "next/navigation";

import { getSpotById } from "@/app/actions/spots";
import { SpotDetailsPage } from "@/components/Pages/SpotDetails/SpotDetailsPage";

export default async function SpotDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getSpotById(id);
  if (!result.data) notFound();

  return <SpotDetailsPage spot={result.data} />;
}
