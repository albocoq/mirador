import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, Compass, Share2 } from "lucide-react";

type HeroProps = {
  image: string;
  onShare: () => void;
  title: string;
};

export function Hero({ image, onShare, title }: HeroProps) {
  return (
    <section className="relative h-100 overflow-hidden">
      {image ? (
        <Image
          alt="Secret mirador at sunset"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 672px) 100vw, 672px"
          src={image}
        />
      ) : (
        <div className="flex items-center justify-center text-8xl h-full bg-altalaya-surface font-black">
          {title.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-altalaya-night via-altalaya-night/20 to-altalaya-night/40" />
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <Link
          aria-label="Back"
          className="flex size-11 items-center justify-center rounded-full bg-[#2a2a2a]/70 backdrop-blur-md"
          href="/dashboard"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex gap-2">
          <button
            aria-label="Share spot"
            className="flex size-11 items-center justify-center rounded-full bg-[#2a2a2a]/70 backdrop-blur-md"
            onClick={onShare}
            type="button"
          >
            <Share2 className="size-4" />
          </button>
          <button
            aria-label="Save spot"
            className="flex size-11 items-center justify-center rounded-full bg-[#2a2a2a]/70 backdrop-blur-md"
            type="button"
          >
            <Bookmark className="size-4" />
          </button>
        </div>
      </div>
      {/* TODO */}

      {/* <div className="absolute inset-x-4 bottom-6 flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-[#0e0e0e]/80 px-3 py-1.5 font-mono text-[13px] text-[#ffb955]">
          <span className="size-2 rounded-full bg-altalaya-accent" />
          GOLDEN HOUR IN 38M
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#0e0e0e]/80 px-3 py-1.5 font-mono text-[13px]">
          <Compass className="size-3.5" />
          Azimuth 284°
        </span>
      </div> */}
    </section>
  );
}
