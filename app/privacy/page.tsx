import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { getLegalMarkdown } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Altalaya Privacy Policy — what data we collect and how we use it.",
};

export default async function PrivacyPage() {
  const source = await getLegalMarkdown("privacy");

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm text-mist transition hover:text-sand"
      >
        ← Back
      </Link>
      <div className="mt-8">
        <Markdown source={source} />
      </div>
      <p className="mt-14 text-sm text-mist/70">
        Also see our{" "}
        <Link href="/terms" className="text-ember underline underline-offset-2">
          Terms of Use
        </Link>
        .
      </p>
    </section>
  );
}
