import { Check } from "lucide-react";

import { SectionHeading } from "./SectionHeading";
import { DEFAULT_TAGS } from "@/types/tags";

type CreateSpotTagsProps = {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

const categoryStyles = {
  vibe: {
    selected: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    unselected:
      "bg-[#2a2a2a] text-neutral-400 hover:bg-[#353534] border-transparent",
  },
  access: {
    selected: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    unselected:
      "bg-[#2a2a2a] text-neutral-400 hover:bg-[#353534] border-transparent",
  },
  media: {
    selected: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    unselected:
      "bg-[#2a2a2a] text-neutral-400 hover:bg-[#353534] border-transparent",
  },
} as const;

export function CreateSpotTags({
  selectedTags,
  onToggleTag,
}: CreateSpotTagsProps) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeading
        label="Spot atmosphere & tags"
        trailing="Select applicable"
      />
      <div className="flex flex-wrap gap-2">
        {DEFAULT_TAGS.map((tag) => {
          const selected = selectedTags.includes(tag.id);
          const styles =
            categoryStyles[tag.category as keyof typeof categoryStyles] ||
            categoryStyles.vibe;
          return (
            <button
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-[13px] transition-all duration-200 ${
                selected ? styles.selected : styles.unselected
              }`}
              key={tag.id}
              onClick={() => onToggleTag(tag.id)}
              type="button"
            >
              {selected && <Check className="mr-1 inline size-3" />}
              {tag.label}
            </button>
          );
        })}
      </div>
      <input name="tags" type="hidden" value={JSON.stringify(selectedTags)} />
    </section>
  );
}
