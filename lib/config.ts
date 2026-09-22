/** Discord invite URL for the Altalaya beta server. */
export const DISCORD_INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL?.trim() || "";

/** Public Google Drive link to the Altalaya APK (share → Anyone with the link). */
export const APK_DRIVE_URL =
  process.env.NEXT_PUBLIC_APK_DRIVE_URL?.trim() || "";

/** VirusTotal report URL for the published APK. */
export const VIRUSTOTAL_URL =
  process.env.NEXT_PUBLIC_VIRUSTOTAL_URL?.trim() || "";
