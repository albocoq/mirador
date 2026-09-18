import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { getLegalMarkdown } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Altalaya Terms of Use — rules for using the community map of viewpoints.",
};

export default async function TermsPage() {
  const source = await getLegalMarkdown("terms");

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
        <Link href="/privacy" className="text-ember underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  );
}
