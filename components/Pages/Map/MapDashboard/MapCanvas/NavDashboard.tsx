import {
  Binoculars,
  Filter,
  MountainSnow,
  Search,
  SunMedium,
  Trees,
} from "lucide-react";

const filters = ["Golden Hour", "Quiet", "Panorama", "High Peak"];
const filterIcons = [SunMedium, Trees, Binoculars, MountainSnow];

export default function NavDashboard({
  setActiveFilter,
  activeFilter,
}: {
  setActiveFilter: (filter: string) => void;
  activeFilter: string;
}) {
  return (
    <div className="absolute top-0 left-0 flex shrink-0 max-w-screen flex-col gap-2 pb-2 pt-3 z-10">
      <label className="flex h-12 items-center gap-3  rounded-full bg-[#2a2a2a]/80 px-3 mx-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <Search size={25} />
        <input
          aria-label="Search scenic viewpoints"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-altalaya-text outline-none placeholder:text-altalaya-muted"
          placeholder="Search scenic viewpoints, secret miradors..."
        />
        <button
          aria-label="Filter settings"
          className="flex size-8 items-center justify-center rounded-full bg-[#353534]/60"
          type="button"
        >
          <Filter size={14} />
        </button>
      </label>
      <div
        className="flex gap-2 overflow-x-auto overflow-y-visible pb-1 px-4"
        role="list"
        aria-label="Quick filters"
      >
        {filters.map((filter, index) => {
          const FilterIcon = filterIcons[index];

          return (
            <button
              className={`flex shrink-0 items-center rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.55px] transition gap-2 ${
                activeFilter === filter
                  ? "bg-altalaya-accent text-[#522300] shadow-[0_4px_8px_rgba(255,122,0,0.35)]"
                  : "bg-[#2a2a2a]/75 text-altalaya-muted backdrop-blur-md"
              }`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              <FilterIcon size={16} />
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
