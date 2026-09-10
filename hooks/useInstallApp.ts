"use client";

import { useState, useEffect } from "react";

export function useInstallApp() {
  // On utilise 'any' ici pour éviter les erreurs TypeScript avec notre variable globale
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
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

    // 1. LA MAGIE EST ICI : On regarde si le filet global a attrapé l'événement
    if (typeof window !== "undefined" && (window as any).deferredPWAInstall) {
      setDeferredPrompt((window as any).deferredPWAInstall);
      setIsInstallable(true);
    }

    // 2. On garde quand même l'écouteur classique au cas où
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
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
      if (typeof window !== "undefined") {
        (window as any).deferredPWAInstall = null; // On vide le filet
      }
    }
  };

  return { isInstallable, installApp, isIOS };
}
