import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  alt?: string;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-[var(--size-avatar-sm)] text-xs",
  md: "size-[var(--size-avatar-md)] text-sm",
  lg: "size-[var(--size-avatar-lg)] text-base",
  xl: "size-[var(--size-avatar-xl)] text-xl",
};

const Avatar = ({ name, src, size = "md", alt = "", className, ...rest }: AvatarProps) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");

  return (
    <span
      className={classNames(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-gradient-from to-brand-gradient-to font-semibold text-neutral-0",
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {src ? <img src={src} alt={alt} loading="lazy" className="size-full object-cover" /> : <span aria-hidden>{initials}</span>}
    </span>
  );
};

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarProps, AvatarSize };
