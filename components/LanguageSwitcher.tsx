"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LOCALE_COOKIE,
  localeNames,
  locales,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";
import { useI18n } from "@/components/I18nProvider";

export function LanguageSwitcher() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    const rest = stripLocale(pathname || "/");
    router.push(`/${next}${rest === "/" ? "" : rest}`);
    router.refresh();
  }

  return (
    <label className="flex items-center gap-2 text-sm text-mist">
      <span className="sr-only">{dict.nav.language}</span>
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value as Locale)}
        aria-label={dict.nav.language}
        className="cursor-pointer border border-white/15 bg-transparent px-2 py-1 text-sm text-sand outline-none transition hover:border-ember/50 focus:border-ember/50"
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-ridge text-sand">
            {localeNames[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
