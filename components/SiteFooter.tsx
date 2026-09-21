"use client";

import { trackEvent } from "@/lib/analytics";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-5xl shrink-0 px-6 py-4 text-sm text-mist/60">
      <p>© {new Date().getFullYear()} Altalaya. Community map of viewpoints.</p>
      <p className="mt-0.5">
        Contact:{" "}
        <a
          href="mailto:privacy@altalaya.app"
          className="text-mist underline decoration-white/20 underline-offset-2 hover:text-sand"
          onClick={() => trackEvent("contact_email")}
        >
          privacy@altalaya.app
        </a>
      </p>
    </footer>
  );
}
