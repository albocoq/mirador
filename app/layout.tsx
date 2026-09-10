import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { InstallAppButton } from "@/components/Elements/InstallAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Altalaya Discovery",
    template: "%s | Altalaya Discovery",
  },
  description: "Discover quiet sunset viewpoints and connect with skywatchers.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Altalaya",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-altalaya-night antialiased`}
    >
      <body className="m-0 flex min-h-full flex-col bg-altalaya-night font-sans text-altalaya-text">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.deferredPWAInstall=e;});`,
          }}
        />
        <InstallAppButton />
        {children}
      </body>
    </html>
  );
}
