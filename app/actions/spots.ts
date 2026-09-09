"use server";

import { createClient } from "@/lib/supabase/server";
import type { Spot } from "@/types/database";

type ActionResult<T> = {
  data: T | null;
  error: string | null;
};

export type SpotActionResult = ActionResult<Spot>;

type SpotInsert = Omit<Spot, "id" | "created_at">;

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
      } catch {}

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

    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as Spot[], error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unable to load spots.",
    };
  }
}

export async function getSpotById(id: string): Promise<ActionResult<Spot>> {
  if (!id.trim()) return { data: null, error: "A spot ID is required." };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("spots")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return { data: null, error: error.message };
    if (!data) return { data: null, error: "Spot not found." };

    return { data: data as Spot, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Unable to load the spot.",
    };
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
  const rating = getNumber(formData, "rating") ?? 5;

  if (!title) return { data: null, error: "A title is required." };
  if (title.length > 200) {
    return { data: null, error: "The title cannot exceed 200 characters." };
  }
  if (latitude === null || latitude < -90 || latitude > 90) {
    return { data: null, error: "Latitude must be between -90 and 90." };
  }
  if (longitude === null || longitude < -180 || longitude > 180) {
    return { data: null, error: "Longitude must be between -180 and 180." };
  }
  if (rating < 0 || rating > 5) {
    return { data: null, error: "Rating must be between 0 and 5." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) return { data: null, error: userError.message };
    if (!user)
      return { data: null, error: "You must be signed in to create a spot." };

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
      .select()
      .single();

    if (error) return { data: null, error: error.message };
    return { data: data as Spot, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Unable to create the spot.",
    };
  }
}
