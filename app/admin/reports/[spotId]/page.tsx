import Link from "next/link";
import { notFound } from "next/navigation";
import {
  setReportStatusAction,
  setSpotRemovedAction,
  setUserBannedAction,
} from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import type { Profile, Spot, SpotReport } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

export default async function AdminReportDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ spotId: string }>;
  searchParams: Promise<{ reporter?: string }>;
}) {
  await requireAdmin();
  const { spotId } = await params;
  const { reporter: reporterParam } = await searchParams;
  const supabase = await createClient();

  const { data: reports } = await supabase
    .from("spot_reports")
    .select(
      "reporter_id, spot_id, reason, status, created_at, resolution_notes, reviewed_at, reviewed_by",
    )
    .eq("spot_id", spotId)
    .order("created_at", { ascending: false });

  const list = (reports ?? []) as SpotReport[];
  if (list.length === 0) notFound();

  const active =
    list.find((r) => r.reporter_id === reporterParam) ??
    list.find((r) => r.status === "pending") ??
    list[0];

  const { data: spotRaw } = await supabase
    .from("spots")
    .select(
      "id, title, user_id, image_urls, is_removed, removed_at, removed_by, removal_reason",
    )
    .eq("id", spotId)
    .maybeSingle();

  if (!spotRaw) notFound();
  const spot = spotRaw as Spot;

  const profileIds = [
    ...new Set([
      active.reporter_id,
      spot.user_id,
      ...list.map((r) => r.reporter_id),
    ]),
  ];

  const { data: profiles } = await supabase
    .from("profiles")
    .select(
      "id, username, is_admin, is_banned, banned_at, banned_reason, banned_by",
    )
    .in("id", profileIds);

  const profileById = new Map(
    (profiles ?? []).map((p) => [p.id, p as Profile]),
  );
  const owner = profileById.get(spot.user_id);
  const reporter = profileById.get(active.reporter_id);
  const images = spot.image_urls?.filter(Boolean) ?? [];
  const next = `/admin/reports/${spotId}?reporter=${active.reporter_id}`;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/reports"
          className="text-sm text-mist transition hover:text-ember"
        >
          ← Reports
        </Link>
        <h1 className="mt-3 font-display text-3xl tracking-tight">
          {spot.title || "Untitled spot"}
        </h1>
        <p className="mt-2 font-mono text-xs text-mist">{spot.id}</p>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-mist">No images.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-2 border border-white/10 p-4">
          <h2 className="text-sm font-semibold text-sand">Owner</h2>
          <p className="text-sm text-mist">
            {owner?.username ?? spot.user_id}
            {owner?.is_banned ? (
              <span className="ml-2 text-ember">banned</span>
            ) : null}
          </p>
          <p className="font-mono text-xs text-mist/70">{spot.user_id}</p>
          {spot.is_removed ? (
            <p className="text-sm text-ember">
              Hidden
              {spot.removal_reason ? ` — ${spot.removal_reason}` : ""}
            </p>
          ) : null}
        </section>

        <section className="space-y-2 border border-white/10 p-4">
          <h2 className="text-sm font-semibold text-sand">Active report</h2>
          <p className="text-sm text-mist">
            Reporter: {reporter?.username ?? active.reporter_id.slice(0, 8)}
          </p>
          <p className="text-sm capitalize text-mist">Status: {active.status}</p>
          <p className="text-sm text-mist">Reason: {active.reason ?? "—"}</p>
          {active.resolution_notes ? (
            <p className="text-sm text-mist">Notes: {active.resolution_notes}</p>
          ) : null}
        </section>
      </div>

      <section className="space-y-4 border border-white/10 p-4">
        <h2 className="font-display text-xl">Actions</h2>
        <div className="flex flex-col gap-3">
          <form action={setReportStatusAction}>
            <input type="hidden" name="reporter_id" value={active.reporter_id} />
            <input type="hidden" name="spot_id" value={spotId} />
            <input type="hidden" name="status" value="dismissed" />
            <input type="hidden" name="notes" value="dismissed" />
            <button
              type="submit"
              className="border border-white/15 px-4 py-2 text-sm transition hover:border-white/40"
            >
              Dismiss
            </button>
          </form>

          <form action={setSpotRemovedAction} className="flex flex-wrap items-end gap-2">
            <input type="hidden" name="spot_id" value={spotId} />
            <input type="hidden" name="removed" value="true" />
            <input type="hidden" name="action_report" value="true" />
            <input type="hidden" name="reporter_id" value={active.reporter_id} />
            <input type="hidden" name="next" value={next} />
            <label className="text-xs text-mist">
              Reason
              <input
                name="reason"
                defaultValue="spam"
                className="ml-2 border border-white/15 bg-ridge/40 px-2 py-1.5 text-sm text-sand"
              />
            </label>
            <button
              type="submit"
              className="border border-ember/50 px-4 py-2 text-sm text-ember transition hover:bg-ember/10"
            >
              Hide spot
            </button>
          </form>

          <form action={setUserBannedAction} className="flex flex-wrap items-end gap-2">
            <input type="hidden" name="user_id" value={spot.user_id} />
            <input type="hidden" name="banned" value="true" />
            <input type="hidden" name="hide_spot" value="true" />
            <input type="hidden" name="spot_id" value={spotId} />
            <input type="hidden" name="action_report" value="true" />
            <input type="hidden" name="reporter_id" value={active.reporter_id} />
            <input type="hidden" name="next" value={next} />
            <label className="text-xs text-mist">
              Reason
              <input
                name="reason"
                defaultValue="repeat abuse"
                className="ml-2 border border-white/15 bg-ridge/40 px-2 py-1.5 text-sm text-sand"
              />
            </label>
            <button
              type="submit"
              className="bg-ember px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Ban owner
            </button>
          </form>
        </div>

        {spot.is_removed ? (
          <form action={setSpotRemovedAction} className="pt-2">
            <input type="hidden" name="spot_id" value={spotId} />
            <input type="hidden" name="removed" value="false" />
            <input type="hidden" name="next" value={next} />
            <button
              type="submit"
              className="text-sm text-mist underline-offset-2 hover:text-sand hover:underline"
            >
              Unhide spot
            </button>
          </form>
        ) : null}
      </section>

      {list.length > 1 ? (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-sand">All reports on this spot</h2>
          <ul className="space-y-1 text-sm text-mist">
            {list.map((r) => (
              <li key={`${r.reporter_id}-${r.created_at}`}>
                <Link
                  href={`/admin/reports/${spotId}?reporter=${r.reporter_id}`}
                  className={
                    r.reporter_id === active.reporter_id
                      ? "text-ember"
                      : "hover:text-sand"
                  }
                >
                  {profileById.get(r.reporter_id)?.username ??
                    r.reporter_id.slice(0, 8)}{" "}
                  · {r.status} · {new Date(r.created_at).toLocaleString()}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
