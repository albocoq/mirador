import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  await requireAdmin();
  const supabase = await createClient();

  const [{ count: pendingReports }, { count: removedSpots }, { count: bannedUsers }] =
    await Promise.all([
      supabase
        .from("spot_reports")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase
        .from("spots")
        .select("*", { count: "exact", head: true })
        .eq("is_removed", true),
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("is_banned", true),
    ]);

  const cards = [
    {
      href: "/admin/reports?status=pending",
      label: "Pending reports",
      value: pendingReports ?? 0,
    },
    {
      href: "/admin/spots?removed=1",
      label: "Hidden spots",
      value: removedSpots ?? 0,
    },
    {
      href: "/admin/users?banned=1",
      label: "Banned users",
      value: bannedUsers ?? 0,
    },
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Overview</h1>
        <p className="mt-2 text-sm text-mist">
          Moderation queue — reports, soft-hide, bans.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-white/10 bg-ridge/40 px-5 py-4 transition hover:border-ember/40"
          >
            <p className="text-sm text-mist">{card.label}</p>
            <p className="mt-2 font-display text-3xl tabular-nums text-sand">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
