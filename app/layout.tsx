import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login | Altalaya Discovery",
  description: "Sign in to find your quiet corner.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-altalaya-night antialiased`}
    >
      <body className="m-0 flex min-h-full flex-col bg-altalaya-night font-sans text-altalaya-text">
        {children}
      </body>
    </html>
  );
}
