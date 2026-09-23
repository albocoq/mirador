import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLegalMarkdown } from "@/lib/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const source = await getLegalMarkdown("privacy", lang);

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href={localePath(lang)}
        className="text-sm text-mist transition hover:text-sand"
      >
        {dict.legal.back}
      </Link>
      <div className="mt-8">
        <Markdown source={source} />
      </div>
      <p className="mt-14 text-sm text-mist/70">
        {dict.legal.alsoSeeTerms}{" "}
        <Link
          href={localePath(lang, "/terms")}
          className="text-ember underline underline-offset-2"
        >
          {dict.legal.termsLink}
        </Link>
        {dict.legal.period}
      </p>
    </section>
  );
}
