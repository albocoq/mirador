"use client";

import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { useI18n } from "@/components/I18nProvider";
import { trackEvent } from "@/lib/analytics";
import { localePath } from "@/lib/i18n/config";

export function SiteFooter() {
  const { locale, dict } = useI18n();

  return (
    <footer className="relative z-10 mx-auto w-full max-w-5xl shrink-0 px-6 py-4 text-sm text-mist/60">
      <p>
        © {new Date().getFullYear()} Altalaya. {dict.footer.tagline}
      </p>
      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>
          {dict.footer.contact}{" "}
          <a
            href="mailto:privacy@altalaya.app"
            className="text-mist underline decoration-white/20 underline-offset-2 hover:text-sand"
            onClick={() => trackEvent("contact_email")}
          >
            privacy@altalaya.app
          </a>
        </span>
        <Link
          href={localePath(locale, "/privacy")}
          className="underline decoration-white/20 underline-offset-2 hover:text-sand"
        >
          {dict.footer.privacy}
        </Link>
        <Link
          href={localePath(locale, "/terms")}
          className="underline decoration-white/20 underline-offset-2 hover:text-sand"
        >
          {dict.footer.terms}
        </Link>
        <CookieSettingsButton className="underline decoration-white/20 underline-offset-2 hover:text-sand" />
      </p>
    </footer>
  );
}
