import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import type { Profile, ReportStatus, Spot, SpotReport } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

const STATUSES: Array<ReportStatus | "all"> = [
  "pending",
  "reviewed",
  "dismissed",
  "actioned",
  "all",
];

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status: statusParam } = await searchParams;
  const status = (STATUSES.includes(statusParam as ReportStatus | "all")
    ? statusParam
    : "pending") as ReportStatus | "all";

  const supabase = await createClient();

  let query = supabase
    .from("spot_reports")
    .select(
      "reporter_id, spot_id, reason, status, created_at, resolution_notes, reviewed_at, reviewed_by",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data: reports, error } = await query;

  if (error) {
    return (
      <p className="text-ember">Failed to load reports: {error.message}</p>
    );
  }

  const list = (reports ?? []) as SpotReport[];
  const spotIds = [...new Set(list.map((r) => r.spot_id))];
  const reporterIds = [...new Set(list.map((r) => r.reporter_id))];

  const [{ data: spots }, { data: reporters }] = await Promise.all([
    spotIds.length
      ? supabase
          .from("spots")
          .select("id, title, user_id, image_urls, is_removed")
          .in("id", spotIds)
      : Promise.resolve({ data: [] as Spot[] }),
    reporterIds.length
      ? supabase
          .from("profiles")
          .select("id, username")
          .in("id", reporterIds)
      : Promise.resolve({ data: [] as Profile[] }),
  ]);

  const spotById = new Map((spots ?? []).map((s) => [s.id, s as Spot]));
  const reporterById = new Map(
    (reporters ?? []).map((p) => [p.id, p as Profile]),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Reports</h1>
        <p className="mt-2 text-sm text-mist">Filter by status, open for actions.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={s === "pending" ? "/admin/reports" : `/admin/reports?status=${s}`}
            className={`border px-3 py-1.5 text-sm capitalize transition ${
              status === s
                ? "border-ember/60 text-ember"
                : "border-white/15 text-mist hover:border-white/30 hover:text-sand"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-mist">No reports.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-white/10 bg-ridge/40 text-mist">
              <tr>
                <th className="px-3 py-2 font-medium">Created</th>
                <th className="px-3 py-2 font-medium">Spot</th>
                <th className="px-3 py-2 font-medium">Reporter</th>
                <th className="px-3 py-2 font-medium">Reason</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((report) => {
                const spot = spotById.get(report.spot_id);
                const reporter = reporterById.get(report.reporter_id);
                return (
                  <tr
                    key={`${report.reporter_id}-${report.spot_id}-${report.created_at}`}
                    className="border-b border-white/5 hover:bg-white/[0.03]"
                  >
                    <td className="px-3 py-2 tabular-nums text-mist">
                      {new Date(report.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/admin/reports/${report.spot_id}?reporter=${report.reporter_id}`}
                        className="text-sand hover:text-ember"
                      >
                        {spot?.title || report.spot_id.slice(0, 8)}
                        {spot?.is_removed ? (
                          <span className="ml-2 text-xs text-ember">hidden</span>
                        ) : null}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-mist">
                      {reporter?.username ?? report.reporter_id.slice(0, 8)}
                    </td>
                    <td className="max-w-[200px] truncate px-3 py-2 text-mist">
                      {report.reason ?? "—"}
                    </td>
                    <td className="px-3 py-2 capitalize text-mist">
                      {report.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
