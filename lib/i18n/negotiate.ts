import type { Locale } from "@/lib/i18n/config";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

/** Pick the best supported locale from an Accept-Language header. */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((x) => x.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (isLocale(tag)) return tag;
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function resolveLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && isLocale(segment) ? segment : null;
}

export { locales, defaultLocale };
