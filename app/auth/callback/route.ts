import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale, localePath } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";

const OAUTH_NEXT_COOKIE = "oauth_next";

function safeNextPath(raw: string | null): string {
  const fallback = localePath(defaultLocale, "/delete-account");
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;

  const segments = raw.split("/").filter(Boolean);
  if (segments.length === 0) return fallback;
  if (!isLocale(segments[0])) return fallback;
  if (segments[1] !== "delete-account") return fallback;

  return `/${segments[0]}/delete-account`;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(OAUTH_NEXT_COOKIE)?.value;
  const next = safeNextPath(
    fromCookie ? decodeURIComponent(fromCookie) : searchParams.get("next"),
  );

  const clearNextCookie = (response: NextResponse) => {
    response.cookies.set(OAUTH_NEXT_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  };

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return clearNextCookie(NextResponse.redirect(`${origin}${next}`));
    }
  }

  const lang = next.split("/")[1];
  const locale = isLocale(lang) ? lang : defaultLocale;
  return clearNextCookie(
    NextResponse.redirect(
      `${origin}${localePath(locale, "/delete-account")}?error=oauth`,
    ),
  );
}
