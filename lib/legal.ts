import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/lib/i18n/config";

export type LegalDoc = "privacy" | "terms";

const FILES: Record<LegalDoc, string> = {
  privacy: "PRIVACY.md",
  terms: "TERMS.md",
};

export async function getLegalMarkdown(
  doc: LegalDoc,
  locale: Locale,
): Promise<string> {
  const filePath = path.join(process.cwd(), "content", locale, FILES[doc]);
  return readFile(filePath, "utf8");
}
