export const profileFilters = ["ALL HORIZONS"];

export function isTrustedFigmaAsset(
  value: string | null | undefined,
): value is string {
  return value?.startsWith("https://www.figma.com/api/mcp/asset/") ?? false;
}
