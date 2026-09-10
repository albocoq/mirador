"use client";

import { BottomNav } from "@/components/Elements/BottomNav";
import { MapCanvas } from "@/components/Pages/Map/MapDashboard/MapCanvas";
import { SpotPreviewProvider } from "@/components/context/useSpotPreview";
import { MapSpot } from "@/types/database";

export function MapDashboard({ spots }: { spots: MapSpot[] }) {
  return (
    <SpotPreviewProvider>
      <main className="mx-auto flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-altalaya-night text-altalaya-text shadow-[0_0_80px_rgba(0,0,0,0.35)] relative">
        <MapCanvas spots={spots} />
        <BottomNav />
      </main>
    </SpotPreviewProvider>
  );
}
