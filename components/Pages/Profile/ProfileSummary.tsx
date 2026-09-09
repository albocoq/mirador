import { useProfile } from "@/components/context/useProfile";
import Image from "next/image";

function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-lg font-semibold ${accent ? "text-altalaya-peach" : "text-altalaya-text"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] font-bold tracking-[0.88px] text-altalaya-muted">
        {label}
      </p>
    </div>
  );
}

export function ProfileSummary() {
  const { profile } = useProfile();

  return (
    <section className="relative flex flex-col items-center overflow-hidden rounded-4xl bg-[#201f1f]/75 px-5 pt-5 shadow-[0_20px_25px_rgba(0,0,0,0.1)] backdrop-blur-xl py-3">
      <div className="pointer-events-none absolute -top-16 size-48 rounded-full bg-altalaya-accent/20 blur-3xl" />
      <div className="relative rounded-full bg-linear-to-br from-altalaya-accent via-[#ffb955] to-[#ffdbc8] p-0.75 shadow-[0_0_18px_rgba(255,122,0,0.55)]">
        {profile?.avatar_url ? (
          <Image
            alt=""
            className="size-20 rounded-full object-cover"
            height={80}
            src={profile?.avatar_url}
            width={80}
            unoptimized={profile?.avatar_url.startsWith("blob:")}
          />
        ) : (
          <div className="size-20 rounded-full flex items-center justify-center text-2xl text-altalaya-text font-black bg-altalaya-night">
            {profile?.username?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-[#0e0e0e] text-xs">
          ✦
        </span>
      </div>
      <h2 className="mt-3 text-[22px] font-semibold tracking-tight">
        {profile?.username}
      </h2>
      <p className="font-mono text-[11px] tracking-[0.275px] text-altalaya-peach">
        {profile?.username ? `@${profile.username}` : "@"}
      </p>
      <p className="mt-2 text-center text-[15px] text-altalaya-muted">
        {profile?.bio ?? "No bio available."}
      </p>
      {/* <div className="mt-5 grid w-full grid-cols-3 gap-2 bg-[#2a2a2a]/60 p-3 text-center backdrop-blur-md">
        <Stat value="14" label="SPOTS" />
        <Stat value="1.2k" label="LIKES" accent />
        <Stat value="38" label="SAVED" />
      </div> */}
      <div className="mt-2 flex w-full items-center justify-between rounded-full bg-[#353534]/40 px-4 py-2 font-mono text-[11px]">
        <span>☀ Next Golden Hour</span>
        <span className="text-altalaya-peach">19:42 · Ronda</span>
      </div>
    </section>
  );
}
