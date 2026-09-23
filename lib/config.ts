/** Discord invite URL for the Altalaya beta server. */
export const DISCORD_INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL?.trim() ||
  "https://discord.gg/t5n3TmgvrJ";

/** Instagram profile. */
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
  "https://www.instagram.com/altalaya_off/";

/** TikTok profile. */
export const TIKTOK_URL =
  process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() ||
  "https://www.tiktok.com/@altalaya_off";

/** Public Google Drive link to the Altalaya APK (share → Anyone with the link). */
export const APK_DRIVE_URL =
  process.env.NEXT_PUBLIC_APK_DRIVE_URL?.trim() || "";

/** VirusTotal report URL for the published APK. */
export const VIRUSTOTAL_URL =
  process.env.NEXT_PUBLIC_VIRUSTOTAL_URL?.trim() || "";

export const SOCIAL_LINKS = [
  { label: "Instagram", href: INSTAGRAM_URL, event: "social_instagram" },
  { label: "TikTok", href: TIKTOK_URL, event: "social_tiktok" },
  { label: "Discord", href: DISCORD_INVITE_URL, event: "social_discord" },
] as const;
