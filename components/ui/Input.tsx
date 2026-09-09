import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({
  autoComplete,
  className = "",
  id,
  label,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-altalaya-muted"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`h-11 w-full rounded-2xl border border-altalaya-border bg-altalaya-glass-strong px-4 text-[15px] text-altalaya-text outline-none transition-all placeholder:text-altalaya-muted/60 focus:border-altalaya-accent focus:ring-2 focus:ring-altalaya-accent/20 ${className}`}
        id={id}
        autoComplete={autoComplete}
        {...props}
      />
    </div>
  );
}
