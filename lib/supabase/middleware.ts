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

  let user;
  let userError;

  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
    userError = result.error;
  } catch (error) {
    if (isMissingSessionError(error)) {
      user = null;
      userError = null;
    } else {
      clearAuthCookies(request, response);
      return redirectWithCookies(new URL("/", request.url), response);
    }
  }

  const isPublicRoute = ["/", "/login", "/register"].includes(
    request.nextUrl.pathname,
  );
  const isAuthCallback = request.nextUrl.pathname === "/auth/callback";

  if (userError && !isMissingSessionError(userError)) {
    clearAuthCookies(request, response);
    return redirectWithCookies(new URL("/", request.url), response);
  }

  if (!user && !isPublicRoute && !isAuthCallback) {
    return redirectWithCookies(new URL("/", request.url), response);
  }

  if (user && isPublicRoute) {
    return redirectWithCookies(new URL("/dashboard", request.url), response);
  }

  return response;
}
