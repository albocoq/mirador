import { Bookmark, Camera } from "lucide-react";

import { profileFilters } from "./profile-data";
import type { ProfileView } from "../../../types/profile";

export function ViewSwitcher({
  activeView,
  onChange,
}: {
  activeView: ProfileView;
  onChange: (view: ProfileView) => void;
}) {
  return (
    <div className="flex rounded-full bg-[#2a2a2a]/90 p-1 backdrop-blur-md">
      <button
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[11px] font-bold tracking-[0.4px] ${activeView === "spots" ? "text-altalaya-muted" : "text-altalaya-muted/60"}`}
        onClick={() => onChange("spots")}
        type="button"
      >
        <Camera className="size-3" />
        My Spots (14)
      </button>
      <button
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[11px] font-bold tracking-[0.4px] ${activeView === "saved" ? "bg-linear-to-r from-altalaya-accent to-[#ffb955] text-[#522300] shadow-[0_2px_6px_rgba(255,122,0,0.35)]" : "text-altalaya-muted/60"}`}
        onClick={() => onChange("saved")}
        type="button"
      >
        <Bookmark className="size-3" />
        Saved (38)
      </button>
    </div>
  );
}

export function FilterBar({
  activeFilter,
  onChange,
}: {
  activeFilter: string;
  onChange: (filter: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {profileFilters.map((filter) => (
        <button
          className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.55px] ${activeFilter === filter ? "bg-altalaya-peach/15 text-altalaya-peach" : "bg-[#2a2a2a] text-altalaya-muted"}`}
          key={filter}
          onClick={() => onChange(filter)}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
