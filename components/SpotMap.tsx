"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  latitude: number;
  longitude: number;
  title: string;
};

type LngLat = [number, number];

type MapHandle = {
  remove: () => void;
  resize: () => void;
  zoomIn: (options?: { duration?: number }) => void;
  zoomOut: (options?: { duration?: number }) => void;
  flyTo: (options: {
    center: LngLat;
    zoom: number;
    duration?: number;
    essential?: boolean;
  }) => void;
  setStyle: (style: string | object) => void;
  addControl: (control: unknown, position?: string) => void;
  on: (event: string, handler: (event?: { error?: { message?: string } }) => void) => void;
};

type MapLibreNs = {
  Map: new (options: Record<string, unknown>) => MapHandle;
  Marker: new (options: { element: HTMLElement; anchor?: string }) => {
    setLngLat: (lngLat: LngLat) => { addTo: (map: MapHandle) => void };
  };
  ScaleControl: new (options: { maxWidth: number; unit: "metric" }) => unknown;
};

declare global {
  interface Window {
    maplibregl?: MapLibreNs;
  }
}

const VECTOR_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const SATELLITE_STYLE = {
  version: 8,
  sources: {
    imagery: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution:
        "Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    },
    labels: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
    },
  },
  layers: [
    { id: "imagery", type: "raster", source: "imagery" },
    { id: "labels", type: "raster", source: "labels" },
  ],
};

const MAPLIBRE_JS = "https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js";
const MAPLIBRE_CSS = "https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.css";

let mapLibrePromise: Promise<MapLibreNs> | null = null;

function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  if (!mapLibrePromise) {
    mapLibrePromise = new Promise((resolve, reject) => {
      if (!document.querySelector("link[data-maplibre]")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = MAPLIBRE_CSS;
        link.dataset.maplibre = "true";
        document.head.appendChild(link);
      }
      const existing = document.querySelector<HTMLScriptElement>(
        "script[data-maplibre]",
      );
      if (existing) {
        existing.addEventListener("load", () => {
          if (window.maplibregl) resolve(window.maplibregl);
          else reject(new Error("maplibre"));
        });
        return;
      }
      const script = document.createElement("script");
      script.src = MAPLIBRE_JS;
      script.async = true;
      script.dataset.maplibre = "true";
      script.onload = () => {
        if (window.maplibregl) resolve(window.maplibregl);
        else reject(new Error("maplibre"));
      };
      script.onerror = () => reject(new Error("maplibre"));
      document.head.appendChild(script);
    });
  }
  return mapLibrePromise;
}

function styleFor(mode: "map" | "satellite") {
  return mode === "satellite" ? SATELLITE_STYLE : VECTOR_STYLE;
}

const controlClass =
  "border border-white/15 bg-ink/85 text-sand backdrop-blur-sm transition hover:border-ember hover:text-ember";

export function SpotMap({ latitude, longitude, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapHandle | null>(null);
  const modeRef = useRef<"map" | "satellite">("map");
  const [mode, setMode] = useState<"map" | "satellite">("map");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let removed = false;
    let map: MapHandle | undefined;
    let observer: ResizeObserver | undefined;

    void loadMapLibre()
      .then((maplibregl) => {
        if (removed) return;
        map = new maplibregl.Map({
          container,
          style: styleFor(modeRef.current),
          center: [longitude, latitude],
          zoom: 14,
          minZoom: 3,
          maxZoom: 18,
          attributionControl: true,
          dragRotate: false,
          pitchWithRotate: false,
          fadeDuration: 200,
        });
        mapRef.current = map;
        map.addControl(
          new maplibregl.ScaleControl({ maxWidth: 110, unit: "metric" }),
          "bottom-left",
        );

        const marker = document.createElement("div");
        marker.className = "relative size-5";
        const pin = document.createElement("span");
        pin.className =
          "block size-5 rounded-full border-[3px] border-white bg-ember shadow-[0_0_0_6px_rgba(255,122,0,0.45),0_8px_18px_rgba(0,0,0,0.45)]";
        const label = document.createElement("span");
        label.className =
          "pointer-events-none absolute left-1/2 top-full mt-2 block w-max max-w-44 -translate-x-1/2 truncate bg-ink/90 px-2 py-1 text-center text-[11px] font-semibold text-sand";
        label.textContent = title;
        marker.append(pin, label);
        new maplibregl.Marker({ element: marker, anchor: "center" })
          .setLngLat([longitude, latitude])
          .addTo(map);

        const resize = () => map?.resize();
        observer = new ResizeObserver(resize);
        observer.observe(container);
        map.on("load", resize);
      })
      .catch(() => {
        if (!removed) setFailed(true);
      });

    return () => {
      removed = true;
      observer?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, title]);

  useEffect(() => {
    modeRef.current = mode;
    mapRef.current?.setStyle(styleFor(mode));
  }, [mode]);

  return (
    <div className="spot-map relative h-full w-full bg-ink">
      <div ref={containerRef} className="h-full w-full" />
      <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-2">
        <div className={`flex flex-col overflow-hidden ${controlClass}`}>
          <button
            type="button"
            className="px-3 py-1.5 text-lg leading-none"
            aria-label="Zoom avant"
            onClick={() => mapRef.current?.zoomIn({ duration: 220 })}
          >
            +
          </button>
          <button
            type="button"
            className="border-t border-white/15 px-3 py-1.5 text-lg leading-none"
            aria-label="Zoom arrière"
            onClick={() => mapRef.current?.zoomOut({ duration: 220 })}
          >
            −
          </button>
        </div>
        <button
          type="button"
          className={`${controlClass} px-2.5 py-1.5`}
          aria-label="Recentrer sur le spot"
          onClick={() =>
            mapRef.current?.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              duration: 700,
              essential: true,
            })
          }
        >
          <span
            aria-hidden
            className="block size-3.5 rounded-full border border-current"
          />
        </button>
        <div className={`flex overflow-hidden text-[11px] font-semibold uppercase tracking-wide ${controlClass}`}>
          <button
            type="button"
            className={`px-2.5 py-1.5 ${mode === "map" ? "bg-ember text-ink" : ""}`}
            onClick={() => setMode("map")}
          >
            Carte
          </button>
          <button
            type="button"
            className={`border-l border-white/15 px-2.5 py-1.5 ${mode === "satellite" ? "bg-ember text-ink" : ""}`}
            onClick={() => setMode("satellite")}
          >
            Satellite
          </button>
        </div>
      </div>
      {failed ? (
        <p className="absolute inset-x-0 bottom-4 z-10 text-center text-sm text-mist">
          Carte indisponible.
        </p>
      ) : null}
    </div>
  );
}
