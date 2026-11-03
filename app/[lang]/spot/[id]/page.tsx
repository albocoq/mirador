import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PLAY_STORE_URL } from "@/lib/config";
import { isLocale } from "@/lib/i18n/config";

type SpotParams = { lang: string; id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<SpotParams>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  return { title: `Spot #${id}` };
}

export default async function SpotPage({
  params,
}: {
  params: Promise<SpotParams>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const ua = (await headers()).get("user-agent") ?? "";
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  if (isAndroid) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
        <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Un spot incroyable t&apos;attend !
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-white/80 sm:text-lg">
          Pour voir ce point de vue, télécharge Altalaya.
        </p>
        <a
          href={PLAY_STORE_URL}
          className="mt-8 inline-flex bg-ember px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          Télécharger sur Google Play
        </a>
      </div>
    );
  }

  return (
    <div
      data-os={isIOS ? "ios" : "desktop"}
      className="flex h-screen flex-col bg-zinc-950 text-white"
    >
      <p className="bg-sand px-4 py-3 text-center text-sm font-medium text-black">
        L&apos;application iOS arrive bientôt ! En attendant, voici un aperçu
        du spot.
      </p>
      <div className="flex min-h-0 flex-1 flex-col px-6 py-8">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          Spot #{id}
        </h1>
        <div
          className="mt-6 min-h-64 flex-1 border border-white/10"
          aria-label="Carte du spot"
        />
      </div>
    </div>
  );
}
