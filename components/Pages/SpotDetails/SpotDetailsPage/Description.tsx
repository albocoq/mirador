type DescriptionProps = {
  description: string;
  expanded: boolean;
  onToggle: () => void;
};

export function Description({
  description,
  expanded,
  onToggle,
}: DescriptionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">About this vantage</h2>
      <p
        className={`text-[15px] leading-6 text-altalaya-muted ${expanded ? "" : "line-clamp-7"}`}
      >
        {description}
      </p>

      {/* TODO */}

      {/* <div className="flex items-start gap-3 rounded-4xl bg-[#201f1f] p-4">
        <MapPin className="mt-0.5 size-4 shrink-0 text-altalaya-peach" />
        <div>
          <h3 className="text-[13px] font-semibold">Rover Insight</h3>
          <p className="mt-1 text-[13px] leading-5 text-altalaya-muted">
            Arrive approximately 45 minutes prior to civil twilight. The final
            600m is unpaved gravel road; slow driving is recommended for
            standard sedans.
          </p>
        </div>
      </div> */}
      <button
        className="self-start text-xs text-[#ffb955]"
        onClick={onToggle}
        type="button"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </section>
  );
}
