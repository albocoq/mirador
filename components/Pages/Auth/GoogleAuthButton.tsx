"use client";

import Image from "next/image";

import { useGoogleAuth } from "@/hooks/useAuth";
import { authAssets } from "@/lib/assets/auth-assets";
import { Button } from "@/components/ui/Button";

export function GoogleAuthButton() {
  const { googleState, googleAction, googlePending } = useGoogleAuth();

  return (
    <div className="space-y-2">
      <form action={googleAction}>
        <Button
          className="h-11 gap-3 px-6 text-base sm:h-13 sm:text-lg"
          fullWidth
          variant="secondary"
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
        </Button>
      </form>
      {googleState.error && (
        <p className="text-center text-xs text-red-300" role="alert">
          {googleState.error}
        </p>
      )}
    </div>
  );
}
