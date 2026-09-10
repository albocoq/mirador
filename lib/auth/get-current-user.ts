import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCurrentUserClaims = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  return { claims: data?.claims ?? null, error };
});

export const getCurrentUserId = cache(async () => {
  const { claims } = await getCurrentUserClaims();

  return claims?.sub ?? null;
});
