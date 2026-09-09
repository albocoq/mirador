export function CreateSpotVisibility() {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[2rem] bg-[#1c1b1b] p-4">
      <span className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#2a2a2a] text-altalaya-peach">
          ◉
        </span>
        <span>
          <span className="block text-lg font-semibold tracking-tight">
            Community Viewpoint
          </span>
          <span className="block text-[13px] text-altalaya-muted">
            Visible to all Altalaya twilight seekers
          </span>
        </span>
      </span>
      <input
        className="peer sr-only"
        defaultChecked
        name="is_hidden_gem"
        type="checkbox"
      />
      <span className="flex h-7 w-12 items-center justify-end rounded-full bg-altalaya-accent p-0.5">
        <span className="size-6 rounded-full bg-[#5c2800] shadow-md" />
      </span>
    </label>
  );
}
