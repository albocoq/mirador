"use client";

import { useState } from "react";

import { MapBottomNav } from "@/components/Pages/Map/MapBottomNav";
import { MapCanvas } from "@/components/Pages/Map/MapCanvas";
import { MapHeader } from "@/components/Pages/Map/MapHeader";
import { SpotPreviewProvider } from "@/components/context/useSpotPreview";
import type { Spot } from "@/types/database";

export function MapDashboard({ spots }: { spots: Spot[] }) {
  const [activeFilter, setActiveFilter] = useState("Golden Hour");

  return (
    <SpotPreviewProvider>
      <main className="mx-auto flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-altalaya-night text-altalaya-text shadow-[0_0_80px_rgba(0,0,0,0.35)] relative">
        <MapHeader />
        <MapCanvas
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          spots={spots}
        />
        <MapBottomNav />
      </main>
    </SpotPreviewProvider>
  );
}
