"use client";

import { useI18n } from "@/components/I18nProvider";
import { trackEvent } from "@/lib/analytics";
import { PLAY_STORE_URL } from "@/lib/config";

type Variant = "primary" | "header" | "footer";

type Props = {
  location: string;
  variant?: Variant;
  className?: string;
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M3.6 2.9c-.3.2-.5.6-.5 1.1v16c0 .5.2.9.5 1.1l.1.1L13 12.1v-.2L3.7 2.8l-.1.1Zm11.2 6.4-2.5 2.5 2.5 2.5 5.1-2.9c.7-.4.7-1.1 0-1.5l-5.1-2.6ZM4.1 20.7 12 13.1l2.5 2.5-9.4 5.3c-.5.3-1 .1-1-.2Zm10.4-7.1L12 11l2.5-2.5 3.5 2-3.5 2.1Z"
      />
    </svg>
  );
}

const variantClass: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2.5 bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#ff8f2a]",
  header:
    "inline-flex items-center justify-center gap-1.5 bg-ember px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-[#ff8f2a] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
  footer:
    "inline-flex items-center gap-1.5 font-semibold text-ember underline decoration-ember/40 underline-offset-2 transition hover:text-[#ff8f2a] hover:decoration-ember",
};

export function PlayStoreButton({
  location,
  variant = "primary",
  className = "",
}: Props) {
  const { dict } = useI18n();
  const label =
    variant === "header" ? dict.nav.getApp : dict.home.playStoreCta;

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClass[variant]} ${className}`.trim()}
      onClick={() => trackEvent("play_store_click", { location })}
    >
      {variant !== "footer" ? <PlayIcon className="size-4 shrink-0" /> : null}
      <span>{variant === "footer" ? dict.footer.getApp : label}</span>
    </a>
  );
}
