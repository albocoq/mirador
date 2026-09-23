"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import {
  clearConsent,
  readConsent,
  writeConsent,
  type ConsentStatus,
} from "@/lib/consent";
import { localePath } from "@/lib/i18n/config";

type Props = {
  /** When true, force the banner open (cookie preferences). */
  forceOpen?: boolean;
  onClosePreferences?: () => void;
};

export function CookieConsent({ forceOpen = false, onClosePreferences }: Props) {
  const { locale, dict } = useI18n();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = readConsent();
    setVisible(forceOpen || current === null);
    setReady(true);
  }, [forceOpen]);

  function decide(status: ConsentStatus) {
    writeConsent(status);
    setVisible(false);
    onClosePreferences?.();
  }

  if (!ready || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/12 bg-ridge/95 p-4 shadow-2xl backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-title"
            className="text-sm font-semibold text-sand"
          >
            {dict.cookies.title}
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-1.5 text-sm leading-6 text-mist"
          >
            {dict.cookies.body}{" "}
            <Link
              href={localePath(locale, "/privacy")}
              className="text-sand underline decoration-white/25 underline-offset-2 hover:text-ember"
            >
              {dict.cookies.privacyLink}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="border border-white/15 px-4 py-2.5 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
          >
            {dict.cookies.reject}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            {dict.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer control to reopen the banner and change choice. */
export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  const { dict } = useI18n();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        clearConsent();
        window.dispatchEvent(
          new CustomEvent("altalaya:open-cookie-settings"),
        );
      }}
    >
      {dict.footer.cookieSettings}
    </button>
  );
}
