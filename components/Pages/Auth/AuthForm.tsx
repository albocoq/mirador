"use client";

import { GoogleAuthButton } from "@/components/Pages/Auth/GoogleAuthButton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthForm({ mode, onModeChange }: AuthFormProps) {
  const isRegister = mode === "register";
  const { state, formAction, pending } = useAuth(mode);

  return (
    <div className="flex flex-col gap-2.5 pt-1">
      <form className="flex flex-col gap-2.5" action={formAction}>
        <Input
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          type="email"
        />

        <Input
          id="password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          type="password"
        />

        {isRegister && (
          <Input
            id="confirm-password"
            label="Confirm password"
            name="confirm-password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            type="password"
          />
        )}

        <Button
          className="mt-1 h-11 px-6 text-base"
          fullWidth
          type="submit"
          disabled={pending}
        >
          {pending ? "Please wait…" : isRegister ? "Create account" : "Log in"}
        </Button>

        {(state.error || state.data) && (
          <p
            className={`text-center text-xs ${state.error ? "text-red-300" : "text-altalaya-accent"}`}
            role={state.error ? "alert" : "status"}
          >
            {state.error ?? state.data}
          </p>
        )}

        <Button
          className="mx-auto mt-1 text-[13px]"
          variant="ghost"
          type="button"
          onClick={() => onModeChange(isRegister ? "login" : "register")}
        >
          {isRegister
            ? "Already have an account? Log in"
            : "New here? Create an account"}
        </Button>
      </form>

      <div className="flex items-center gap-3 py-1 text-[11px] text-altalaya-muted/70">
        <span className="h-px flex-1 bg-altalaya-border" />
        <span>or continue with</span>
        <span className="h-px flex-1 bg-altalaya-border" />
      </div>

      <GoogleAuthButton />
    </div>
  );
}
