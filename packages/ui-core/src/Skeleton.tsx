import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: "line" | "rectangle" | "circle";
};

const Skeleton = ({ shape = "line", className, ...rest }: SkeletonProps) => (
  <div
    aria-hidden
    className={classNames(
      "animate-pulse bg-neutral-200",
      shape === "line" && "h-4 rounded-full",
      shape === "rectangle" && "h-24 rounded-md",
      shape === "circle" && "size-[var(--size-avatar-md)] rounded-full",
      className,
    )}
    {...rest}
  />
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonProps };
