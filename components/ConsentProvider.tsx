"use client";

import { useEffect, useState } from "react";
import { CookieConsent } from "@/components/CookieConsent";

export function ConsentProvider() {
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setForceOpen(true);
    }
    window.addEventListener("altalaya:open-cookie-settings", onOpen);
    return () =>
      window.removeEventListener("altalaya:open-cookie-settings", onOpen);
  }, []);

  return (
    <CookieConsent
      forceOpen={forceOpen}
      onClosePreferences={() => setForceOpen(false)}
    />
  );
}
