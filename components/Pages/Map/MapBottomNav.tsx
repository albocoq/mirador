import Image from "next/image";

import { mapAssets } from "@/lib/assets/map-assets";

export function MapBottomNav() {
  return (
    <nav
      className="shrink-0 px-4 pb-3 pt-2 absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#0e0e0e] to-transparent"
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between rounded-full px-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <button
          className="flex min-w-11 flex-1 flex-col items-center gap-1 text-altalaya-peach"
          type="button"
        >
          <Image alt="" height={18} src={mapAssets.mapIcon} width={18} />
          <span className="text-[11px] font-bold tracking-[0.88px]">
            Explore
          </span>
        </button>
        <button
          aria-label="Add a spot"
          className="mx-2 flex size-12 items-center justify-center rounded-full bg-linear-to-br from-altalaya-accent to-[#ffb955] shadow-[0_4px_12px_rgba(255,122,0,0.28)]"
          type="button"
        >
          <Image alt="" height={16} src={mapAssets.add} width={16} />
        </button>
        <button
          className="flex min-w-11 flex-1 flex-col items-center gap-1 text-altalaya-muted"
          type="button"
        >
          <Image alt="" height={16} src={mapAssets.profileIcon} width={16} />
          <span className="text-[11px] font-bold tracking-[0.88px]">
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
}
