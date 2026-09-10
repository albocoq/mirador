"use client";

import { useEffect, useRef, useState } from "react";
import type { MapRef } from "react-map-gl/mapbox";
import { SpotPreview } from "@/components/Pages/Map/MapDashboard/MapCanvas/SpotPreview";
import BtnRound from "./MapCanvas/BtnRound";
import NavDashboard from "./MapCanvas/NavDashboard";
import type { MapSpot } from "@/types/database";
import type { UserLocation } from "@/types/map";
import Map from "./MapCanvas/Map";

const USER_LOCATION_STORAGE_KEY = "mirador:user-location";

function isValidUserLocation(value: unknown): value is UserLocation {
  if (!value || typeof value !== "object") {
    return false;
  }

  const location = value as Partial<UserLocation>;
  return (
    typeof location.latitude === "number" &&
    Number.isFinite(location.latitude) &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    typeof location.longitude === "number" &&
    Number.isFinite(location.longitude) &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
}

function clearStoredUserLocation() {
  try {
    localStorage.removeItem(USER_LOCATION_STORAGE_KEY);
  } catch {
    // Le stockage peut être indisponible dans certains modes de navigation.
  }
}

export function MapCanvas({ spots }: { spots: MapSpot[] }) {
  const mapRef = useRef<MapRef>(null);
  const [activeFilter, setActiveFilter] = useState("Golden Hour");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const savedLocation = localStorage.getItem(USER_LOCATION_STORAGE_KEY);
        const parsedLocation: unknown = savedLocation
          ? JSON.parse(savedLocation)
          : null;

        if (isValidUserLocation(parsedLocation)) {
          setUserLocation(parsedLocation);
        }
      } catch {
        clearStoredUserLocation();
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;

    const handlePermissionChange = () => {
      if (permissionStatus?.state !== "granted") {
        setUserLocation(null);
        clearStoredUserLocation();
      }
    };

    let isCancelled = false;

    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((status) => {
        if (isCancelled) return;
        permissionStatus = status;
        if (status.state === "denied") handlePermissionChange();
        status.addEventListener("change", handlePermissionChange);
      })
      .catch(() => {
        // Certains navigateurs ne permettent pas de lire l’état de permission.
      });

    return () => {
      isCancelled = true;
      permissionStatus?.removeEventListener("change", handlePermissionChange);
    };
  }, []);

  useEffect(() => {
    if (userLocation) {
      mapRef.current?.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 1200,
        zoom: 14.5,
      });
    }
  }, [userLocation]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setUserLocation(null);
      clearStoredUserLocation();
      setLocationError("La géolocalisation n'est pas disponible.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setUserLocation(location);
        setIsLocating(false);
        try {
          localStorage.setItem(
            USER_LOCATION_STORAGE_KEY,
            JSON.stringify(location),
          );
        } catch {
          // La carte reste utilisable même si le stockage est indisponible.
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setUserLocation(null);
          clearStoredUserLocation();
        }
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? "Autorisez la localisation pour vous situer sur la carte."
            : "Impossible de déterminer votre position.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
    );
  };

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0e0e0e]">
      <NavDashboard
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      />

      <Map mapRef={mapRef} spots={spots} userLocation={userLocation} />

      <BtnRound
        activeFilter={activeFilter}
        isLocating={isLocating}
        locationError={locationError}
        onLocate={handleLocate}
      />

      <SpotPreview />
    </section>
  );
}
