import type { ReactNode } from "react";
import { Compass, Sun, Users } from "lucide-react";

export function SpotStats() {
  return (
    <section className="grid grid-cols-3 gap-2 rounded-4xl bg-altalaya-surface p-2">
      <Stat
        icon={<Sun />}
        label="SUNSET"
        value="20:42"
        detail="Peak light"
        accent
      />
      <Stat icon={<Users />} label="DENSITY" value="Low" detail="<5 visitors" />
      <Stat
        icon={<Compass />}
        label="BEARING"
        value="West"
        detail="Direct line"
        accent
      />
    </section>
  );
}

type StatProps = {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
};

function Stat({ icon, label, value, detail, accent }: StatProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#201f1f] p-3 text-center">
      <div className="flex items-center gap-1 text-[11px] font-bold tracking-[0.88px] text-altalaya-muted">
        {icon}
        <span>{label}</span>
      </div>
      <strong className="mt-2 font-mono text-[13px]">{value}</strong>
      <span
        className={`mt-0.5 font-mono text-[11px] ${accent ? "text-[#ffb955]" : "text-altalaya-muted"}`}
      >
        {detail}
      </span>
    </div>
  );
}
