export type SpotTag = {
  id: string;
  label: string;
  iconName: string;
  category: "vibe" | "access" | "media";
};

export const DEFAULT_TAGS = [
  { id: "sunset", label: "Sunset", category: "vibe" },
  { id: "quiet", label: "Calme", category: "vibe" },
  { id: "romantic", label: "Romantique", category: "vibe" },
  { id: "stargazing", label: "Étoiles", category: "vibe" },
  { id: "car-friendly", label: "Parking facile", category: "access" },
  { id: "easy-access", label: "Accès facile", category: "access" },
  { id: "hike-required", label: "Marche requise", category: "access" },
  { id: "drone-friendly", label: "Idéal Drone", category: "media" },
  { id: "vintage-spot", label: "Style Rétro", category: "media" },
] as const;
