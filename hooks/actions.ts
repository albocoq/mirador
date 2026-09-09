"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { failure, success, type ActionResult } from "@/lib/action-result";
import { createClient } from "@/lib/supabase/server";
import { ensureCurrentUserUsername } from "@/app/actions/users";

export type AuthActionState = ActionResult<string>;

function textValue(formData: FormData, name: string, trim = true): string {
  const value = formData.get(name);
  if (typeof value !== "string") return "";
  return trim ? value.trim() : value;
}

function validateCredentials(email: string, password: string) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  if (password.length < 6) {
    return "Your password must contain at least 6 characters.";
  }

  return null;
}

export async function signIn(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = textValue(formData, "email");
  const password = textValue(formData, "password", false);
  const validationError = validateCredentials(email, password);

  if (validationError) return failure(validationError);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return failure("Unable to sign in. Check your credentials.");

  redirect("/dashboard");
}

export async function signUp(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = textValue(formData, "email");
  const password = textValue(formData, "password", false);
  const confirmation = textValue(formData, "confirm-password", false);
  const validationError = validateCredentials(email, password);

  if (validationError) return failure(validationError);
  if (password !== confirmation) return failure("Passwords do not match.");

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) return failure("Unable to create your account. Please try again.");
  if (data.session) redirect("/dashboard");

  return success("Check your email to confirm your account.");
}

export async function signInWithGoogle(
  _state: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  void _state;
  void _formData;

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error || !data.url) {
    return failure("Google sign-in is unavailable right now.");
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
