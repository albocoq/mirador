import type { Metadata } from "next";
import {
  defaultLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n/config";

export const SITE_NAME = "Altalaya";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://altalaya.app"
).replace(/\/$/, "");

export const ANDROID_PACKAGE = "com.altalaya.app";

const ogLocaleByLang: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

/** Absolute URL for a locale-prefixed path. */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** Canonical + hreflang alternates (relative; resolved via metadataBase). */
export function localeAlternates(locale: Locale, path = "/") {
  const languages: Record<string, string> = {
    "x-default": localePath(defaultLocale, path),
  };
  for (const l of locales) {
    languages[l] = localePath(l, path);
  }
  return {
    canonical: localePath(locale, path),
    languages,
  };
}

export function buildPageMetadata({
  locale,
  path = "/",
  title,
  description,
  keywords,
  absoluteTitle = false,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Use for the home page so the template suffix is not appended. */
  absoluteTitle?: boolean;
}): Metadata {
  const alternates = localeAlternates(locale, path);
  const url = absoluteUrl(locale, path);
  const alternateLocale = locales
    .filter((l) => l !== locale)
    .map((l) => ogLocaleByLang[l]);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocaleByLang[locale],
      alternateLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
