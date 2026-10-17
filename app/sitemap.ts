import type { MetadataRoute } from "next";
import {
  defaultLocale,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.4 },
  { path: "/delete-account", changeFrequency: "yearly", priority: 0.3 },
];

function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}${localePath(defaultLocale, path)}`,
  };
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}${localePath(locale as Locale, path)}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  );
}
