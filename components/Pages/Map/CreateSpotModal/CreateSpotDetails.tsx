import { Compass } from "lucide-react";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-300">
        {label}
      </label>
      {children}
    </div>
  );
}

type CreateSpotDetailsProps = {
  descriptionLength: number;
  onDescriptionChange: (value: string) => void;
};

export function CreateSpotDetails({
  descriptionLength,
  onDescriptionChange,
}: CreateSpotDetailsProps) {
  return (
    <>
      <Field label="Spot name">
        <div className="flex items-center gap-2 rounded-4xl bg-altalaya-surface px-4 py-3">
          <input
            className="min-w-0 flex-1 bg-transparent text-lg font-semibold tracking-tight text-altalaya-text outline-none placeholder:text-altalaya-muted"
            name="title"
            placeholder="Monte Calamorro Ridge"
            required
          />
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-altalaya-muted">
            <Compass className="size-4" />
          </span>
        </div>
      </Field>
      <Field label="Description & access notes">
        <div className="rounded-4xl bg-altalaya-surface px-4 py-3">
          <textarea
            className="min-h-24 w-full resize-none bg-transparent text-[15px] leading-5.25 text-altalaya-text outline-none placeholder:text-altalaya-muted"
            maxLength={300}
            name="description"
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Unobstructed 280° panoramic horizon. Best light hits 24 minutes before sunset. Steep limestone path, sturdy boots recommended."
          />
          <div className="flex items-center justify-between pt-2 font-mono text-[11px]">
            <span className="text-altalaya-muted/70">Markdown supported</span>
            <span className="text-altalaya-peach">{descriptionLength}/300</span>
          </div>
        </div>
      </Field>
    </>
  );
}
