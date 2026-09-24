import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/admin/actions";
import { getOptionalAdminSession } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/spots", label: "Spots" },
  { href: "/admin/users", label: "Users" },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getOptionalAdminSession();

  return (
    <div className="min-h-dvh bg-ink text-sand">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-display text-lg tracking-tight text-sand hover:text-ember"
            >
              Altalaya Admin
            </Link>
            {session ? (
              <nav className="hidden items-center gap-4 text-sm text-mist sm:flex">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-ember"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
          {session ? (
            <div className="flex items-center gap-3 text-sm text-mist">
              <span className="hidden sm:inline">
                {session.profile.username ?? session.userId.slice(0, 8)}
              </span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="border border-white/15 px-3 py-1.5 text-sand transition hover:border-ember/50 hover:text-ember"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : null}
        </div>
        {session ? (
          <nav className="flex gap-4 overflow-x-auto border-t border-white/5 px-4 py-2 text-sm text-mist sm:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap transition hover:text-ember"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
