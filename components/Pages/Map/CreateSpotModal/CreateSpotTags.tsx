import { SectionHeading } from "./SectionHeading";
import { SpotTagIcon } from "@/components/ui/SpotTag";
import { DEFAULT_TAGS, TAG_CATEGORY_STYLES } from "@/types/tags";

type CreateSpotTagsProps = {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

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
          const styles = TAG_CATEGORY_STYLES[tag.category];
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
              <span className="mr-1 inline-flex align-middle">
                <SpotTagIcon definition={tag} />
              </span>
              {tag.label}
            </button>
          );
        })}
      </div>
      <input name="tags" type="hidden" value={JSON.stringify(selectedTags)} />
    </section>
  );
}
