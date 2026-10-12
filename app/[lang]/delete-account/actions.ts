"use server";

import { redirect } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";
import { storagePathsFromPublicUrls } from "@/lib/storage/cleanup";

const IMAGE_BUCKET = "altalaya-images";
const CONFIRM_WORD = "DELETE";

function resolveLocale(raw: FormDataEntryValue | null): Locale {
  const value = String(raw ?? "");
  return isLocale(value) ? value : "en";
}

function deleteAccountPath(lang: Locale, query?: string) {
  const base = localePath(lang, "/delete-account");
  return query ? `${base}?${query}` : base;
}

export async function signInWithPasswordAction(formData: FormData) {
  const lang = resolveLocale(formData.get("lang"));
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      deleteAccountPath(
        lang,
        `error=${encodeURIComponent(error.message)}`,
      ),
    );
  }

  redirect(deleteAccountPath(lang));
}

export async function signOutDeleteAccountAction(formData: FormData) {
  const lang = resolveLocale(formData.get("lang"));
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(deleteAccountPath(lang));
}

export async function deleteOwnAccountAction(formData: FormData) {
  const lang = resolveLocale(formData.get("lang"));
  const confirm = String(formData.get("confirm") ?? "").trim();

  if (confirm !== CONFIRM_WORD) {
    redirect(
      deleteAccountPath(lang, "error=confirm"),
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(deleteAccountPath(lang, "error=auth"));
  }

  const [{ data: spots, error: spotsError }, { data: profile, error: profileError }] =
    await Promise.all([
      supabase.from("spots").select("image_urls").eq("user_id", user.id),
      supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .maybeSingle(),
    ]);

  if (spotsError || profileError) {
    redirect(
      deleteAccountPath(
        lang,
        `error=${encodeURIComponent(
          spotsError?.message ?? profileError?.message ?? "load",
        )}`,
      ),
    );
  }

  const imageUrls = (spots ?? []).flatMap(
    (spot) => (spot.image_urls as string[] | null) ?? [],
  );
  if (profile?.avatar_url) imageUrls.push(profile.avatar_url as string);

  if (imageUrls.length > 0) {
    const paths = storagePathsFromPublicUrls(imageUrls);
    if (paths.length === 0) {
      redirect(deleteAccountPath(lang, "error=photos"));
    }

    const { error: storageError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .remove(paths);

    if (storageError) {
      redirect(
        deleteAccountPath(
          lang,
          `error=${encodeURIComponent(storageError.message)}`,
        ),
      );
    }
  }

  const { error: rpcError } = await supabase.rpc("delete_own_account");
  if (rpcError) {
    redirect(
      deleteAccountPath(lang, `error=${encodeURIComponent(rpcError.message)}`),
    );
  }

  await supabase.auth.signOut();
  redirect(deleteAccountPath(lang, "deleted=1"));
}
