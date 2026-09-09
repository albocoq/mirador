import { Star } from "lucide-react";

import { SpotTag } from "@/components/ui/SpotTag";
import type { Spot } from "@/types/database";

type SpotIntroProps = {
  spot: Spot;
  tags: string[];
};

export function SpotIntro({ spot, tags }: SpotIntroProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[1.1px] text-[#ffb955]">
          Featured vantage point
        </span>
        <span className="flex items-center gap-1 font-mono text-[13px] text-[#ffb955]">
          <Star className="size-3.5 fill-current" />
          {spot.rating.toFixed(2)}{" "}
          <span className="text-altalaya-muted">(128)</span>
        </span>
      </div>
      <h1 className="text-[28px] font-bold leading-8 tracking-tight">
        {spot.title}
      </h1>
      {/* TODO */}

      {/* <p className="flex items-center gap-2 text-[15px] text-altalaya-muted">
        <MapPin className="size-3.5" />
        Malaga, Spain <span className="text-[#393939]">•</span>
        <span className="font-mono text-[11px] text-[#ffb955]">
          420m elevation
        </span>
      </p> */}
      <div className="flex flex-wrap gap-2 pt-1">
        {tags.map((tag, index) => (
          <SpotTag key={`${tag}-${index}`} tag={tag} />
        ))}
      </div>
    </section>
  );
}
