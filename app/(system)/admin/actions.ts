"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import type { ReportStatus } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function setReportStatusAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const p_reporter_id = String(formData.get("reporter_id") ?? "");
  const p_spot_id = String(formData.get("spot_id") ?? "");
  const p_status = String(formData.get("status") ?? "") as ReportStatus;
  const p_notes = String(formData.get("notes") ?? "") || null;

  const { error } = await supabase.rpc("admin_set_report_status", {
    p_reporter_id,
    p_spot_id,
    p_status,
    p_notes,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/reports");
  revalidatePath(`/admin/reports/${p_spot_id}`);
  redirect(`/admin/reports/${p_spot_id}`);
}

export async function setSpotRemovedAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const p_spot_id = String(formData.get("spot_id") ?? "");
  const p_removed = formData.get("removed") === "true";
  const p_reason = String(formData.get("reason") ?? "") || null;
  const alsoActionReport = formData.get("action_report") === "true";
  const reporter_id = String(formData.get("reporter_id") ?? "");

  const { error } = await supabase.rpc("admin_set_spot_removed", {
    p_spot_id,
    p_removed,
    p_reason,
  });

  if (error) throw new Error(error.message);

  if (alsoActionReport && reporter_id) {
    await supabase.rpc("admin_set_report_status", {
      p_reporter_id: reporter_id,
      p_spot_id,
      p_status: "actioned",
      p_notes: p_reason,
    });
  }

  revalidatePath("/admin/spots");
  revalidatePath("/admin/reports");
  revalidatePath(`/admin/reports/${p_spot_id}`);

  const next = String(formData.get("next") ?? "");
  if (next) redirect(next);
}

export async function setUserBannedAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const p_user_id = String(formData.get("user_id") ?? "");
  const p_banned = formData.get("banned") === "true";
  const p_reason = String(formData.get("reason") ?? "") || null;
  const alsoHideSpot = formData.get("hide_spot") === "true";
  const spot_id = String(formData.get("spot_id") ?? "");
  const alsoActionReport = formData.get("action_report") === "true";
  const reporter_id = String(formData.get("reporter_id") ?? "");

  const { error } = await supabase.rpc("admin_set_user_banned", {
    p_user_id,
    p_banned,
    p_reason,
  });

  if (error) throw new Error(error.message);

  if (alsoHideSpot && spot_id) {
    await supabase.rpc("admin_set_spot_removed", {
      p_spot_id: spot_id,
      p_removed: true,
      p_reason: p_reason ?? "owner banned",
    });
  }

  if (alsoActionReport && reporter_id && spot_id) {
    await supabase.rpc("admin_set_report_status", {
      p_reporter_id: reporter_id,
      p_spot_id: spot_id,
      p_status: "actioned",
      p_notes: p_reason,
    });
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin/spots");
  revalidatePath("/admin/reports");
  if (spot_id) revalidatePath(`/admin/reports/${spot_id}`);

  const next = String(formData.get("next") ?? "");
  if (next) redirect(next);
}
