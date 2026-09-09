"use server";

import {
  failure,
  getErrorMessage,
  success,
  type ActionResult,
} from "@/lib/action-result";
import { createClient } from "@/lib/supabase/server";
import type { Spot, SpotInsert } from "@/types/database";

export type SpotActionResult = ActionResult<Spot>;

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(formData: FormData, name: string): number | null {
  const value = getText(formData, name);
  if (!value) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getStringArray(formData: FormData, name: string): string[] {
  const values = formData
    .getAll(name)
    .filter((value): value is string => typeof value === "string")
    .flatMap((value) => {
      const trimmed = value.trim();
      if (!trimmed) return [];

      try {
        const parsed: unknown = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is string =>
              typeof item === "string" && item.trim() !== "",
          );
        }
      } catch {
        // Fall back to comma-separated values.
      }

      return trimmed
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    });

  return [...new Set(values)];
}

function getBoolean(formData: FormData, name: string): boolean {
  return ["true", "1", "on"].includes(getText(formData, name).toLowerCase());
}

export async function getSpots(): Promise<ActionResult<Spot[]>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("spots")
      .select(
        "id, created_at, user_id, title, description, latitude, longitude, image_urls, tags, rating, is_hidden_gem",
      )
      .order("created_at", { ascending: false });

    if (error) return failure("Unable to load spots.");
    return success(data ?? []);
  } catch (error) {
    console.error("getSpots failed", error);
    return failure(getErrorMessage(error, "Unable to load spots."));
  }
}

export async function getSpotById(id: string): Promise<ActionResult<Spot>> {
  if (!id.trim()) return failure("A spot ID is required.");

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("spots")
      .select(
        "id, created_at, user_id, title, description, latitude, longitude, image_urls, tags, rating, is_hidden_gem",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) return failure("Unable to load the spot.");
    if (!data) return failure("Spot not found.");
    return success(data);
  } catch (error) {
    console.error("getSpotById failed", error);
    return failure(getErrorMessage(error, "Unable to load the spot."));
  }
}

export async function createSpot(
  _state: SpotActionResult,
  formData: FormData,
): Promise<ActionResult<Spot>> {
  const title = getText(formData, "title");
  const description = getText(formData, "description");
  const latitude = getNumber(formData, "latitude");
  const longitude = getNumber(formData, "longitude");
  const ratingText = getText(formData, "rating");
  const rating = ratingText ? Number(ratingText) : 5;

  if (!title) return failure("A title is required.");
  if (title.length > 200) {
    return failure("The title cannot exceed 200 characters.");
  }
  if (latitude === null || latitude < -90 || latitude > 90) {
    return failure("Latitude must be between -90 and 90.");
  }
  if (longitude === null || longitude < -180 || longitude > 180) {
    return failure("Longitude must be between -180 and 180.");
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    return failure("Rating must be between 0 and 5.");
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) return failure("Unable to verify your session.");
    if (!user) return failure("You must be signed in to create a spot.");

    const spot: SpotInsert = {
      user_id: user.id,
      title,
      description: description || null,
      latitude,
      longitude,
      image_urls: getStringArray(formData, "image_urls"),
      tags: getStringArray(formData, "tags"),
      rating,
      is_hidden_gem: getBoolean(formData, "is_hidden_gem"),
    };

    const { data, error } = await supabase
      .from("spots")
      .insert(spot)
      .select(
        "id, created_at, user_id, title, description, latitude, longitude, image_urls, tags, rating, is_hidden_gem",
      )
      .single();

    if (error) return failure("Unable to create the spot.");
    return success(data);
  } catch (error) {
    console.error("createSpot failed", error);
    return failure(getErrorMessage(error, "Unable to create the spot."));
  }
}
