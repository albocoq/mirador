import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminIpAllowed } from "@/lib/admin/ip";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  locales,
} from "@/lib/i18n/config";
import { matchLocale } from "@/lib/i18n/negotiate";
import { updateSession } from "@/lib/supabase/proxy";

function getLocale(request: NextRequest) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return matchLocale(request.headers.get("accept-language"));
}

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAuthCallbackPath(pathname: string) {
  return pathname === "/auth/callback" || pathname.startsWith("/auth/");
}

function isDeleteAccountPath(pathname: string) {
  return locales.some(
    (locale) =>
      pathname === `/${locale}/delete-account` ||
      pathname.startsWith(`/${locale}/delete-account/`),
  );
}

function canRefreshSession() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Internal rewrite target for IP-denied admin (URL stays /admin in the browser).
  if (pathname === "/admin-denied") {
    return NextResponse.next();
  }

  if (isAdminPath(pathname)) {
    if (!isAdminIpAllowed(request)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin-denied";
      return NextResponse.rewrite(url);
    }

    if (canRefreshSession()) {
      return updateSession(request);
    }

    return NextResponse.next();
  }

  // OAuth callback — no locale prefix; refresh session cookies.
  if (isAuthCallbackPath(pathname)) {
    if (canRefreshSession()) {
      return updateSession(request);
    }
    return NextResponse.next();
  }

  // Deep links: serve open-app bridge (bypass locale redirect).
  // /spot/:id and /:locale/spot/:id → public/open-app.html
  const spotPath =
    pathname.match(/^\/spot\/[^/]+\/?$/) ||
    pathname.match(
      new RegExp(`^\\/(?:${locales.join("|")})\\/spot\\/[^/]+\\/?$`),
    );
  if (spotPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/open-app.html";
    return NextResponse.rewrite(url);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    if (isDeleteAccountPath(pathname) && canRefreshSession()) {
      return updateSession(request);
    }
    return;
  }

  const locale = getLocale(request) ?? defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
