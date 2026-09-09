"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/types/database";

type ActionResult<T> = {
  data: T | null;
  error: string | null;
};

export type UserActionResult = ActionResult<UserProfile>;

export type UsernameSyncResult = {
  error: string | null;
};

const PROFILE_COLUMNS = "id, created_at, username, avatar_url, bio";

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

/**
 * Initializes the username from the authenticated user's email without
 * replacing a username that the user has already customized.
 */
export async function ensureCurrentUserUsername(): Promise<UsernameSyncResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) return { error: userError.message };
    if (!user?.email) return { error: null };

    const username = user.email.split("@", 1)[0]?.trim();
    if (!username || username.length > 50) return { error: null };

    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id)
      .is("username", null);

    return { error: error?.message ?? null };
  } catch (error) {
    return {
      error: getErrorMessage(error, "Unable to initialize the username."),
    };
  }
}

export async function getCurrentUserProfile(): Promise<UserActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) return { data: null, error: userError.message };
    if (!user) return { data: null, error: "You must be signed in." };

    const { data, error } = await supabase
      .from("profiles")
      .select(PROFILE_COLUMNS)
      .eq("id", user.id)
      .maybeSingle();

    if (error) return { data: null, error: error.message };
    if (!data) return { data: null, error: "Profile not found." };

    return { data: data as UserProfile, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error, "Unable to load your profile."),
    };
  }
}

export async function getUserById(userId: string): Promise<UserActionResult> {
  const normalizedUserId = userId.trim();
  if (!isUuid(normalizedUserId)) {
    return { data: null, error: "A valid user ID is required." };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select(PROFILE_COLUMNS)
      .eq("id", normalizedUserId)
      .maybeSingle();

    if (error) return { data: null, error: error.message };
    if (!data) return { data: null, error: "Profile not found." };

    return { data: data as UserProfile, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error, "Unable to load the profile."),
    };
  }
}

export async function updateProfile(
  formData: FormData,
): Promise<UserActionResult> {
  const username = getText(formData, "username");
  const bio = getText(formData, "bio");
  const avatarUrl = getText(formData, "avatar_url");

  if (username.length > 50) {
    return {
      data: null,
      error: "The username cannot exceed 50 characters.",
    };
  }
  if (bio.length > 500) {
    return { data: null, error: "The bio cannot exceed 500 characters." };
  }
  if (avatarUrl) {
    try {
      new URL(avatarUrl);
    } catch {
      return { data: null, error: "The avatar URL is invalid." };
    }
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) return { data: null, error: userError.message };
    if (!user) return { data: null, error: "You must be signed in." };

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: username || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
      })
      .eq("id", user.id)
      .select(PROFILE_COLUMNS)
      .single();

    if (error) return { data: null, error: error.message };

    revalidatePath("/profile");
    return { data: data as UserProfile, error: null };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error, "Unable to update your profile."),
    };
  }
}
