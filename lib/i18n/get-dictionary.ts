import type { Locale } from "@/lib/i18n/config";
import type en from "@/lib/i18n/dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/lib/i18n/dictionaries/en.json").then((m) => m.default),
  fr: () => import("@/lib/i18n/dictionaries/fr.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
