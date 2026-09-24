import { redirect } from "next/navigation";
import { signInAction } from "@/app/admin/actions";
import { getOptionalAdminSession } from "@/lib/admin/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getOptionalAdminSession();
  if (session) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-display text-3xl tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-mist">Admin account only.</p>
      <form action={signInAction} className="mt-8 space-y-4">
        <label className="block space-y-1.5 text-sm">
          <span className="text-mist">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full border border-white/15 bg-ridge/50 px-3 py-2 text-sand outline-none focus:border-ember/60"
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-mist">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full border border-white/15 bg-ridge/50 px-3 py-2 text-sand outline-none focus:border-ember/60"
          />
        </label>
        {error ? (
          <p className="text-sm text-ember" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="w-full bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
