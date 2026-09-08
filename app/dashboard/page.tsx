import { redirect } from "next/navigation";

import { signOut } from "@/hooks/actions";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-altalaya-night px-6 text-center text-altalaya-text">
      <p className="font-mono text-xs uppercase tracking-widest text-altalaya-accent">
        Private space
      </p>
      <h1 className="mt-3 text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-altalaya-muted">{user.email}</p>
      <form action={signOut} className="mt-8">
        <button
          className="rounded-full bg-altalaya-glass-strong px-6 py-3 font-semibold transition hover:brightness-110"
          type="submit"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
