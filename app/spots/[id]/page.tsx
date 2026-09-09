import { notFound, redirect } from "next/navigation";

import { getSpotById } from "@/app/actions/spots";
import { SpotDetailsPage } from "@/components/Pages/SpotDetails/SpotDetailsPage";
import { createClient } from "@/lib/supabase/server";

export default async function SpotDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { id } = await params;
  const result = await getSpotById(id);
  if (!result.data) notFound();

  return <SpotDetailsPage spot={result.data} />;
}
