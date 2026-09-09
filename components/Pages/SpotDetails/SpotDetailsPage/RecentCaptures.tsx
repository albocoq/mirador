import Image from "next/image";

import { spotDetailsAssets } from "@/lib/assets/spot-details-assets";

export function RecentCaptures() {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Captures</h2>
        <button className="font-mono text-[11px] text-[#ffb955]" type="button">
          View all 42
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          [spotDetailsAssets.captureOne, "Yesterday 20:38"],
          [spotDetailsAssets.captureTwo, "2 days ago"],
        ].map(([src, label]) => (
          <div
            className="relative h-32 overflow-hidden rounded-4xl"
            key={label}
          >
            <Image
              alt="Recent sunset capture"
              className="object-cover"
              fill
              sizes="50vw"
              src={src}
            />
            <span className="absolute bottom-2 left-2 rounded-full bg-[#0e0e0e]/70 px-2 py-1 font-mono text-[11px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
