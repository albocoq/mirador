"use client";

import { useState } from "react";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProfile } from "@/components/context/useProfile";
import { Input } from "@/components/ui/Input";

export default function EditProfilePage() {
  const { profile } = useProfile();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Connecter ici avec ta Server Action updateProfile
    // const formData = new FormData(e.urrentTarget);
    // await updateProfile(formData);

    // Simulation du chargement pour la démo
    setTimeout(() => setIsLoading(false), 1500);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[#0a0a0a]/80 px-4 py-4 backdrop-blur-md">
        <Link
          href="/profile"
          className="flex size-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
        >
          <ArrowLeft className="size-5 text-neutral-200" />
        </Link>
        <h1 className="text-base font-semibold tracking-wide text-neutral-100">
          Edit Profile
        </h1>
        <div className="size-10" />{" "}
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md px-5 pb-12 pt-4"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="size-24 overflow-hidden rounded-full border-2 border-white/10 bg-neutral-800">
              {profile?.avatar_url ? (
                <Image
                  src={profile?.avatar_url}
                  width={96}
                  height={96}
                  alt="Profile"
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center bg-neutral-700 text-neutral-400">
                  <span className="text-2xl font-bold">
                    {profile?.username?.charAt(0).toUpperCase()}
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

        <Input
          id="displayName"
          label="displayName"
          type="text"
          autoComplete="name"
          defaultValue={profile.username}
        />

        <Input
          id="username"
          label="Username"
          type="text"
          defaultValue={profile.username}
        />

        <Input
          id="email"
          label="email"
          type="email"
          autoComplete="email"
          defaultValue={profile.email}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="bio"
            className="text-[11px] font-bold uppercase tracking-wider text-neutral-400"
          >
            Bio (Short description)
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            defaultValue="Chasing sunsets across Andalusia 🌅"
            className="w-full resize-none rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-3.5 text-[15px] text-white placeholder:text-neutral-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </div>
        <div />

        <div className="mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-full bg-linear-to-r from-amber-500 to-orange-500 py-4 text-[15px] font-bold text-[#3e1c00] shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
