"use client";

import { useActionState } from "react";

import {
  signIn,
  signInWithGoogle,
  signUp,
  type AuthActionState,
} from "@/hooks/actions";

type AuthMode = "login" | "register";

export function useGoogleAuth() {
  const [googleState, googleAction, googlePending] = useActionState<
    AuthActionState,
    FormData
  >(signInWithGoogle, {});

  return {
    googleState,
    googleAction,
    googlePending,
  };
}

export function useAuth(mode: AuthMode) {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(mode === "register" ? signUp : signIn, {});

  return {
    state,
    formAction,
    pending,
    ...useGoogleAuth(),
  };
}
