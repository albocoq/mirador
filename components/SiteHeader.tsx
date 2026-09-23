"use client";

import Image from "next/image";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TrackedLink } from "@/components/TrackedLink";
import { useI18n } from "@/components/I18nProvider";
import { localePath } from "@/lib/i18n/config";

export function SiteHeader() {
  const { locale, dict } = useI18n();
  const links = [
    { href: localePath(locale, "/privacy"), label: dict.nav.privacy, to: "/privacy" },
    { href: localePath(locale, "/terms"), label: dict.nav.terms, to: "/terms" },
  ] as const;

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between gap-4 px-6 py-4">
      <TrackedLink
        href={localePath(locale)}
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
      <div className="flex items-center gap-4 sm:gap-6">
        <nav className="flex items-center gap-4 text-sm text-mist sm:gap-6">
          {links.map((link) => (
            <TrackedLink
              key={link.href}
              href={link.href}
              event="navigate"
              eventParams={{ to: link.to, location: "header" }}
              className="transition hover:text-sand"
            >
              {link.label}
            </TrackedLink>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
