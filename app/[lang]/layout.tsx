import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ConsentProvider } from "@/components/ConsentProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { I18nProvider } from "@/components/I18nProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "../globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: "Altalaya",
      template: "%s · Altalaya",
    },
    description: dict.meta.description,
    icons: {
      icon: [{ url: "/logo.png", type: "image/png" }],
      apple: "/logo.png",
    },
  };
}

export default async function LangLayout({
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
      <body className="m-0 flex h-dvh flex-col overflow-hidden font-sans text-sand">
        <I18nProvider locale={locale} dict={dict}>
          <SiteHeader />
          <main className="relative z-10 min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
          <SiteFooter />
          <ConsentProvider />
          <GoogleAnalytics />
        </I18nProvider>
      </body>
    </html>
  );
}
