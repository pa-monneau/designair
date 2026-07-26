import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type IconBoxTone = "neutral" | "brand" | "artist" | "studio" | "pro" | "success";
type IconBoxSize = "sm" | "md" | "lg";

type IconBoxProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: IconBoxTone;
  size?: IconBoxSize;
  icon: ReactNode;
  pill?: boolean;
};

const toneClasses: Record<IconBoxTone, string> = {
  neutral: "bg-neutral-100 text-neutral-700",
  brand: "bg-gradient-to-br from-brand-gradient-from to-brand-gradient-to text-neutral-0",
  artist: "bg-gradient-to-br from-role-artist-from to-role-artist-to text-neutral-0",
  studio: "bg-gradient-to-br from-role-studio-from to-role-studio-to text-neutral-0",
  pro: "bg-gradient-to-br from-role-pro-from to-role-pro-to text-neutral-0",
  success: "bg-success-bg text-success-text",
};

const sizeClasses: Record<IconBoxSize, string> = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-5",
  lg: "size-[var(--size-role-icon-box)] [&_svg]:size-10",
};

const IconBox = ({ tone = "neutral", size = "md", icon, pill = false, className, ...rest }: IconBoxProps) => (
  <span
    aria-hidden
    className={classNames(
      "grid shrink-0 place-items-center",
      pill ? "rounded-full" : "rounded-md",
      toneClasses[tone],
      sizeClasses[size],
      className,
    )}
    {...rest}
  >
    {icon}
  </span>
);

IconBox.displayName = "IconBox";

export { IconBox };
export type { IconBoxProps, IconBoxSize, IconBoxTone };
