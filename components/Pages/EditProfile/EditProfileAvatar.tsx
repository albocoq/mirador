"use client";

import { Camera, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { uploadImageToSupabase } from "@/lib/upload";

export default function EditProfileAvatar({
  AvatarUrl,
  username,
  setUploadedAvatarUrl,
}: {
  AvatarUrl: string | null;
  username: string | null;
  setUploadedAvatarUrl: (url: string) => void;
  onRemove?: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<string | null>(AvatarUrl);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToSupabase(file, "avatars");
      setLocalAvatar(url);
      setUploadedAvatarUrl(url);
    } catch (error) {
      console.error("Erreur d'upload:", error);
      alert(error instanceof Error ? error.message : "Erreur lors de l'envoi");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="mb-8 flex flex-col items-center">
      <label
        className={`relative ${isUploading ? "cursor-not-allowed opacity-70" : "cursor-pointer group"}`}
      >
        <div className="size-24 overflow-hidden rounded-full border-2 border-white/10 bg-neutral-800">
          {localAvatar ? (
            <Image
              src={localAvatar}
              width={96}
              height={96}
              alt="Profile"
              className="size-full object-cover"
              unoptimized
              priority
            />
          ) : (
            <div className="size-full flex items-center justify-center bg-neutral-700 text-neutral-400">
              <span className="text-2xl font-bold">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-amber-500 text-[#3e1c00] transition group-hover:scale-105">
          {isUploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Camera className="size-4" strokeWidth={2.5} />
          )}
        </div>

        <input
          type="file"
          className="sr-only"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      <p className="mt-3 text-sm font-medium text-amber-500 transition hover:text-amber-400">
        {isUploading ? "Envoi en cours..." : "Change photo"}
      </p>
    </div>
  );
}
