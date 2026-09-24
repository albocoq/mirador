import {
  setSpotRemovedAction,
} from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import type { Profile, Spot } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSpotsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; removed?: string }>;
}) {
  await requireAdmin();
  const { q, removed } = await searchParams;
  const query = (q ?? "").trim();
  const onlyRemoved = removed === "1";

  const supabase = await createClient();

  let spotsQuery = supabase
    .from("spots")
    .select(
      "id, title, user_id, image_urls, is_removed, removed_at, removal_reason",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (onlyRemoved) {
    spotsQuery = spotsQuery.eq("is_removed", true);
  }

  if (query) {
    // uuid exact or title ilike
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        query,
      );
    if (isUuid) {
      spotsQuery = spotsQuery.eq("id", query);
    } else {
      spotsQuery = spotsQuery.ilike("title", `%${query}%`);
    }
  }

  const { data: spots, error } = await spotsQuery;

  if (error) {
    return <p className="text-ember">Failed to load spots: {error.message}</p>;
  }

  const list = (spots ?? []) as Spot[];
  const ownerIds = [...new Set(list.map((s) => s.user_id))];
  const { data: owners } = ownerIds.length
    ? await supabase.from("profiles").select("id, username").in("id", ownerIds)
    : { data: [] as Profile[] };
  const ownerById = new Map((owners ?? []).map((p) => [p.id, p as Profile]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Spots</h1>
        <p className="mt-2 text-sm text-mist">Search by title or id · unhide.</p>
      </div>

      <form className="flex flex-wrap gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="Title or UUID"
          className="min-w-[200px] flex-1 border border-white/15 bg-ridge/40 px-3 py-2 text-sm text-sand outline-none focus:border-ember/60"
        />
        <label className="flex items-center gap-2 border border-white/15 px-3 py-2 text-sm text-mist">
          <input
            type="checkbox"
            name="removed"
            value="1"
            defaultChecked={onlyRemoved}
          />
          Hidden only
        </label>
        <button
          type="submit"
          className="bg-ember px-4 py-2 text-sm font-semibold text-ink"
        >
          Search
        </button>
      </form>

      {list.length === 0 ? (
        <p className="text-sm text-mist">No spots.</p>
      ) : (
        <ul className="divide-y divide-white/10 border border-white/10">
          {list.map((spot) => {
            const thumb = spot.image_urls?.[0];
            return (
              <li
                key={spot.id}
                className="flex flex-wrap items-center gap-4 px-3 py-3 sm:flex-nowrap"
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt=""
                    className="size-14 shrink-0 object-cover"
                  />
                ) : (
                  <div className="size-14 shrink-0 bg-ridge" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sand">
                    {spot.title || "Untitled"}
                    {spot.is_removed ? (
                      <span className="ml-2 text-xs text-ember">hidden</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-mist">
                    {ownerById.get(spot.user_id)?.username ?? spot.user_id}
                  </p>
                  <p className="truncate font-mono text-[10px] text-mist/60">
                    {spot.id}
                  </p>
                </div>
                {spot.is_removed ? (
                  <form action={setSpotRemovedAction}>
                    <input type="hidden" name="spot_id" value={spot.id} />
                    <input type="hidden" name="removed" value="false" />
                    <input type="hidden" name="next" value="/admin/spots?removed=1" />
                    <button
                      type="submit"
                      className="border border-white/15 px-3 py-1.5 text-sm transition hover:border-ember/50 hover:text-ember"
                    >
                      Unhide
                    </button>
                  </form>
                ) : (
                  <form action={setSpotRemovedAction} className="flex items-center gap-2">
                    <input type="hidden" name="spot_id" value={spot.id} />
                    <input type="hidden" name="removed" value="true" />
                    <input type="hidden" name="reason" value="moderation" />
                    <input type="hidden" name="next" value="/admin/spots" />
                    <button
                      type="submit"
                      className="border border-ember/40 px-3 py-1.5 text-sm text-ember"
                    >
                      Hide
                    </button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
