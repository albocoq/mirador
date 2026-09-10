"use client";

import type { Spot } from "../../../types/database";
import { useMemo, useState } from "react";
import { ProfileSummary } from "./ProfileSummary";
import { FilterBar } from "./ProfileControls";
import { SpotGrid } from "./SpotGrid";
import { profileFilters } from "./profile-data";
import type { DisplaySpot, ProfilePageProps } from "../../../types/profile";
import Link from "next/link";
import { BottomNav } from "@/components/Elements/BottomNav";
export type { ProfilePageProps } from "../../../types/profile";

type ProfileData = {
  spots: Spot[];
};

function getDisplaySpots({ spots }: Pick<ProfileData, "spots">): DisplaySpot[] {
  return spots.map((spot, index) => ({
    id: spot.id,
    title: spot.title,
    location: `${spot.latitude.toFixed(2)}°, ${spot.longitude.toFixed(2)}°`,
    rating: spot.rating.toFixed(1),
    azimuth: `AZ ${264 + index * 7}° · ${Math.max(12, Math.round(Math.abs(spot.latitude) * 10))}m`,
    image: spot.image_urls[0],
    liked: spot.is_hidden_gem,
  }));
}

export function ProfilePage({ spots }: ProfilePageProps) {
  const [activeFilter, setActiveFilter] = useState(profileFilters[0]);
  const displaySpots = useMemo(() => getDisplaySpots({ spots }), [spots]);

  return (
    <main className="mx-auto flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-altalaya-night text-altalaya-text shadow-[0_0_80px_rgba(0,0,0,0.35)]">
      <div className="min-h-0 flex-1 overflow-y-auto pb-20 py-5">
        <div className="flex flex-col gap-5 px-4">
          <ProfileSummary />
          <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
          {displaySpots.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <p className="text-center text-altalaya-muted">
                No spots to display.
              </p>
              <Link
                href="/dashboard"
                className="mt-3 w-full rounded-lg bg-altalaya-accent py-2 text-sm font-semibold text-altalaya-night hover:bg-altalaya-accent/90 flex items-center justify-center"
              >
                Add your first spot
              </Link>
            </div>
          ) : (
            <SpotGrid spots={displaySpots} />
          )}
          {/* <CuratorBadge /> */}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
