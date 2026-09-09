"use client";

import { useState } from "react";

import { BottomCta } from "./SpotDetailsPage/BottomCta";
import { Description } from "./SpotDetailsPage/Description";
import { Hero } from "./SpotDetailsPage/Hero";
import { LocationMap } from "./SpotDetailsPage/LocationMap";
import { SpotIntro } from "./SpotDetailsPage/SpotIntro";
import type { Spot } from "@/types/database";

type SpotDetailsPageProps = { spot: Spot };

export function SpotDetailsPage({ spot }: SpotDetailsPageProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const description =
    spot.description || "No description available for this spot.";
  const tags = spot.tags.length ? spot.tags.slice(0, 4) : [];
  const image = spot.image_urls[0];

  return (
    <main className="mx-auto flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-altalaya-night text-altalaya-text shadow-[0_0_80px_rgba(0,0,0,0.35)]">
      <div className="min-h-0 flex-1 overflow-y-auto pb-28">
        <Hero
          image={image}
          title={spot.title}
          onShare={() =>
            navigator.share?.({ title: spot.title, url: window.location.href })
          }
        />
        <div className="-mt-12 flex flex-col gap-6 rounded-t-[3rem] bg-altalaya-night px-4 pt-5">
          <SpotIntro spot={spot} tags={tags} />
          {/* TODO */}

          {/* <SpotStats /> */}
          {/* <SolarTrajectory /> */}

          <Description
            description={description}
            expanded={isExpanded}
            onToggle={() => setIsExpanded((value) => !value)}
          />
          {/* TODO */}

          {/* <RecentCaptures /> */}
          <LocationMap spot={spot} />
        </div>
      </div>
      <BottomCta />
    </main>
  );
}
