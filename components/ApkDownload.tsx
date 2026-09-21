"use client";

import { useEffect, useId, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { APK_DRIVE_URL, VIRUSTOTAL_URL } from "@/lib/config";

type Props = {
  className?: string;
};

export function ApkDownload({ className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const driveReady = APK_DRIVE_URL.length > 0;
  const virusTotalReady = VIRUSTOTAL_URL.length > 0;

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          setOpen((value) => {
            const next = !value;
            if (next) trackEvent("apk_menu_open");
            return next;
          });
        }}
        className="bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
      >
        Download APK
      </button>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-label="APK download"
          className="absolute bottom-full left-0 z-20 mb-3 w-[min(22rem,calc(100vw-3rem))] border border-white/12 bg-ridge/95 p-4 shadow-xl backdrop-blur-md"
        >
          <p className="text-sm font-semibold text-sand">
            Not on the Play Store yet
          </p>
          <p className="mt-2 text-sm leading-6 text-mist">
            Altalaya is not published on Google Play yet — I&apos;m a student and
            don&apos;t have the store budget for now. This APK is mainly for
            friends and early testers.
          </p>
          <p className="mt-2 text-xs leading-5 text-mist/70">
            Android may warn about installs outside the Play Store. Only install
            if you trust me. You can also check the file on VirusTotal.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            {driveReady ? (
              <a
                href={APK_DRIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
                onClick={() => {
                  trackEvent("apk_download", { method: "google_drive" });
                  setOpen(false);
                }}
              >
                Open Google Drive
              </a>
            ) : (
              <p className="border border-dashed border-white/15 px-3 py-2.5 text-xs text-mist/80">
                Set Drive URL:{" "}
                <code className="text-sand">NEXT_PUBLIC_APK_DRIVE_URL</code>
              </p>
            )}

            {virusTotalReady ? (
              <a
                href={VIRUSTOTAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center border border-white/15 px-4 py-2.5 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
                onClick={() => {
                  trackEvent("virustotal_view");
                  setOpen(false);
                }}
              >
                View on VirusTotal
              </a>
            ) : (
              <p className="border border-dashed border-white/15 px-3 py-2.5 text-xs text-mist/80">
                Set VirusTotal URL:{" "}
                <code className="text-sand">NEXT_PUBLIC_VIRUSTOTAL_URL</code>
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
