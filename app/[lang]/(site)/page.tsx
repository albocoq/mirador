import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DiscordJoin } from "@/components/DiscordJoin";
import { PlayStoreButton } from "@/components/PlayStoreButton";
import { SocialLinks } from "@/components/SocialLinks";
import { TrackedLink } from "@/components/TrackedLink";
import { PLAY_STORE_URL, SOCIAL_LINKS } from "@/lib/config";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  absoluteUrl,
  ANDROID_PACKAGE,
  buildPageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return buildPageMetadata({
    locale: lang,
    path: "/",
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    absoluteTitle: true,
  });
}

function jsonLdForHome(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        email: "privacy@altalaya.app",
        sameAs: SOCIAL_LINKS.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(locale)}#webpage`,
        url: absoluteUrl(locale),
        name: SITE_NAME,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#mobileapp` },
        inLanguage: locale,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#mobileapp`,
        name: SITE_NAME,
        operatingSystem: "Android",
        applicationCategory: "TravelApplication",
        description,
        url: PLAY_STORE_URL,
        downloadUrl: PLAY_STORE_URL,
        installUrl: PLAY_STORE_URL,
        image: `${SITE_URL}/icon-512x512.png`,
        author: { "@id": `${SITE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
        applicationSuite: SITE_NAME,
        softwareVersion: "1",
        sameAs: [PLAY_STORE_URL],
        additionalProperty: {
          "@type": "PropertyValue",
          name: "package",
          value: ANDROID_PACKAGE,
        },
      },
    ],
  };
}

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
  const jsonLd = jsonLdForHome(lang, dict.meta.description);

  return (
    <section className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center px-6 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Image
        src="/logo.png"
        alt={dict.home.logoAlt}
        width={120}
        height={120}
        className="size-20 sm:size-28"
        priority
        sizes="112px"
      />
      <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-sand sm:text-6xl md:text-7xl">
        Altalaya
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-mist sm:text-lg sm:leading-8">
        {dict.home.tagline}
      </p>
      <div className="mt-6 flex flex-wrap items-start gap-3">
        <PlayStoreButton location="home_cta" />
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
      <p className="mt-8 max-w-xl text-sm leading-6 text-mist/75">
        {dict.home.about}
      </p>
      <ul className="mt-4 max-w-xl space-y-1.5 text-sm leading-6 text-mist/65">
        {dict.home.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ember/80" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/70">
          {dict.home.followUs}
        </p>
        <SocialLinks className="mt-3" />
      </div>
    </section>
  );
}
