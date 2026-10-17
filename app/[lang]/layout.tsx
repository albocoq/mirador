import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ConsentProvider } from "@/components/ConsentProvider";
import { PostHogAnalytics } from "@/components/PostHogAnalytics";
import { I18nProvider } from "@/components/I18nProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  ANDROID_PACKAGE,
  buildPageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "../globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#10100f" },
    { media: "(prefers-color-scheme: light)", color: "#10100f" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    appLinks: {
      android: {
        package: ANDROID_PACKAGE,
        app_name: SITE_NAME,
        url: SITE_URL,
      },
      web: {
        url: SITE_URL,
        should_fallback: true,
      },
    },
    other: {
      "google-play-app": `app-id=${ANDROID_PACKAGE}`,
    },
    ...buildPageMetadata({
      locale: lang,
      path: "/",
      title: dict.meta.title,
      description: dict.meta.description,
      keywords: dict.meta.keywords,
      absoluteTitle: true,
    }),
    title: {
      default: dict.meta.title,
      template: `%s · ${SITE_NAME}`,
    },
  };
}

export default async function LangRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="m-0 min-h-dvh font-sans text-sand">
        <div className="flex h-dvh flex-col overflow-hidden">
          <I18nProvider locale={locale} dict={dict}>
            <SiteHeader />
            <main className="relative z-10 min-h-0 flex-1 overflow-y-auto">
              {children}
            </main>
            <SiteFooter />
            <ConsentProvider />
            <PostHogAnalytics />
          </I18nProvider>
        </div>
      </body>
    </html>
  );
}
