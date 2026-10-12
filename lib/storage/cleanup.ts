const IMAGE_BUCKET = "altalaya-images";
const BUCKET_SPLIT = `/${IMAGE_BUCKET}/`;

export function storagePathFromPublicUrl(url: string): string | null {
  try {
    const decodedUrl = decodeURIComponent(url.trim());
    const rawPath = decodedUrl.split(BUCKET_SPLIT)[1];
    if (!rawPath) return null;

    const path = rawPath.split("?")[0].replace(/^\/+/, "");
    if (!path || path.includes("..")) return null;

    return path;
  } catch {
    return null;
  }
}

export function storagePathsFromPublicUrls(urls: string[]): string[] {
  const paths: string[] = [];
  const seen = new Set<string>();

  for (const url of urls) {
    const path = storagePathFromPublicUrl(url);
    if (!path || seen.has(path)) continue;
    seen.add(path);
    paths.push(path);
  }

  return paths;
}
