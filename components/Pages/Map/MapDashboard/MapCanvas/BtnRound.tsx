import { useSpotPreview } from "@/components/context/useSpotPreview";
import { LocateFixed } from "lucide-react";

export default function BtnRound({
  activeFilter,
  isLocating,
  locationError,
  onLocate,
}: {
  activeFilter: string;
  isLocating: boolean;
  locationError: string | null;
  onLocate: () => void;
}) {
  const { isOpen } = useSpotPreview();

  return (
    <div
      className={`absolute right-0 left-0 flex shrink-0 items-end justify-between px-4 pb-2 transition-all duration-200 ${isOpen ? "bottom-35" : "bottom-20"}`}
    >
      <span className="rounded-full bg-[#201f1f]/75 px-3 py-1.5 font-mono text-[11px] text-altalaya-muted backdrop-blur-xl">
        Selected: {activeFilter}
      </span>
      <div className="flex flex-col items-end gap-2">
        {locationError && (
          <p className="max-w-56 rounded-xl bg-[#2a2a2a]/95 px-3 py-2 text-right text-xs text-red-200 shadow-lg backdrop-blur-xl">
            {locationError}
          </p>
        )}
        <button
          aria-label={
            isLocating ? "Recherche de votre position" : "Me localiser"
          }
          className="flex size-11 items-center justify-center rounded-full bg-[#2a2a2a]/85 shadow-[0_6px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl disabled:cursor-wait disabled:opacity-60"
          disabled={isLocating}
          onClick={onLocate}
          type="button"
        >
          <LocateFixed />
        </button>
      </div>
    </div>
  );
}
