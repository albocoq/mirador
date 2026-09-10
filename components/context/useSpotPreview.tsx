"use client";

import type { MapSpot, Spot } from "@/types/database";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SpotPreviewContextValue = {
  isOpen: boolean;
  selectedSpot: MapSpot | null;
  handleClosePreview: () => void;
  handleSelectedSpot: (spot: MapSpot | null) => void;
};

const SpotPreviewContext = createContext<SpotPreviewContextValue | null>(null);

export function SpotPreviewProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null);

  const handleSelectedSpot = useCallback((spot: MapSpot | null) => {
    setSelectedSpot(spot);
    setIsOpen(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setSelectedSpot(null);
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedSpot,
      handleSelectedSpot,
      handleClosePreview,
    }),
    [isOpen, selectedSpot, handleSelectedSpot, handleClosePreview],
  );

  return (
    <SpotPreviewContext.Provider value={value}>
      {children}
    </SpotPreviewContext.Provider>
  );
}

export function useSpotPreview() {
  const context = useContext(SpotPreviewContext);

  if (!context) {
    throw new Error("useSpotPreview must be used inside a SpotPreviewProvider");
  }

  return context;
}
