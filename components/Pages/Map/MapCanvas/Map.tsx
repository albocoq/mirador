"use client";

import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { useSpotPreview } from "@/components/context/useSpotPreview";
import type { UserLocation } from "@/components/Pages/Map/MapCanvas";
import type { Spot } from "@/types/database";

const MALAGA = {
  latitude: 36.72016,
  longitude: -4.42034,
};
export default function Map({
  mapRef,
  spots,
  userLocation,
}: {
  mapRef: React.RefObject<MapRef | null>;
  spots: Spot[];
  userLocation: UserLocation | null;
}) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const { selectedSpot, handleSelectedSpot, handleClosePreview } =
    useSpotPreview();

  if (!token) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-900 px-6 text-center text-white">
        <div className="max-w-md space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500">
            Mapbox configuration
          </p>
          <h1 className="text-xl font-semibold">Mapbox token missing</h1>
          <p className="text-sm text-neutral-400">
            Add <code className="text-amber-400">NEXT_PUBLIC_MAPBOX_TOKEN</code>{" "}
            to
            <code className="ml-1 text-amber-400">.env.local</code> to display
            the map.
          </p>
        </div>
      </div>
    );
  }

  const centerOnUserLocation = () => {
    if (userLocation) {
      mapRef.current?.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 1200,
        zoom: 14.5,
      });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
      <MapboxMap
        initialViewState={{ ...MALAGA, zoom: 13.5 }}
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={token}
        reuseMaps
        onClick={() => handleClosePreview()}
        onLoad={centerOnUserLocation}
      >
        {userLocation && (
          <Marker
            anchor="center"
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          >
            <div
              aria-label="Votre position"
              className="size-5 rounded-full border-[3px] border-white bg-sky-500 shadow-[0_0_0_7px_rgba(14,165,233,0.25),0_0_18px_rgba(14,165,233,0.8)]"
              role="img"
            />
          </Marker>
        )}

        {spots.map((spot) => {
          const isSelected = selectedSpot?.id === spot.id;

          return (
            <Marker
              anchor="bottom"
              key={spot.id}
              latitude={spot.latitude}
              longitude={spot.longitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleSelectedSpot(spot);
              }}
            >
              <button
                aria-label={`Voir ${spot.title}`}
                className={`flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isSelected
                    ? "size-14 -translate-y-2 border-white bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                    : "size-11 -translate-y-1 border-white/80 bg-[#1A1A1A] text-amber-500 shadow-lg hover:scale-110"
                }`}
                type="button"
              >
                {spot.is_hidden_gem ? "✦" : "⌖"}
              </button>
            </Marker>
          );
        })}
      </MapboxMap>
    </div>
  );
}
