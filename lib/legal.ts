import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegalDoc = "privacy" | "terms";

const FILES: Record<LegalDoc, string> = {
  privacy: "PRIVACY.md",
  terms: "TERMS.md",
};

export async function getLegalMarkdown(doc: LegalDoc): Promise<string> {
  const filePath = path.join(process.cwd(), "content", FILES[doc]);
  return readFile(filePath, "utf8");
}
