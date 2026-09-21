"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type GaEventParams } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: string;
  eventParams?: GaEventParams;
};

export function TrackedLink({
  event,
  eventParams,
  onClick,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
