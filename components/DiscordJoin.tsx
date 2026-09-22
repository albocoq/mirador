"use client";

import { useEffect, useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { DISCORD_INVITE_URL } from "@/lib/config";

type Props = {
  className?: string;
};

export function DiscordJoin({ className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const discordHref = DISCORD_INVITE_URL || "#";

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={`inline-block ${className}`}>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("discord_modal_open");
        }}
        className="inline-flex items-center justify-center bg-[#5865F2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4752C4]"
      >
        Únete al Discord para la Beta
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md border border-white/12 bg-ridge p-5 shadow-2xl sm:p-6"
          >
            <h2
              id={titleId}
              className="font-display text-xl tracking-tight text-sand sm:text-2xl"
            >
              Discord · Beta
            </h2>
            <p className="mt-3 text-sm leading-6 text-mist sm:text-base sm:leading-7">
              Estás a punto de entrar al servidor de Discord de Altalaya. Para
              poder descargar la aplicación, por favor avísame por mensaje
              privado o en el canal general que quieres ser un &apos;beta
              tester&apos;. Así podré asignarte el rol correcto y darte acceso a
              la zona de descargas.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center bg-white/10 px-4 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/15 hover:text-sand sm:w-auto"
              >
                Cancelar
              </button>
              <a
                href={discordHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center bg-[#5865F2] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4752C4] sm:w-auto"
                onClick={() => {
                  trackEvent("discord_join");
                  setOpen(false);
                }}
              >
                Entendido, ir a Discord
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
