import Image from "next/image";
import { authAssets } from "@/lib/assets/auth-assets";

type AuthHeroProps = {
  compact?: boolean;
};

export function AuthHero({ compact = false }: AuthHeroProps) {
  return (
    <section
      className={`relative shrink-0 overflow-hidden ${
        compact
          ? "h-[34dvh] min-h-52.5 max-h-75"
          : "h-[49dvh] max-h-120 sm:min-h-90"
      }`}
      aria-label="Golden hour preview"
    >
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
        priority
        src={authAssets.heroImage}
        alt="Mountain landscape at sunset"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-altalaya-night via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent" />

      <nav
        className="absolute left-4 right-4 top-4 flex items-center justify-between"
        aria-label="Discovery navigation"
      >
        <div className="flex items-center gap-2 rounded-full bg-altalaya-glass px-3 py-1.5 font-mono text-[11px] tracking-wide text-altalaya-peach shadow-md backdrop-blur-md">
          <Image
            className="size-4"
            width={16}
            height={16}
            src={authAssets.sunIcon}
            alt="Decorative sun icon"
          />
          <span>ALTALAYA DISCOVERY</span>
        </div>

        <button
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-altalaya-glass px-3 py-1.5 text-[11px] font-bold tracking-wider text-altalaya-muted shadow-md backdrop-blur-md"
          type="button"
          aria-label="Change language"
        >
          <span>EN</span>
          <Image
            className="h-1 w-2 object-contain"
            width={8}
            height={4}
            src={authAssets.chevronIcon}
            alt="Language menu"
          />
        </button>
      </nav>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between sm:bottom-6">
        <div className="flex items-center gap-2 rounded-full bg-altalaya-overlay px-3 py-2 shadow-xl backdrop-blur-[20px] sm:gap-3 sm:px-4 sm:py-2.5">
          <span className="relative grid size-6 place-items-center rounded-full bg-altalaya-peach/20 sm:size-7">
            <Image
              className="size-3 object-contain"
              width={12}
              height={12}
              src={authAssets.goldenHourIcon}
              alt="Golden hour"
            />
            <i className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-altalaya-accent" />
          </span>
          <span>
            <strong className="block text-[11px] tracking-wider text-altalaya-peach">
              GOLDEN HOUR
            </strong>
            <em className="block font-mono text-[13px] leading-4 text-altalaya-text not-italic">
              34m Remaining
            </em>
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-altalaya-overlay px-2 py-2 font-mono text-[11px] text-altalaya-muted shadow-xl backdrop-blur-[20px] sm:px-3">
          <Image
            className="size-3.5"
            width={14}
            height={14}
            src={authAssets.compassIcon}
            alt="Compass"
          />
          <span className="whitespace-nowrap">268° W · 1,420m</span>
        </div>
      </div>
    </section>
  );
}
