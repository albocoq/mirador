import Image from "next/image";
import { authStats } from "@/lib/assets/auth-assets";

export function AuthStats() {
  return (
    <div
      className="grid grid-cols-3 gap-2 py-1 sm:gap-2.5"
      aria-label="Community statistics"
    >
      {authStats.map((stat) => (
        <article
          className="flex min-h-18 flex-col items-center justify-center rounded-xl bg-altalaya-surface p-2 text-center shadow-sm sm:min-h-24 sm:p-3"
          key={stat.value}
        >
          <Image
            className={`${stat.iconClass} mb-1 object-contain`}
            width={24}
            height={24}
            src={stat.icon}
            alt={`${stat.value} statistic icon`}
          />
          <strong className="text-base font-semibold leading-5 tracking-tight text-altalaya-text sm:text-lg sm:leading-6">
            {stat.value}
          </strong>
          <span className="font-mono text-[10px] leading-3 text-altalaya-muted sm:text-[11px] sm:leading-4">
            {stat.label.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </span>
        </article>
      ))}
    </div>
  );
}
