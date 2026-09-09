import { Camera, Car, Sun, Tag } from "lucide-react";

import {
  getTagDefinition,
  TAG_CATEGORY_STYLES,
  type SpotTagDefinition,
} from "@/types/tags";

const tagIcons = {
  camera: Camera,
  car: Car,
  sun: Sun,
  tag: Tag,
} as const;

type SpotTagProps = {
  tag: string | SpotTagDefinition;
  compact?: boolean;
};

export function SpotTag({ tag, compact = false }: SpotTagProps) {
  const definition = typeof tag === "string" ? getTagDefinition(tag) : tag;
  const styles = TAG_CATEGORY_STYLES[definition.category];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${
        compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-[13px]"
      } ${styles.badge}`}
    >
      <SpotTagIcon definition={definition} />
      {definition.label}
    </span>
  );
}

export function SpotTagIcon({ definition }: { definition: SpotTagDefinition }) {
  const Icon = tagIcons[definition.iconName as keyof typeof tagIcons] ?? Tag;

  return <Icon className="size-3.5" />;
}
