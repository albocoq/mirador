import Image from "next/image";
import { MapPin, Star } from "lucide-react";

import type { DisplaySpot } from "../../../types/profile";
import Link from "next/link";

export function SpotGrid({ spots }: { spots: DisplaySpot[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {spots.map((spot) => (
        <Link
          href={spot.id ? `/spots/${spot.id}` : "/profile"}
          className="overflow-hidden rounded-4xl bg-altalaya-surface shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
          key={spot.id ?? spot.title}
        >
          <div className="relative aspect-[0.86] overflow-hidden bg-[#201f1f]">
            {spot.image ? (
              <Image
                alt={spot.title}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 44vw, 280px"
                src={spot.image}
              />
            ) : (
              <div className="w-full h-full text-6xl flex items-center justify-center bg-altalaya-surface">
                {spot.title.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e]/80 via-transparent to-black/20" />
            <div className="absolute left-2 right-2 top-2 flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-full bg-[#0e0e0e]/70 px-2 py-0.5 font-mono text-[13px] backdrop-blur-md">
                <Star className="size-2.5 fill-altalaya-peach text-altalaya-peach" />
                {spot.rating}
              </span>
            </div>
            <span className="absolute bottom-2 left-2 rounded-full bg-[#0e0e0e]/80 px-2 py-1 font-mono text-[11px] text-altalaya-peach backdrop-blur-md">
              {spot.azimuth}
            </span>
          </div>
          <div className="space-y-0.5 p-3">
            <h3 className="truncate text-[17px] font-semibold tracking-tight">
              {spot.title}
            </h3>
            <p className="flex items-center gap-1 truncate text-[13px] text-altalaya-muted">
              <MapPin className="size-3 shrink-0" />
              {spot.location}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
