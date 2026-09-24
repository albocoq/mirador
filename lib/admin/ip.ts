import type { NextRequest } from "next/server";

/** Normalize loopback / IPv4-mapped forms so allowlists stay simple. */
export function normalizeIp(ip: string): string {
  const trimmed = ip.trim().toLowerCase();
  if (!trimmed) return "";
  if (trimmed === "::1") return "127.0.0.1";
  if (trimmed.startsWith("::ffff:")) return trimmed.slice(7);
  return trimmed;
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return normalizeIp(forwarded.split(",")[0] ?? "");
  }

  const real = normalizeIp(
    request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "",
  );
  if (real) return real;

  // Direct local hit (no proxy headers) — treat as loopback.
  const host = request.headers.get("host") ?? "";
  if (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]")
  ) {
    return "127.0.0.1";
  }

  return "";
}

export function getAllowedAdminIps(): string[] {
  return (process.env.ADMIN_ALLOWED_IPS ?? "")
    .split(",")
    .map((ip) => normalizeIp(ip))
    .filter(Boolean);
}

export function isAdminIpAllowed(request: NextRequest): boolean {
  const allowed = getAllowedAdminIps();
  if (allowed.length === 0) return false;
  const ip = getClientIp(request);
  if (!ip) return false;
  return allowed.includes(ip);
}
