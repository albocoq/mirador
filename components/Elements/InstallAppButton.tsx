"use client";

import { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X } from "lucide-react";
import { useInstallApp } from "@/hooks/useInstallApp";

export function InstallAppButton() {
  const { installApp, isIOS, isInstallable } = useInstallApp();
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
  }, []);

  if (isInstallable || dismissed) return null;

  const onClick = async () => {
    if (isIOS) {
      setShowHint((open) => !open);
      return;
    }

    // const prompted = await installApp();
    // if (!prompted) setShowHint((open) => !open);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[5.5rem] z-[10000] flex justify-center px-4 sm:bottom-6">
      <div className="pointer-events-auto flex w-full max-w-md flex-col gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1a1a1a]/95 px-12 py-3.5 text-[15px] font-bold text-amber-500 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all hover:border-amber-500/50 hover:bg-white/5 active:scale-95"
          >
            <Download className="size-5" />
            Installer Altalaya
          </button>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setDismissed(true)}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {showHint && (
          <div className="rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-4 text-sm text-neutral-300 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {isIOS ? (
              <>
                <p className="mb-3 font-medium text-white">
                  Pour installer sur iPhone :
                </p>
                <ol className="flex flex-col gap-3">
                  <li className="flex items-center gap-2">
                    1. Appuyez sur l&apos;icône{" "}
                    <Share className="size-5 text-blue-400" /> dans Safari
                  </li>
                  <li className="flex items-center gap-2">
                    2. Choisissez{" "}
                    <PlusSquare className="size-5 text-neutral-400" />{" "}
                    <b>Sur l&apos;écran d&apos;accueil</b>
                  </li>
                </ol>
              </>
            ) : (
              <p>
                Dans le menu du navigateur, choisis{" "}
                <b className="text-white">Installer l&apos;application</b> (ou
                Ajouter à l&apos;écran d&apos;accueil).
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
