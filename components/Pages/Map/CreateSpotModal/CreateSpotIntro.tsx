export function CreateSpotIntro() {
  return (
    <section className="flex items-center justify-between gap-4 pb-2 pt-2">
      <div className="flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-altalaya-peach">
          New vantage point
        </p>
        <p className="mt-1 text-[13px] leading-4.5 text-altalaya-muted">
          Add coordinates & details for the roaming community
        </p>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-[#2a2a2a] px-3 py-1 font-mono text-[11px] text-altalaya-peach">
        <span className="size-1.5 rounded-full bg-altalaya-accent" />
        <span>GPS Ready</span>
      </div>
    </section>
  );
}
