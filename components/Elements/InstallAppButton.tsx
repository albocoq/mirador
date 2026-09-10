"use client";

import { useState } from "react";
import { Download, Share, PlusSquare } from "lucide-react";
import { useInstallApp } from "@/hooks/useInstallApp";

export function InstallAppButton() {
  const { isInstallable, installApp, isIOS } = useInstallApp();
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  if (!isInstallable && !isIOS) return null;

  return (
    <div className="flex flex-col gap-3 absolute bottom-30 left-2 z-99999">
      <button
        onClick={() =>
          isIOS ? setShowIosPrompt(!showIosPrompt) : installApp()
        }
        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#1a1a1a] px-4 py-3.5 text-[12px] font-bold text-amber-500 transition-all hover:border-amber-500/50 hover:bg-white/5 active:scale-95"
      >
        <Download className="size-4.5" />
        Installer Altalaya
      </button>

      {showIosPrompt && isIOS && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 text-sm text-neutral-300">
          <p className="mb-3 font-medium text-white">
            Pour installer sur iPhone :
          </p>
          <ol className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              1. Appuyez sur l&apos;icône{" "}
              <Share className="size-5 text-blue-400" /> dans Safari
            </li>
            <li className="flex items-center gap-2">
              2. Choisissez <PlusSquare className="size-5 text-neutral-400" />{" "}
              <b>Sur l&apos;écran d&apos;accueil</b>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
