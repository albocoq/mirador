import { Bookmark, Navigation } from "lucide-react";

export function BottomCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-2xl items-center gap-3 bg-linear-to-t from-altalaya-night via-altalaya-night/95 to-transparent p-4">
      <button
        aria-label="Bookmark"
        className="flex size-14 shrink-0 flex-col items-center justify-center rounded-full bg-[#2a2a2a] text-[9px] text-altalaya-muted"
        type="button"
      >
        <Bookmark size={20} />
      </button>
      <button
        className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-altalaya-accent via-[#ffb955] to-[#ffb955] text-lg font-bold text-[#522300] shadow-[0_4px_12px_rgba(255,122,0,0.35)]"
        onClick={() =>
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${36.758},${-4.391}`,
            "_blank",
          )
        }
        type="button"
      >
        <Navigation className="size-4" />
        Take me there
      </button>
    </div>
  );
}
