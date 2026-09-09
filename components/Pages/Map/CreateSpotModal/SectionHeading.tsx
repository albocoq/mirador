type SectionHeadingProps = {
  label: string;
  trailing: string;
};

export function SectionHeading({ label, trailing }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[11px] font-bold uppercase tracking-[0.88px] text-altalaya-muted">
        {label}
      </span>
      <span className="shrink-0 font-mono text-[11px] text-altalaya-peach">
        {trailing}
      </span>
    </div>
  );
}
