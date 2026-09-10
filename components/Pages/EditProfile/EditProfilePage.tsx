"use client";

import { useState } from "react";
import { useProfile } from "@/components/context/useProfile";
import { Input } from "@/components/ui/Input";
import EditProfileHeader from "./EditProfileHeader";
import EditProfileAvatar from "./EditProfileAvatar";
import EditProfileSubmit from "./EditProfileSubmit";
import EditProfileTextArea from "./EditProfileTextArea";
import { updateProfile } from "@/app/actions/users";

export default function EditProfilePage() {
  const { profile } = useProfile();

  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const formData = new FormData(e.currentTarget);
      if (uploadedAvatarUrl) {
        formData.set("avatar_url", uploadedAvatarUrl);
      }
      const res = await updateProfile(formData);

      if (res.error) {
        console.error(res.error);
        setStatus({ type: "error", message: res.error });
      } else {
        setStatus({
          type: "success",
          message: "Votre profil a bien été mis à jour.",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setStatus({
        type: "error",
        message: "Une erreur inattendue est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <EditProfileHeader />
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col gap-2 max-w-md px-5 pb-12 pt-4"
      >
        <EditProfileAvatar
          AvatarUrl={profile.avatar_url}
          username={profile.username}
          setUploadedAvatarUrl={setUploadedAvatarUrl}
        />
        <Input
          id="user"
          label="display Name"
          name="user"
          type="text"
          autoComplete="name"
          placeholder="Enter your display name"
          defaultValue={profile.user ?? ""}
        />

        <Input
          id="username"
          name="username"
          label="Username"
          type="text"
          defaultValue={profile.username}
        />

        <Input
          id="email"
          label="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={profile.email}
        />

        <EditProfileTextArea bio={profile.bio} />

        {status && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-red-500/10 text-red-300"
            }`}
          >
            {status.message}
          </p>
        )}

        <EditProfileSubmit isLoading={isLoading} />
      </form>
    </main>
  );
}
