import Image from "next/image";

import { mapAssets } from "@/lib/assets/map-assets";

export function MapHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-white/5 bg-altalaya-night/90 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Image
          alt="Altalaya"
          className="size-8 rounded-full"
          height={32}
          src={mapAssets.logo}
          width={32}
        />
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.55px] text-altalaya-peach">
            Altalaya
          </p>
          <h1 className="text-lg font-semibold leading-6 tracking-tight text-altalaya-text">
            Explore Map
          </h1>
        </div>
      </div>
      <button
        aria-label="Open profile"
        className="rounded-full p-1 transition hover:bg-white/10"
      >
        <Image
          alt="Profile"
          className="size-8 rounded-full"
          height={32}
          src={mapAssets.profile}
          width={32}
        />
      </button>
    </header>
  );
}
