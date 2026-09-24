import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "./types";

export async function requireAdmin(): Promise<{
  userId: string;
  profile: Profile;
}> {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    redirect("/admin/login");
  }

  const userId = claimsData.claims.sub as string;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, username, is_admin, is_banned, banned_at, banned_reason, banned_by",
    )
    .eq("id", userId)
    .maybeSingle();

  if (error || !profile?.is_admin) {
    redirect("/");
  }

  return { userId, profile: profile as Profile };
}

export async function getOptionalAdminSession() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) return null;

  const userId = claimsData.claims.sub as string;
  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, username, is_admin, is_banned, banned_at, banned_reason, banned_by",
    )
    .eq("id", userId)
    .maybeSingle();

  if (!profile?.is_admin) return null;
  return { userId, profile: profile as Profile };
}
