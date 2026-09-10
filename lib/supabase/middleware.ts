import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

const AUTH_COOKIE_PREFIX = "sb-";

function isMissingSessionError(error: unknown) {
  return error instanceof Error && error.name === "AuthSessionMissingError";
}

function clearAuthCookies(request: NextRequest, response: NextResponse) {
  request.cookies
    .getAll()
    .filter(
      ({ name }) =>
        name.startsWith(AUTH_COOKIE_PREFIX) && name.includes("-auth-token"),
    )
    .forEach(({ name }) => response.cookies.delete(name));
}

function redirectWithCookies(url: URL, response: NextResponse) {
  return NextResponse.redirect(url, {
    headers: new Headers(response.headers),
  });
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );

        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  let hasValidUser = false;
  let hardError = false;

  try {
    const { data, error } = await supabase.auth.getClaims();
    hasValidUser = Boolean(data?.claims) && !error;

    if (error && !isMissingSessionError(error)) {
      hardError = true;
    }
  } catch (error) {
    if (!isMissingSessionError(error)) {
      hardError = true;
    }
  }

  if (hardError) {
    clearAuthCookies(request, response);
    return redirectWithCookies(new URL("/", request.url), response);
  }

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = ["/", "/login", "/register"].includes(pathname);
  const isAuthCallback = pathname === "/auth/callback";
  const isPwaAsset =
    pathname === "/manifest.json" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/sw.js";

  if (!hasValidUser && !isPublicRoute && !isAuthCallback && !isPwaAsset) {
    return redirectWithCookies(new URL("/", request.url), response);
  }

  if (hasValidUser && isPublicRoute) {
    return redirectWithCookies(new URL("/dashboard", request.url), response);
  }

  return response;
}