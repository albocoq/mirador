"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { updateProfile as updateProfileAction } from "@/app/actions/users";
import type { UserActionResult } from "@/app/actions/users";
import type { UserProfile } from "@/types/database";
import { useRouter } from "next/router";

type ProfileContextValue = {
  profile: UserProfile;
  isUpdating: boolean;
  error: string | null;
  updateProfile: (formData: FormData) => Promise<UserActionResult>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({
  children,
  initialProfile,
}: {
  children: ReactNode;
  initialProfile: UserProfile | null;
}) {
  if (!initialProfile) {
    throw new Error("ProfileProvider requires an initialProfile");
  }
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (formData: FormData) => {
    setIsUpdating(true);
    setError(null);

    try {
      const result = await updateProfileAction(formData);
      if (result.data) setProfile(result.data);
      if (result.error) setError(result.error);
      return result;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const value = useMemo(
    () => ({ profile, isUpdating, error, updateProfile }),
    [profile, isUpdating, error, updateProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside a ProfileProvider");
  }

  return context;
}
