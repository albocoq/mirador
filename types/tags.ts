export type SpotTag = {
  id: string;
  label: string;
  iconName: string;
  category: "vibe" | "access" | "media";
};

export const DEFAULT_TAGS = [
  { id: "sunset", label: "Sunset", iconName: "sun", category: "vibe" },
  { id: "quiet", label: "Calme", iconName: "sun", category: "vibe" },
  {
    id: "romantic",
    label: "Romantique",
    iconName: "sun",
    category: "vibe",
  },
  {
    id: "stargazing",
    label: "Étoiles",
    iconName: "sun",
    category: "vibe",
  },
  {
    id: "car-friendly",
    label: "Parking facile",
    iconName: "car",
    category: "access",
  },
  {
    id: "easy-access",
    label: "Accès facile",
    iconName: "car",
    category: "access",
  },
  {
    id: "hike-required",
    label: "Marche requise",
    iconName: "car",
    category: "access",
  },
  {
    id: "drone-friendly",
    label: "Idéal Drone",
    iconName: "camera",
    category: "media",
  },
  {
    id: "vintage-spot",
    label: "Style Rétro",
    iconName: "camera",
    category: "media",
  },
] as const satisfies readonly SpotTag[];

export type SpotTagDefinition = SpotTag;

export const TAG_CATEGORY_STYLES = {
  vibe: {
    badge: "bg-amber-500/15 text-amber-300",
    selected: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    unselected:
      "bg-[#2a2a2a] text-neutral-400 hover:bg-[#353534] border-transparent",
  },
  access: {
    badge: "bg-emerald-500/15 text-emerald-300",
    selected: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    unselected:
      "bg-[#2a2a2a] text-neutral-400 hover:bg-[#353534] border-transparent",
  },
  media: {
    badge: "bg-purple-500/15 text-purple-300",
    selected: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    unselected:
      "bg-[#2a2a2a] text-neutral-400 hover:bg-[#353534] border-transparent",
  },
} as const;

export function getTagDefinition(tagId: string) {
  return (
    DEFAULT_TAGS.find((tag) => tag.id === tagId) ?? {
      id: tagId,
      label: tagId,
      iconName: "tag",
      category: "vibe" as const,
    }
  );
}
