import { ChevronLeft } from "lucide-react";

export default function HeaderCreateSpot({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/4 bg-altalaya-night/90 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <button
          aria-label="Close"
          className="flex size-11 items-center justify-center rounded-full text-altalaya-text transition hover:bg-white/10"
          onClick={onClose}
          type="button"
        >
          <ChevronLeft className="size-3.75" />
        </button>
        <h2
          className="pl-1 text-lg font-semibold tracking-tight"
          id="create-spot-title"
        >
          Add Spot
        </h2>
      </div>
    </header>
  );
}
