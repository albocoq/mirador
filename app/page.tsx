import Image from "next/image";
import Link from "next/link";
import { ApkDownload } from "@/components/ApkDownload";

export default function HomePage() {
  return (
    <section className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center overflow-hidden px-6 py-4">
      <Image
        src="/logo.png"
        alt="Altalaya"
        width={120}
        height={120}
        className="size-20 sm:size-28"
        priority
      />
      <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-sand sm:text-6xl md:text-7xl">
        Altalaya
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-mist sm:text-lg sm:leading-8">
        Privacy policy and terms of use for the Altalaya mobile app — the
        community map of viewpoints.
      </p>
      <div className="mt-6 flex flex-wrap items-start gap-3">
        <ApkDownload />
        <Link
          href="/privacy"
          className="border border-white/15 px-6 py-3 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="border border-white/15 px-6 py-3 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
        >
          Terms of Use
        </Link>
      </div>
    </section>
  );
}
