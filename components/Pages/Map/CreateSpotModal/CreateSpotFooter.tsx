import { LoaderCircle } from "lucide-react";

type CreateSpotFooterProps = {
  isPending: boolean;
  onClose: () => void;
};

export function CreateSpotFooter({
  isPending,
  onClose,
}: CreateSpotFooterProps) {
  return (
    <footer className=" flex shrink-0 gap-3 border-t border-white/10 bg-[#0e0e0e]/90 px-4 pb-5 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <button
        className="rounded-full bg-[#2a2a2a] px-5 py-3 text-[15px] text-altalaya-text"
        onClick={onClose}
        type="button"
      >
        Cancel
      </button>
      <button
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-altalaya-accent via-[#ffb955] to-[#ffdbc8] px-5 py-3 text-lg font-semibold text-[#522300] shadow-[0_4px_12px_rgba(255,122,0,0.35)] disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? <LoaderCircle className="size-4 animate-spin" /> : "➤"}{" "}
        {isPending ? "Publishing..." : "Publish Spot"}
      </button>
    </footer>
  );
}
