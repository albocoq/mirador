import Image from "next/image";
import { TrackedLink } from "@/components/TrackedLink";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between px-6 py-4">
      <TrackedLink
        href="/"
        event="navigate"
        eventParams={{ to: "/", location: "header" }}
        className="flex items-center gap-3 text-sand transition hover:text-ember"
      >
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          className="size-9"
          priority
        />
        <span className="font-display text-lg tracking-tight">Altalaya</span>
      </TrackedLink>
      <nav className="flex items-center gap-6 text-sm text-mist">
        {links.map((link) => (
          <TrackedLink
            key={link.href}
            href={link.href}
            event="navigate"
            eventParams={{ to: link.href, location: "header" }}
            className="transition hover:text-sand"
          >
            {link.label}
          </TrackedLink>
        ))}
      </nav>
    </header>
  );
}
