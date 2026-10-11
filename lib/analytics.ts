import posthog from "posthog-js";
import { readConsent } from "@/lib/consent";

/** PostHog project API key. Empty = analytics disabled. */
export const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() || "";

/** Ingestion host — default EU Cloud. */
export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com";

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

function hasAnalyticsConsent() {
  return readConsent() === "granted";
}

function isLoaded() {
  return Boolean((posthog as { __loaded?: boolean }).__loaded);
}

/** Init PostHog after analytics consent. Idempotent. */
export function initAnalytics() {
  if (!POSTHOG_KEY || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  if (!isLoaded()) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
    });
  }

  posthog.opt_in_capturing();
}

/** Stop capturing and clear PostHog identity (reject / withdraw). */
export function disableAnalytics() {
  if (typeof window === "undefined" || !POSTHOG_KEY) return;
  if (!isLoaded()) return;
  posthog.opt_out_capturing();
  posthog.reset();
}

/** Fire an event only after analytics consent. */
export function trackEvent(name: string, params?: AnalyticsEventParams) {
  if (!POSTHOG_KEY || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  initAnalytics();
  posthog.capture(name, params);
}

export function trackPageView(pagePath: string) {
  if (!POSTHOG_KEY || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  initAnalytics();
  posthog.capture("$pageview", {
    $current_url: window.location.origin + pagePath,
    path: pagePath,
  });
}
