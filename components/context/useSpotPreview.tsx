"use client";

import { Spot } from "@/types/database";
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
  toggle: () => void;
  selectedSpot: Spot | null;
  setSelectedSpot: (spot: Spot | null) => void;
  handleClosePreview: () => void;
  handleSelectedSpot: (spot: Spot | null) => void;
};

const SpotPreviewContext = createContext<SpotPreviewContextValue | null>(null);

export function SpotPreviewProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const toggle = useCallback(() => setIsOpen((current) => !current), []);

  const handleSelectedSpot = useCallback((spot: Spot | null) => {
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
      toggle,
      selectedSpot,
      handleSelectedSpot,
      handleClosePreview,
      setSelectedSpot,
    }),
    [
      isOpen,
      toggle,
      selectedSpot,
      handleSelectedSpot,
      handleClosePreview,
      setSelectedSpot,
    ],
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
