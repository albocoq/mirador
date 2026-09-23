import Image from "next/image";
import { notFound } from "next/navigation";
import { DiscordJoin } from "@/components/DiscordJoin";
import { SocialLinks } from "@/components/SocialLinks";
import { TrackedLink } from "@/components/TrackedLink";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const privacyHref = localePath(lang, "/privacy");
  const termsHref = localePath(lang, "/terms");

  return (
    <section className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center overflow-hidden px-6 py-4">
      <Image
        src="/logo.png"
        alt={dict.home.logoAlt}
        width={120}
        height={120}
        className="size-20 sm:size-28"
        priority
      />
      <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-sand sm:text-6xl md:text-7xl">
        Altalaya
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-mist sm:text-lg sm:leading-8">
        {dict.home.tagline}
      </p>
      <div className="mt-6 flex flex-wrap items-start gap-3">
        <DiscordJoin />
        <TrackedLink
          href={privacyHref}
          event="navigate"
          eventParams={{ to: "/privacy", location: "home_cta" }}
          className="border border-white/15 px-6 py-3 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
        >
          {dict.home.privacyCta}
        </TrackedLink>
        <TrackedLink
          href={termsHref}
          event="navigate"
          eventParams={{ to: "/terms", location: "home_cta" }}
          className="border border-white/15 px-6 py-3 text-sm font-semibold text-sand transition hover:border-ember/50 hover:text-ember"
        >
          {dict.home.termsCta}
        </TrackedLink>
      </div>
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/70">
          {dict.home.followUs}
        </p>
        <SocialLinks className="mt-3" />
      </div>
    </section>
  );
}
