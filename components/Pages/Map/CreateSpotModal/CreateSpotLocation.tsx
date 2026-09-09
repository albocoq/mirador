"use client";

import { LocateFixed, MapPin } from "lucide-react";
import { Map as MapboxMap, Marker } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { useRef, useState } from "react";

import type { MapCoordinates } from "@/types/database";
import { SectionHeading } from "./SectionHeading";

type CreateSpotLocationProps = {
  coordinates: MapCoordinates;
  onCoordinatesChange: (coordinates: MapCoordinates) => void;
};

export function CreateSpotLocation({
  coordinates,
  onCoordinatesChange,
}: CreateSpotLocationProps) {
  const mapRef = useRef<MapRef | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const recenterMap = () => {
    mapRef.current?.flyTo({
      center: [coordinates.longitude, coordinates.latitude],
      duration: 700,
      zoom: 15,
    });
  };

  const updateCoordinates = (latitude: number, longitude: number) => {
    const nextCoordinates = { latitude, longitude };
    onCoordinatesChange(nextCoordinates);
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 500,
      zoom: 15,
    });
  };

  const startLongPress = (event: { lngLat: { lat: number; lng: number } }) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    longPressTimer.current = setTimeout(() => {
      updateCoordinates(event.lngLat.lat, event.lngLat.lng);
      longPressTimer.current = null;
    }, 550);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("La géolocalisation n'est pas disponible.");
      setTimeout(() => setLocationError(null), 4000);
      return;
    }

    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords: currentPosition }) => {
        updateCoordinates(currentPosition.latitude, currentPosition.longitude);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setLocationError("Autorisez la localisation pour utiliser ce bouton.");
        setTimeout(() => setLocationError(null), 4000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    );
  };

  return (
    <section className="flex flex-col gap-2">
      <SectionHeading
        label="Precise pin & solar bearing"
        trailing={`${coordinates.latitude.toFixed(4)}° ${coordinates.latitude >= 0 ? "N" : "S"}, ${Math.abs(coordinates.longitude).toFixed(4)}° ${coordinates.longitude >= 0 ? "E" : "W"}`}
      />
      <div className="rounded-4xl bg-altalaya-surface p-4">
        <div className="relative h-44 overflow-hidden rounded-2xl">
          {token ? (
            <MapboxMap
              initialViewState={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                zoom: 15,
              }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={token}
              onMouseDown={startLongPress}
              onMouseUp={cancelLongPress}
              onTouchStart={startLongPress}
              onTouchEnd={cancelLongPress}
              ref={mapRef}
            >
              <Marker
                anchor="center"
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-altalaya-accent to-[#ffb955] text-[#522300] shadow-[0_0_20px_rgba(255,122,0,0.6)]">
                  <MapPin className="size-5" />
                </span>
              </Marker>
            </MapboxMap>
          ) : (
            <div className="flex h-full items-center justify-center bg-[#242321] px-6 text-center text-xs text-altalaya-muted">
              Ajoutez NEXT_PUBLIC_MAPBOX_TOKEN pour afficher la carte.
            </div>
          )}
          <button
            className="absolute right-2 top-2 rounded-full bg-[#353534]/85 px-3 py-1.5 font-mono text-[11px] text-altalaya-text backdrop-blur-md"
            onClick={recenterMap}
            type="button"
          >
            ⌾ Recalibrate
          </button>
          <button
            aria-label="Utiliser ma position actuelle"
            className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-[#353534]/85 px-3 py-1.5 font-mono text-[11px] text-altalaya-text backdrop-blur-md"
            disabled={isLocating}
            onClick={useCurrentLocation}
            type="button"
          >
            <LocateFixed className="size-3.5" />
            {isLocating ? "Localisation…" : "Ma position"}
          </button>
          {locationError && (
            <p className="absolute left-2 right-2 top-11 rounded-lg bg-[#0e0e0e]/90 px-2 py-1 text-center text-[10px] text-red-200">
              {locationError}
            </p>
          )}
          <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-center justify-between bg-[#0e0e0e]/85 px-3 py-1.5 font-mono text-[11px] backdrop-blur-md z-9999">
            <span>◉ Azimuth 274° WNW</span>
            <span className="text-altalaya-peach">⌁ 771m Elev</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-1 pt-4 font-mono text-[11px]">
          <span className="text-altalaya-text">◉ Golden Hour Trajectory</span>
          <span className="text-altalaya-peach">20:14 - 21:02 CEST</span>
        </div>
      </div>
    </section>
  );
}
