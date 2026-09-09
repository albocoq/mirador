"use client";

import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import { ExternalLink, MapPinned, Navigation } from "lucide-react";

import type { Spot } from "@/types/database";
import Link from "next/link";

export function LocationMap({ spot }: { spot: Spot }) {
  const coordinates = `${spot.latitude},${spot.longitude}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
  const wazeUrl = `https://www.waze.com/ul?ll=${encodeURIComponent(coordinates)}&navigate=yes`;
  const latitudeDirection = spot.latitude >= 0 ? "N" : "S";
  const longitudeDirection = spot.longitude >= 0 ? "E" : "W";

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Location & Trajectory</h2>
        <span className="font-mono text-[11px] text-altalaya-muted">
          {Math.abs(spot.latitude).toFixed(3)}° {latitudeDirection},{" "}
          {Math.abs(spot.longitude).toFixed(3)}° {longitudeDirection}
        </span>
      </div>

      <div className="relative h-64 overflow-hidden rounded-4xl border border-white/10">
        <MapboxMap
          attributionControl={false}
          dragRotate={false}
          doubleClickZoom={false}
          initialViewState={{
            latitude: spot.latitude,
            longitude: spot.longitude,
            zoom: 13.5,
          }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          scrollZoom={false}
          touchPitch={false}
        >
          <Marker
            anchor="center"
            latitude={spot.latitude}
            longitude={spot.longitude}
          >
            <div
              aria-label={`Position de ${spot.title}`}
              className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-altalaya-accent text-[#522300] shadow-[0_0_0_8px_rgba(255,122,0,0.25),0_0_20px_rgba(255,122,0,0.7)]"
              role="img"
            >
              <MapPinned className="size-5" />
            </div>
          </Marker>
        </MapboxMap>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0e0e0e]/95 via-transparent to-[#0e0e0e]/20" />
        <div className="absolute w-fit rounded-2xl p-2 inset-x-3 bottom-1.5 left-1.5 flex items-end justify-between gap-3 bg-black z-10">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-altalaya-accent">
              <Navigation className="size-4 text-[#522300]" />
            </span>
            <div>
              <p className="text-[13px] font-semibold">Position du spot</p>
              <p className="font-mono text-[11px] text-altalaya-muted">
                Carte interactive
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#2a2a2a] px-3 py-2.5 text-[13px] font-medium text-altalaya-peach transition-colors hover:bg-[#353535]"
          href={googleMapsUrl}
          rel="noreferrer"
          target="_blank"
        >
          <Navigation className="size-4" />
          Google Maps
          <ExternalLink className="size-3.5 text-altalaya-muted" />
        </Link>
        <Link
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#2a2a2a] px-3 py-2.5 text-[13px] font-medium text-altalaya-peach transition-colors hover:bg-[#353535]"
          href={wazeUrl}
          rel="noreferrer"
          target="_blank"
        >
          <Navigation className="size-4" />
          Waze
          <ExternalLink className="size-3.5 text-altalaya-muted" />
        </Link>
      </div>
    </section>
  );
}
