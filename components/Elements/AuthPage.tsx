"use client";

import { useState } from "react";

import { AuthActions } from "@/components/Pages/Auth/AuthActions";
import { AuthStats } from "@/components/Pages/Auth/AuthStats";
import { AuthHero } from "@/components/Pages/Auth/AuthHero";
import { AuthForm } from "../Pages/Auth/AuthForm";

type AuthPageProps = {
  initialMode?: "landing" | "login" | "register";
};

export function AuthPage({ initialMode = "landing" }: AuthPageProps) {
  const [authMode, setAuthMode] = useState(initialMode);
  const showingForm = authMode !== "landing";

  return (
    <main
      className="flex h-dvh w-full flex-col overflow-y-auto bg-altalaya-night sm:mx-auto sm:w-97.5 sm:shadow-[0_0_80px_rgba(0,0,0,0.35)]"
      data-node-id="2001:2"
    >
      <AuthHero compact={showingForm} />
      <section
        className="relative -top-2 flex flex-1 flex-col px-5 pb-4 sm:px-6 sm:pb-8"
        id="explore"
      >
        <div
          className={`shrink-0 pt-1 sm:pt-2 ${showingForm ? "mb-3" : "mb-3 sm:mb-6"}`}
        >
          <div
            className="mb-2 flex h-1.5 items-center gap-2 sm:mb-4"
            aria-label="Slide 1 of 3"
          >
            <span className="h-1.5 w-6 rounded-full bg-altalaya-accent" />
            <span className="size-1.5 rounded-full bg-[#353534]" />
            <span className="size-1.5 rounded-full bg-[#353534]" />
          </div>

          <h1 className="text-[28px] font-bold leading-8 tracking-[-0.85px] text-altalaya-text sm:text-[34px] sm:leading-10">
            {showingForm ? (
              authMode === "register" ? (
                "Create your account"
              ) : (
                "Welcome back"
              )
            ) : (
              <>
                Find your{" "}
                <span className="bg-linear-to-r from-altalaya-peach via-altalaya-accent to-[#ffb955] bg-clip-text text-transparent">
                  quiet corner
                </span>
              </>
            )}
          </h1>

          <p className="mt-1.5 text-[13px] leading-4.5 text-altalaya-muted sm:mt-1.25 sm:text-[15px] sm:leading-6">
            {showingForm
              ? authMode === "register"
                ? "Join a community of contemplative explorers."
                : "Sign in to continue your quiet journey."
              : "Discover secret sunset vantage points, track golden hour trajectories, and connect with a community of contemplative explorers."}
          </p>
        </div>

        {showingForm ? (
          <div className="flex-1 pb-2">
            <AuthForm mode={authMode} onModeChange={setAuthMode} />
          </div>
        ) : (
          <>
            <AuthStats />
            <AuthActions onEmailClick={() => setAuthMode("login")} />
          </>
        )}
      </section>
    </main>
  );
}
