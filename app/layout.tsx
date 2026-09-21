import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { ConsentProvider } from "@/components/ConsentProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Altalaya",
    template: "%s · Altalaya",
  },
  description:
    "Legal pages for Altalaya — privacy policy and terms of use for the community map of viewpoints.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="m-0 flex h-dvh flex-col overflow-hidden font-sans text-sand">
        <SiteHeader />
        <main className="relative z-10 min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
        <SiteFooter />
        <ConsentProvider />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
