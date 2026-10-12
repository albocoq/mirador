"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/client";

const OAUTH_NEXT_COOKIE = "oauth_next";

type Props = {
  lang: Locale;
  label: string;
  errorLabel: string;
};

export function GoogleSignInButton({ lang, label, errorLabel }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setPending(true);
    setError(null);

    const next = `/${lang}/delete-account`;
    document.cookie = `${OAUTH_NEXT_COOKIE}=${encodeURIComponent(next)};path=/;max-age=600;samesite=lax`;

    const supabase = createClient();
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Exact path — must be allowlisted in Supabase Auth → Redirect URLs.
        // Do not use altalaya:// here (that triggers xdg-open / the mobile app).
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (oauthError || !data.url) {
      setError(oauthError?.message ?? errorLabel);
      setPending(false);
      return;
    }

    window.location.assign(data.url);
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="w-full border border-white/15 bg-ridge/50 px-4 py-2.5 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember disabled:opacity-60"
      >
        {pending ? "…" : label}
      </button>
      {error ? (
        <p className="text-sm text-ember" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
