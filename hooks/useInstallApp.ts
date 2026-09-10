"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useInstallApp() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));

      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstallable(false);
      }
    }, 0);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return { isInstallable, installApp, isIOS };
}
