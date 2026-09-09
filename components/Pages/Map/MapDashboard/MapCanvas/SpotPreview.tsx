"use client";

import Image from "next/image";

import { useSpotPreview } from "@/components/context/useSpotPreview";
import { useSpotPreviewDrag } from "@/hooks/useSpotPreviewDrag";
import { mapAssets } from "@/lib/assets/map-assets";

export function SpotPreview() {
  const { isOpen, handleClosePreview, selectedSpot } = useSpotPreview();
  const {
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isDragging,
    offsetY,
  } = useSpotPreviewDrag(handleClosePreview, isOpen);

  if (!isOpen || !selectedSpot) return null;

  return (
    <article
      className={`absolute inset-x-0 -bottom-10 mx-4 mb-2 flex shrink-0 flex-col gap-2 rounded-4xl bg-[#201f1f]/90 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl will-change-transform ${isDragging ? "select-none" : "transition-transform duration-400 ease-out"}`}
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <button
        aria-label="Move spot preview"
        className="mx-auto flex h-5 w-12 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        type="button"
      >
        <span className="h-1 w-8 rounded-full bg-[#353534]" />
      </button>
      <div className="flex items-center gap-3">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-altalaya-surface">
          <Image
            alt="Málaga at sunset"
            className="object-cover"
            fill
            sizes="80px"
            src={mapAssets.spotPhoto}
          />
          <span className="absolute bottom-1 left-1 rounded-full bg-[#0e0e0e]/80 px-1.5 py-1 font-mono text-[11px] text-altalaya-peach backdrop-blur-sm">
            130m
          </span>
        </div>
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
            <Image
              alt=""
              className="h-auto"
              height={13}
              src={mapAssets.rating}
              width={13}
            />
            <span className="text-altalaya-text">4.9</span>
            <span className="text-altalaya-muted">(184)</span>
            <span className="px-1 text-[#584235]">•</span>
            <span className="text-[#ffb955]">Prime 20:05</span>
          </div>
          <h2 className="truncate text-lg font-semibold tracking-tight text-altalaya-text">
            {selectedSpot.title}
          </h2>
          <p className="flex items-center gap-2 text-[13px] leading-5 text-altalaya-muted">
            <Image alt="" height={12} src={mapAssets.distance} width={12} />
            <span>1.2 km away</span>
            <span>•</span>
            <span className="truncate">Castle Pine Trail</span>
          </p>
        </div>
        <button
          aria-label="View spot details"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-altalaya-accent to-[#ffb955] shadow-[0_4px_9px_rgba(255,122,0,0.32)]"
          type="button"
        >
          <Image alt="" height={15} src={mapAssets.arrow} width={15} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1 font-mono text-[11px] text-altalaya-muted">
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1">
            <Image alt="" height={9} src={mapAssets.horizon} width={13} />
            Clear Horizon
          </span>
          <span className="flex items-center gap-1">
            <Image alt="" height={13} src={mapAssets.sunAngle} width={13} />
            Azimuth 284°
          </span>
        </div>
        <span className="shrink-0 font-sans font-bold tracking-[0.55px] text-altalaya-peach">
          ALTALAYA PICK
        </span>
      </div>
    </article>
  );
}
