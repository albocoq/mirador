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
  >(signInWithGoogle, { data: null, error: null });

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
  >(mode === "register" ? signUp : signIn, { data: null, error: null });

  return {
    state,
    formAction,
    pending,
  };
}
