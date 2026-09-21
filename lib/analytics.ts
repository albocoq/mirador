/** GA4 measurement ID (`G-…`). Empty = analytics disabled. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export type GaEventParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Fire a GA4 event (no-op when GA is unset). Queues until gtag.js loads. */
export function trackEvent(name: string, params?: GaEventParams) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  gtag("event", name, params);
}

export function trackPageView(pagePath: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}
