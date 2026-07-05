import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "ghost" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ember disabled:bg-steel/35",
  secondary: "bg-paper text-ink hover:bg-white",
  ghost: "bg-transparent text-ink hover:bg-ink/6"
};

export function Button({
  children,
  className,
  icon,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
