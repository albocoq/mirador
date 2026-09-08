"use client";

import { useEffect, useRef, useState } from "react";

const SNAP_POINTS = [20, -115] as const;
const OPENING_OFFSET = 50;

export function useSpotPreviewDrag(close: () => void, isOpen: boolean) {
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const offsetYRef = useRef(0);
  const dragStart = useRef({ pointerY: 0, offsetY: 0 });
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    let resetFrame: number | null = null;

    if (isOpen) {
      if (dismissTimer.current !== null) {
        window.clearTimeout(dismissTimer.current);
        dismissTimer.current = null;
      }
      resetFrame = window.requestAnimationFrame(() => {
        offsetYRef.current = OPENING_OFFSET;
        setOffsetY(OPENING_OFFSET);
        resetFrame = window.requestAnimationFrame(() => {
          setOffsetY(0);
          offsetYRef.current = 0;
          setIsDragging(false);
        });
      });
    } else {
      offsetYRef.current = OPENING_OFFSET;
      resetFrame = window.requestAnimationFrame(() => {
        setOffsetY(OPENING_OFFSET);
      });
    }

    return () => {
      if (resetFrame !== null) {
        window.cancelAnimationFrame(resetFrame);
      }
      if (dismissTimer.current !== null) {
        window.clearTimeout(dismissTimer.current);
        dismissTimer.current = null;
      }
    };
  }, [isOpen]);

  const updateOffset = (nextOffset: number) => {
    offsetYRef.current = nextOffset;
    setOffsetY(nextOffset);
  };

  const snapToClosestPoint = () => {
    const closestPoint = SNAP_POINTS.reduce((closest, point) =>
      Math.abs(point - offsetYRef.current) <
      Math.abs(closest - offsetYRef.current)
        ? point
        : closest,
    );

    updateOffset(closestPoint);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerY: event.clientY,
      offsetY: offsetYRef.current,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDragging) return;

    const nextOffset =
      dragStart.current.offsetY + event.clientY - dragStart.current.pointerY;
    const maxOffset = SNAP_POINTS[SNAP_POINTS.length - 1];
    const maxDismissOffset = window.innerHeight;

    updateOffset(Math.max(maxOffset, Math.min(maxDismissOffset, nextOffset)));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (offsetYRef.current > SNAP_POINTS[0]) {
      setIsDragging(false);
      updateOffset(window.innerHeight);
      dismissTimer.current = window.setTimeout(close, 300);
      return;
    }

    snapToClosestPoint();
    setIsDragging(false);
  };

  return {
    offsetY,
    isDragging,
    handlePointerCancel: handlePointerUp,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
