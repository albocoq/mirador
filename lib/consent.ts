export type ConsentStatus = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "altalaya_analytics_consent";

export function readConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // private mode / blocked storage
  }
  return null;
}

export function writeConsent(status: ConsentStatus) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(
    new CustomEvent("altalaya:consent", { detail: status }),
  );
}

export function clearConsent() {
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  window.dispatchEvent(
    new CustomEvent("altalaya:consent", { detail: null }),
  );
}
