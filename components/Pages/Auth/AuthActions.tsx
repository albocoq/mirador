import Image from "next/image";

import { GoogleAuthButton } from "@/components/Pages/Auth/GoogleAuthButton";
import { Button } from "@/components/ui/Button";
import { authAssets } from "@/lib/assets/auth-assets";

type AuthActionsProps = {
  onEmailClick: () => void;
};

export function AuthActions({ onEmailClick }: AuthActionsProps) {
  return (
    <div className="flex flex-col gap-2 pt-4 sm:gap-3 sm:pt-7">
      <GoogleAuthButton />

      <Button
        className="h-11 gap-2 px-6 text-base sm:h-13 sm:text-lg"
        fullWidth
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
      </Button>
    </div>
  );
}
