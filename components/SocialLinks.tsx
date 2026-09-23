"use client";

import { trackEvent } from "@/lib/analytics";
import { SOCIAL_LINKS } from "@/lib/config";

type Props = {
  className?: string;
};

const iconClass = "size-5 shrink-0";

function InstagramIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z" />
      <path d="M16.8 2H7.2A5.2 5.2 0 0 0 2 7.2v9.6A5.2 5.2 0 0 0 7.2 22h9.6a5.2 5.2 0 0 0 5.2-5.2V7.2A5.2 5.2 0 0 0 16.8 2Zm3.4 14.8a3.4 3.4 0 0 1-3.4 3.4H7.2a3.4 3.4 0 0 1-3.4-3.4V7.2a3.4 3.4 0 0 1 3.4-3.4h9.6a3.4 3.4 0 0 1 3.4 3.4v9.6Z" />
      <circle cx="17.5" cy="6.5" r="1.2" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.6 7.3a6.4 6.4 0 0 1-3.7-1.2v7.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 1 0 2 2.7V2.5h2.7c.2 1.6 1.1 3 2.4 3.9a5.4 5.4 0 0 0 2.6.9v2Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.3 5.2A16 16 0 0 0 15.2 4l-.2.4a14.5 14.5 0 0 1 3.4 1.3 13.5 13.5 0 0 0-12.8 0A14.5 14.5 0 0 1 8.9 4.4 16 16 0 0 0 4.7 5.2C1.9 9.4 1.2 13.4 1.5 17.4a16.2 16.2 0 0 0 5 2.5l1-1.3a10.5 10.5 0 0 1-1.6-.8l.4-.3a11.5 11.5 0 0 0 10.4 0l.4.3c-.5.3-1 .6-1.6.8l1 1.3a16.2 16.2 0 0 0 5-2.5c.4-4.6-.7-8.5-2.2-12.2ZM8.7 14.7c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2-.8 2-1.8 2Z" />
    </svg>
  );
}

const ICONS = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  Discord: DiscordIcon,
} as const;

const STYLES = {
  Instagram:
    "border-white/20 text-sand hover:border-[#E1306C]/60 hover:bg-[#E1306C]/15 hover:text-[#ff7aa8]",
  TikTok:
    "border-white/20 text-sand hover:border-white/45 hover:bg-white/10 hover:text-white",
  Discord:
    "border-white/20 text-sand hover:border-[#5865F2]/60 hover:bg-[#5865F2]/20 hover:text-[#aab0ff]",
} as const;

export function SocialLinks({ className = "" }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.label];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            onClick={() => trackEvent(link.event, { location: "home" })}
            className={`group inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-semibold transition ${STYLES[link.label]}`}
          >
            <Icon />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
