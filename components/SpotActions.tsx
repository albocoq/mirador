"use client";

import { useState } from "react";

type Props = {
  title: string;
  url: string;
  latitude: number | null;
  longitude: number | null;
};

const buttonClass =
  "inline-flex items-center justify-center border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-ember hover:text-ember";

export function SpotActions({ title, url, latitude, longitude }: Props) {
  const [copied, setCopied] = useState(false);
  const hasPosition = latitude != null && longitude != null;
  const mapsHref = hasPosition
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    : null;
  const wazeHref = hasPosition
    ? `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`
    : null;

  async function share() {
    const payload = { title, text: title, url };
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className={buttonClass} onClick={() => void share()}>
        {copied ? "Copié" : "Partager"}
      </button>
      {mapsHref ? (
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          Google Maps
        </a>
      ) : null}
      {wazeHref ? (
        <a
          href={wazeHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          Waze
        </a>
      ) : null}
    </div>
  );
}
