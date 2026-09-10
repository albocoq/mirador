import { Camera } from "lucide-react";
import Image from "next/image";

export default function EditProfileAvatar({
  AvatarUrl,
  username,
}: {
  AvatarUrl: string | null;
  username: string | null;
}) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="relative">
        <div className="size-24 overflow-hidden rounded-full border-2 border-white/10 bg-neutral-800">
          {AvatarUrl ? (
            <Image
              src={AvatarUrl}
              width={96}
              height={96}
              alt="Profile"
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center bg-neutral-700 text-neutral-400">
              <span className="text-2xl font-bold">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-amber-500 text-[#3e1c00] transition hover:scale-105"
        >
          <Camera className="size-4" strokeWidth={2.5} />
        </button>
      </div>
      <p className="mt-3 text-sm font-medium text-amber-500 transition hover:text-amber-400 cursor-pointer">
        Change photo
      </p>
    </div>
  );
}
