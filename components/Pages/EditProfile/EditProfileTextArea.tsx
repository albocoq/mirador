export default function EditProfileTextArea({ bio }: { bio: string | null }) {
  return (
    <div>
      <label
        htmlFor="bio"
        className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-altalaya-muted"
      >
        Bio (Short description)
      </label>
      <textarea
        id="bio"
        name="bio"
        rows={3}
        placeholder="Tell us a little about yourself"
        defaultValue={bio ?? ""}
        className="w-full rounded-2xl border border-altalaya-border bg-altalaya-glass-strong px-4 py-2 text-[15px] text-altalaya-text outline-none transition-all placeholder:text-altalaya-muted/60 focus:border-altalaya-accent focus:ring-2 focus:ring-altalaya-accent/20 "
      />
    </div>
  );
}
