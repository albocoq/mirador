"use server";

import { revalidatePath } from "next/cache";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/types/database";
import { redirect } from "next/navigation";
import {
  getCurrentUserClaims,
  getCurrentUserId,
} from "@/lib/auth/get-current-user";

type ActionResult<T> = {
  data: T | null;
  error: string | null;
  code?: string;
};

export type UserActionResult = ActionResult<UserProfile>;

export type UsernameSyncResult = {
  error: string | null;
};

const PROFILE_COLUMNS =
  "id, created_at, user, username, avatar_url, bio, email";

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

export async function ensureCurrentUserUsername(): Promise<UsernameSyncResult> {
  try {
    const supabase = await createClient();
    const { claims, error } = await getCurrentUserClaims();

    if (error) return { error: error.message };
    if (!claims?.email) return { error: null };

    const base = claims?.email
      .split("@", 1)[0]
      ?.trim()
      .replace(/[^a-zA-Z0-9_]+/g, "_")
      .slice(0, 42);
    if (!base) return { error: null };

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const username =
        attempt === 0
          ? base
          : `${base}${Math.floor(100000 + Math.random() * 900000)}`;
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", claims?.sub)
        .is("username", null);

      if (!error) return { error: null };
      if (!error.message.toLowerCase().includes("duplicate")) {
        return { error: error.message };
      }
    }

    return { error: "Unable to generate a unique username." };
  } catch (error) {
    return {
      error: getErrorMessage(error, "Unable to initialize the username."),
    };
  }
}

export async function getCurrentUserProfile(): Promise<UserActionResult> {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/");

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select(PROFILE_COLUMNS)
      .eq("id", userId)
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
  const userRealName = getText(formData, "user");
  const bio = getText(formData, "bio");
  const avatarUrl = getText(formData, "avatar_url");

  if (username.length > 50) {
    return {
      data: null,
      error: "The username cannot exceed 50 characters.",
    };
  }
  if (userRealName.length > 50) {
    return {
      data: null,
      error: "The display name cannot exceed 50 characters.",
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
    const userId = await getCurrentUserId();

    if (!userId) return { data: null, error: "You must be signed in." };

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: username,
        user: userRealName || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
      })
      .eq("id", userId)
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
