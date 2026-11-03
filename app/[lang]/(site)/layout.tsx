import type { ReactNode } from "react";
import { ConsentProvider } from "@/components/ConsentProvider";
import { PostHogAnalytics } from "@/components/PostHogAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader />
      <main className="relative z-10 min-h-0 flex-1 overflow-y-auto">{children}</main>
      <SiteFooter />
      <ConsentProvider />
      <PostHogAnalytics />
    </div>
  );
}
