import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type BadgeTone = "neutral" | "brand" | "success" | "error" | "warning" | "info";
type BadgeSize = "xs" | "sm" | "md";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: ReactNode;
  dot?: boolean;
  pill?: boolean;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-line-subtle text-fg-secondary",
  brand: "bg-role-studio-bg text-role-studio-text",
  success: "bg-success-bg text-success-text",
  error: "bg-error-bg text-error-text",
  warning: "bg-warning-bg text-warning-text",
  info: "bg-info-bg text-info-text",
};

const sizeClasses: Record<BadgeSize, string> = {
  // Pastille de statut compacte (ex. réservation confirmée/en attente).
  xs: "gap-1 px-2.5 py-1 text-[10px] uppercase",
  sm: "gap-1 px-2 py-0.5 text-xs",
  md: "gap-2 px-3 py-1 text-label",
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: "bg-neutral-500",
  brand: "bg-brand-primary",
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
};

const Badge = ({
  tone = "neutral",
  size = "sm",
  icon,
  dot = false,
  pill = true,
  className,
  children,
  ...rest
}: BadgeProps) => (
  <span
    className={classNames(
      "inline-flex w-fit items-center font-semibold tracking-wide",
      pill ? "rounded-full" : "rounded-sm",
      toneClasses[tone],
      sizeClasses[size],
      className,
    )}
    {...rest}
  >
    {dot ? <span aria-hidden className={classNames("size-1.5 rounded-full", dotClasses[tone])} /> : null}
    {icon}
    {children}
  </span>
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps, BadgeSize, BadgeTone };
