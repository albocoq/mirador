import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  deleteOwnAccountAction,
  signInWithPasswordAction,
  signOutDeleteAccountAction,
} from "@/app/[lang]/delete-account/actions";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.deleteAccountTitle,
    description: dict.meta.deleteAccountDescription,
  };
}

function errorMessage(
  code: string | undefined,
  dict: Awaited<ReturnType<typeof getDictionary>>,
) {
  if (!code) return null;
  if (code === "confirm") return dict.deleteAccount.errors.confirm;
  if (code === "auth") return dict.deleteAccount.errors.auth;
  if (code === "oauth") return dict.deleteAccount.errors.oauth;
  if (code === "photos") return dict.deleteAccount.errors.photos;
  return code;
}

export default async function DeleteAccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string; deleted?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { error, deleted } = await searchParams;

  if (deleted === "1") {
    return (
      <section className="mx-auto w-full max-w-lg px-6 py-12 sm:py-16">
        <Link
          href={localePath(lang)}
          className="text-sm text-mist transition hover:text-sand"
        >
          {dict.legal.back}
        </Link>
        <h1 className="mt-8 font-display text-4xl tracking-tight text-sand">
          {dict.deleteAccount.doneTitle}
        </h1>
        <p className="mt-4 text-base leading-7 text-mist">
          {dict.deleteAccount.doneBody}
        </p>
        <Link
          href={localePath(lang)}
          className="mt-8 inline-block border border-white/15 px-5 py-2.5 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
        >
          {dict.deleteAccount.backHome}
        </Link>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();
    username = (profile?.username as string | null) ?? null;
  }

  const alert = errorMessage(error, dict);

  return (
    <section className="mx-auto w-full max-w-lg px-6 py-12 sm:py-16">
      <Link
        href={localePath(lang)}
        className="text-sm text-mist transition hover:text-sand"
      >
        {dict.legal.back}
      </Link>

      <h1 className="mt-8 font-display text-4xl tracking-tight text-sand sm:text-5xl">
        {dict.deleteAccount.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-mist">
        {dict.deleteAccount.intro}
      </p>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-6 text-mist">
        <li>{dict.deleteAccount.removesProfile}</li>
        <li>{dict.deleteAccount.removesSpots}</li>
        <li>{dict.deleteAccount.removesPhotos}</li>
        <li>{dict.deleteAccount.keepsReports}</li>
      </ul>

      <p className="mt-6 text-sm leading-6 text-mist/80">
        {dict.deleteAccount.inAppHint}{" "}
        <Link
          href={localePath(lang, "/privacy")}
          className="text-ember underline underline-offset-2"
        >
          {dict.deleteAccount.privacyLink}
        </Link>
        {dict.legal.period}
      </p>

      {alert ? (
        <p className="mt-6 text-sm text-ember" role="alert">
          {alert}
        </p>
      ) : null}

      {user ? (
        <div className="mt-10 space-y-6 border border-white/10 bg-ridge/40 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/70">
              {dict.deleteAccount.signedInAs}
            </p>
            <p className="mt-2 text-sand">
              {username ?? user.email ?? user.id}
            </p>
            {username && user.email ? (
              <p className="mt-0.5 text-sm text-mist/70">{user.email}</p>
            ) : null}
          </div>

          <form action={deleteOwnAccountAction} className="space-y-4">
            <input type="hidden" name="lang" value={lang} />
            <label className="block space-y-1.5 text-sm">
              <span className="text-mist">
                {dict.deleteAccount.confirmLabel}{" "}
                <span className="font-mono text-sand">{dict.deleteAccount.confirmWord}</span>
              </span>
              <input
                name="confirm"
                type="text"
                required
                autoComplete="off"
                spellCheck={false}
                placeholder={dict.deleteAccount.confirmWord}
                className="w-full border border-white/15 bg-ink/40 px-3 py-2 text-sand outline-none focus:border-ember/60"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              {dict.deleteAccount.deleteCta}
            </button>
          </form>

          <form action={signOutDeleteAccountAction}>
            <input type="hidden" name="lang" value={lang} />
            <button
              type="submit"
              className="text-sm text-mist underline decoration-white/20 underline-offset-2 hover:text-sand"
            >
              {dict.deleteAccount.signOut}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          <GoogleSignInButton
            lang={lang}
            label={dict.deleteAccount.continueGoogle}
            errorLabel={dict.deleteAccount.errors.oauth}
          />

          <p className="text-center text-xs uppercase tracking-[0.18em] text-mist/60">
            {dict.deleteAccount.orEmail}
          </p>

          <form action={signInWithPasswordAction} className="space-y-4">
            <input type="hidden" name="lang" value={lang} />
            <label className="block space-y-1.5 text-sm">
              <span className="text-mist">{dict.deleteAccount.email}</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="username"
                className="w-full border border-white/15 bg-ridge/50 px-3 py-2 text-sand outline-none focus:border-ember/60"
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="text-mist">{dict.deleteAccount.password}</span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-white/15 bg-ridge/50 px-3 py-2 text-sand outline-none focus:border-ember/60"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              {dict.deleteAccount.signIn}
            </button>
          </form>

          <p className="text-sm leading-6 text-mist/70">
            {dict.deleteAccount.emailFallback}{" "}
            <a
              href={`mailto:privacy@altalaya.app?subject=${encodeURIComponent(
                dict.deleteAccount.emailSubject,
              )}`}
              className="text-ember underline underline-offset-2"
            >
              privacy@altalaya.app
            </a>
            {dict.legal.period}
          </p>
        </div>
      )}
    </section>
  );
}
