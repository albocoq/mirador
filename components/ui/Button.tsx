import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-altalaya-accent via-[#c68307] to-[#ffb955] text-[#5c2800] shadow-xl shadow-altalaya-accent/20 hover:-translate-y-px hover:brightness-110",
  secondary:
    "bg-altalaya-glass-strong text-altalaya-text backdrop-blur-md hover:-translate-y-px hover:brightness-110",
  ghost:
    "text-altalaya-muted underline decoration-altalaya-muted/40 underline-offset-4 hover:text-altalaya-peach",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  className = "",
  fullWidth = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-semibold transition active:translate-y-0 disabled:cursor-wait disabled:opacity-60 ${fullWidth ? "w-full" : ""} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
