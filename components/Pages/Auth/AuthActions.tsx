import Image from "next/image";

import { authAssets } from "@/lib/assets/auth-assets";
import { useGoogleAuth } from "@/hooks/useAuth";

type AuthActionsProps = {
  onEmailClick: () => void;
};

export function AuthActions({ onEmailClick }: AuthActionsProps) {
  const { googleState, googleAction, googlePending } = useGoogleAuth();

  return (
    <div className="flex flex-col gap-2 pt-4 sm:gap-3 sm:pt-7">
      <form action={googleAction}>
        <button
          className="flex h-11 w-full items-center justify-center gap-3 rounded-full bg-altalaya-glass-strong px-6 text-base font-semibold text-altalaya-text backdrop-blur-md transition hover:-translate-y-px hover:brightness-110 active:translate-y-0 sm:h-13 sm:text-lg"
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
      </form>

      {googleState.error && (
        <p className="text-center text-xs text-red-300" role="alert">
          {googleState.error}
        </p>
      )}

      <button
        className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-altalaya-accent via-[#c68307] to-[#ffb955] px-6 text-base font-semibold text-[#5c2800] shadow-xl shadow-altalaya-accent/20 transition hover:-translate-y-px hover:brightness-110 active:translate-y-0 sm:h-13 sm:text-lg"
        type="button"
        onClick={onEmailClick}
      >
        <Image
          className="h-3.5 w-4 object-contain"
          width={16}
          height={14}
          src={authAssets.mailIcon}
          alt="Email"
        />
        <span>Explore with Email</span>
      </button>
    </div>
  );
}
