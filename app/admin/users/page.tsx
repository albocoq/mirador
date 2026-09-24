import { setUserBannedAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import type { Profile } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; banned?: string }>;
}) {
  await requireAdmin();
  const { q, banned } = await searchParams;
  const query = (q ?? "").trim();
  const onlyBanned = banned === "1";

  const supabase = await createClient();

  let usersQuery = supabase
    .from("profiles")
    .select(
      "id, username, is_admin, is_banned, banned_at, banned_reason, banned_by",
    )
    .order("username", { ascending: true })
    .limit(50);

  if (onlyBanned) {
    usersQuery = usersQuery.eq("is_banned", true);
  }

  if (query) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        query,
      );
    if (isUuid) {
      usersQuery = usersQuery.eq("id", query);
    } else {
      usersQuery = usersQuery.ilike("username", `%${query}%`);
    }
  }

  const { data: users, error } = await usersQuery;

  if (error) {
    return <p className="text-ember">Failed to load users: {error.message}</p>;
  }

  const list = (users ?? []) as Profile[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl tracking-tight">Users</h1>
        <p className="mt-2 text-sm text-mist">Search username · ban / unban.</p>
      </div>

      <form className="flex flex-wrap gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="Username or UUID"
          className="min-w-[200px] flex-1 border border-white/15 bg-ridge/40 px-3 py-2 text-sm text-sand outline-none focus:border-ember/60"
        />
        <label className="flex items-center gap-2 border border-white/15 px-3 py-2 text-sm text-mist">
          <input
            type="checkbox"
            name="banned"
            value="1"
            defaultChecked={onlyBanned}
          />
          Banned only
        </label>
        <button
          type="submit"
          className="bg-ember px-4 py-2 text-sm font-semibold text-ink"
        >
          Search
        </button>
      </form>

      {list.length === 0 ? (
        <p className="text-sm text-mist">No users.</p>
      ) : (
        <ul className="divide-y divide-white/10 border border-white/10">
          {list.map((user) => (
            <li
              key={user.id}
              className="flex flex-wrap items-center justify-between gap-3 px-3 py-3"
            >
              <div className="min-w-0">
                <p className="text-sand">
                  {user.username ?? "(no username)"}
                  {user.is_admin ? (
                    <span className="ml-2 text-xs text-mist">admin</span>
                  ) : null}
                  {user.is_banned ? (
                    <span className="ml-2 text-xs text-ember">banned</span>
                  ) : null}
                </p>
                <p className="truncate font-mono text-[10px] text-mist/60">
                  {user.id}
                </p>
                {user.is_banned && user.banned_reason ? (
                  <p className="text-xs text-mist">{user.banned_reason}</p>
                ) : null}
              </div>
              {user.is_admin ? (
                <span className="text-xs text-mist">—</span>
              ) : user.is_banned ? (
                <form action={setUserBannedAction}>
                  <input type="hidden" name="user_id" value={user.id} />
                  <input type="hidden" name="banned" value="false" />
                  <input
                    type="hidden"
                    name="next"
                    value={
                      onlyBanned
                        ? "/admin/users?banned=1"
                        : query
                          ? `/admin/users?q=${encodeURIComponent(query)}`
                          : "/admin/users"
                    }
                  />
                  <button
                    type="submit"
                    className="border border-white/15 px-3 py-1.5 text-sm hover:border-ember/50 hover:text-ember"
                  >
                    Unban
                  </button>
                </form>
              ) : (
                <form
                  action={setUserBannedAction}
                  className="flex items-center gap-2"
                >
                  <input type="hidden" name="user_id" value={user.id} />
                  <input type="hidden" name="banned" value="true" />
                  <input
                    name="reason"
                    defaultValue="abuse"
                    className="w-28 border border-white/15 bg-ridge/40 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="hidden"
                    name="next"
                    value={
                      query
                        ? `/admin/users?q=${encodeURIComponent(query)}`
                        : "/admin/users"
                    }
                  />
                  <button
                    type="submit"
                    className="bg-ember px-3 py-1.5 text-sm font-semibold text-ink"
                  >
                    Ban
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
