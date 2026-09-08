"use client";

import Image from "next/image";

import { authAssets } from "@/lib/assets/auth-assets";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthForm({ mode, onModeChange }: AuthFormProps) {
  const isRegister = mode === "register";
  const {
    state,
    formAction,
    pending,
    googleState,
    googleAction,
    googlePending,
  } = useAuth(mode);

  const inputStyles =
    "h-11 w-full rounded-2xl border border-altalaya-border bg-altalaya-glass-strong px-4 text-[15px] text-altalaya-text outline-none transition-all placeholder:text-altalaya-muted/60 focus:border-altalaya-accent focus:ring-2 focus:ring-altalaya-accent/20";

  const labelStyles =
    "mb-1 block font-mono text-[11px] uppercase tracking-wider text-altalaya-muted";

  return (
    <form className="flex flex-col gap-2.5 pt-1" action={formAction}>
      <div>
        <label className={labelStyles} htmlFor="email">
          Email
        </label>
        <input
          className={inputStyles}
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>

      <div>
        <label className={labelStyles} htmlFor="password">
          Password
        </label>
        <input
          className={inputStyles}
          id="password"
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />
      </div>

      {isRegister && (
        <div>
          <label className={labelStyles} htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            className={inputStyles}
            id="confirm-password"
            name="confirm-password"
            placeholder="••••••••"
            required
            type="password"
          />
        </div>
      )}

      <button
        className="mt-1 flex h-11 w-full items-center justify-center rounded-full bg-linear-to-r from-altalaya-accent via-[#c68307] to-[#ffb955] px-6 text-base font-semibold text-[#5c2800] shadow-xl shadow-altalaya-accent/20 transition hover:-translate-y-px hover:brightness-110 active:translate-y-0"
        type="submit"
        disabled={pending}
      >
        {pending ? "Please wait…" : isRegister ? "Create account" : "Log in"}
      </button>

      {(state.error || state.message) && (
        <p
          className={`text-center text-xs ${state.error ? "text-red-300" : "text-altalaya-accent"}`}
          role={state.error ? "alert" : "status"}
        >
          {state.error ?? state.message}
        </p>
      )}

      <button
        className="mx-auto mt-1 inline-flex items-center text-[13px] text-altalaya-muted underline decoration-altalaya-muted/40 underline-offset-4 transition hover:text-altalaya-peach"
        type="button"
        onClick={() => onModeChange(isRegister ? "login" : "register")}
      >
        {isRegister
          ? "Already have an account? Log in"
          : "New here? Create an account"}
      </button>

      <div className="flex items-center gap-3 py-1 text-[11px] text-altalaya-muted/70">
        <span className="h-px flex-1 bg-altalaya-border" />
        <span>or continue with</span>
        <span className="h-px flex-1 bg-altalaya-border" />
      </div>

      <button
        className="flex h-11 w-full items-center justify-center gap-3 rounded-full bg-altalaya-glass-strong px-6 text-base font-semibold text-altalaya-text backdrop-blur-md transition hover:-translate-y-px hover:brightness-110 active:translate-y-0"
        formAction={googleAction}
        disabled={googlePending}
        type="submit"
      >
        <Image
          className="size-5 object-contain"
          width={20}
          height={20}
          src={authAssets.googleIcon}
          alt="Google"
        />
        <span>{googlePending ? "Redirecting…" : "Continue with Google"}</span>
      </button>

      {googleState.error && (
        <p className="text-center text-xs text-red-300" role="alert">
          {googleState.error}
        </p>
      )}
    </form>
  );
}
