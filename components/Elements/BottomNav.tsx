"use client";

import { Map, Plus, User } from "lucide-react";
import Link from "next/link";
import { CreateSpotModal } from "../Pages/Map/CreateSpotModal";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCreateSpotOpen, setIsCreateSpotOpen] = useState(false);
  const refreshSpots = useCallback(() => router.refresh(), [router]);

  const isMapPage = pathname === "/dashboard";

  return (
    <>
      {isCreateSpotOpen ? (
        <CreateSpotModal
          onClose={() => setIsCreateSpotOpen(false)}
          onCreated={refreshSpots}
        />
      ) : (
        <nav
          className="z-9999 shrink-0 px-4 pb-3 pt-2 absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#0e0e0e] via-[#0e0e0e] to-transparent "
          aria-label="Main navigation"
        >
          <div className="flex h-16 items-center justify-between rounded-full px-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <Link
              className={`flex min-w-11 flex-1 flex-col items-center gap-1 ${isMapPage ? "text-altalaya-accent" : "text-altalaya-muted"}`}
              href="/dashboard"
            >
              <Map size={20} />
              <span className="text-[11px] font-bold tracking-[0.88px]">
                Explore
              </span>
            </Link>
            <button
              aria-label="Add a spot"
              className="mx-2 flex size-12 items-center justify-center rounded-full bg-linear-to-br from-altalaya-accent to-[#ffb955] shadow-[0_4px_12px_rgba(255,122,0,0.28)]"
              onClick={() => setIsCreateSpotOpen(true)}
              type="button"
            >
              <Plus size={22} />
            </button>
            <Link
              className={`flex min-w-11 flex-1 flex-col items-center gap-1 ${!isMapPage ? "text-altalaya-accent" : "text-altalaya-muted"}`}
              href="/profile"
            >
              <User size={20} />
              <span className="text-[11px] font-bold tracking-[0.88px]">
                Profile
              </span>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
