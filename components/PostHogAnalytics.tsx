"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  disableAnalytics,
  initAnalytics,
  POSTHOG_KEY,
  trackPageView,
} from "@/lib/analytics";
import { readConsent, type ConsentStatus } from "@/lib/consent";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

export function PostHogAnalytics() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    const current = readConsent();
    setConsent(current);
    if (current === "granted") initAnalytics();
    else disableAnalytics();

    function onConsent(event: Event) {
      const detail = (event as CustomEvent<ConsentStatus | null>).detail;
      setConsent(detail ?? null);
      if (detail === "granted") initAnalytics();
      else disableAnalytics();
    }

    window.addEventListener("altalaya:consent", onConsent);
    return () => window.removeEventListener("altalaya:consent", onConsent);
  }, []);

  if (!POSTHOG_KEY || consent !== "granted") return null;

  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
