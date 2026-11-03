import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { SpotActions } from "@/components/SpotActions";
import { SpotGallery } from "@/components/SpotGallery";
import { SpotMap } from "@/components/SpotMap";
import { PLAY_STORE_URL } from "@/lib/config";
import { isLocale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

type SpotParams = { lang: string; id: string };

type PublicSpot = {
  id: string;
  title: string | null;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  image_urls: string[] | null;
  tags: string[] | null;
  rating: number | null;
  altitude: number | null;
  is_removed: boolean | null;
  user_id: string;
  username: string | null;
};

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const getPublicSpot = cache(async (id: string): Promise<PublicSpot | null> => {
  if (!UUID.test(id)) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots")
    .select(
      "id, title, description, latitude, longitude, image_urls, tags, rating, altitude, is_removed, user_id",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data || data.is_removed) return null;

  const spot = data as Omit<PublicSpot, "username">;
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", spot.user_id)
    .maybeSingle();

  return {
    ...spot,
    username: (profile?.username as string | null) ?? null,
  };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<SpotParams>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const spot = await getPublicSpot(id);
  if (!spot) return { title: "Spot" };

  const image = spot.image_urls?.find(Boolean);
  return {
    title: spot.title || "Spot",
    description: spot.description ?? undefined,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function SpotPage({
  params,
}: {
  params: Promise<SpotParams>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const spot = await getPublicSpot(id);
  if (!spot) notFound();

  const ua = (await headers()).get("user-agent") ?? "";
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const title = spot.title || "Spot";
  const images = spot.image_urls?.filter(Boolean) ?? [];
  const tags = spot.tags?.filter(Boolean) ?? [];
  const hasPosition = spot.latitude != null && spot.longitude != null;

  if (isAndroid) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 py-10 text-center text-white">
        {images[0] ? (
          <div className="relative mb-8 h-52 w-full max-w-sm overflow-hidden">
            <Image
              src={images[0]}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="384px"
            />
          </div>
        ) : null}
        <h1 className="max-w-md font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          {title}
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
      className="flex h-dvh flex-col bg-zinc-950 text-white"
    >
      <p className="shrink-0 bg-sand px-4 py-3 text-center text-sm font-medium text-black">
        L&apos;application iOS arrive bientôt ! En attendant, voici un aperçu
        du spot.
      </p>
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1.15fr)_minmax(190px,0.85fr)] overflow-hidden lg:grid-cols-[minmax(340px,460px)_minmax(0,1fr)] lg:grid-rows-1">
        <section className="flex min-h-0 flex-col gap-3 overflow-hidden px-5 py-4 sm:px-6 lg:border-r lg:border-white/10">
          <div className="shrink-0">
            <h1 className="font-display text-3xl leading-tight tracking-tight lg:text-4xl">
              {title}
            </h1>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/70">
              {spot.username ? <span>{spot.username}</span> : null}
              {spot.rating != null ? <span>{spot.rating}/5</span> : null}
              {spot.altitude != null ? (
                <span>{Math.round(spot.altitude)} m</span>
              ) : null}
            </p>
            <div className="mt-3">
              <SpotActions
                title={title}
                url={`${SITE_URL}/spot/${spot.id}`}
                latitude={spot.latitude}
                longitude={spot.longitude}
              />
            </div>
            {tags.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-white/15 px-2 py-1 text-xs uppercase tracking-wide text-white/75"
                  >
                    {tag.replaceAll("-", " ")}
                  </li>
                ))}
              </ul>
            ) : null}
            {spot.description ? (
              <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-white/80">
                {spot.description}
              </p>
            ) : null}
          </div>
          {images.length > 0 ? (
            <div className="min-h-0 flex-1">
              <SpotGallery images={images} title={title} />
            </div>
          ) : null}
        </section>
        <div className="min-h-0">
          {hasPosition ? (
            <SpotMap
              latitude={spot.latitude as number}
              longitude={spot.longitude as number}
              title={title}
            />
          ) : (
            <div className="grid h-full place-items-center px-6 text-sm text-white/60">
              Pas de position pour ce spot.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
