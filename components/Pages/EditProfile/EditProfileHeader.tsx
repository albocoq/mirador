import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProfileHeader() {
  return (
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
  );
}
