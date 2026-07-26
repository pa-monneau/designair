import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "none" | "sm" | "md" | "lg";
};

const paddingClasses: Record<NonNullable<CardContentProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const CardContent = ({
  padding = "md",
  className,
  ...rest
}: CardContentProps) => (
  <div className={classNames(paddingClasses[padding], className)} {...rest} />
);

CardContent.displayName = "CardContent";

export { CardContent };
export type { CardContentProps };
