export function SolarTrajectory() {
  return (
    <section className="flex flex-col gap-3 rounded-4xl bg-altalaya-surface p-4">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.88px] text-altalaya-muted">
        <span>Solar trajectory visualizer</span>
        <span className="font-mono font-normal normal-case tracking-normal text-altalaya-peach">
          Live Ephemeris
        </span>
      </div>
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-x-4 top-9 h-0.5 rotate-12 bg-[#514633]" />
        <div className="absolute inset-x-8 top-8 h-0.5 rotate-12 bg-altalaya-accent shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
        <span className="absolute left-[63%] top-4 size-3 rounded-full bg-altalaya-peach shadow-[0_0_0_3px_rgba(255,122,0,0.25),0_0_10px_rgba(255,122,0,0.8)]" />
      </div>
      <div className="flex justify-between font-mono text-[11px] text-altalaya-muted">
        <span>Dawn 06:48</span>
        <span className="text-[#ffb955]">Golden Hour (Active)</span>
        <span>Dusk 21:14</span>
      </div>
    </section>
  );
}
