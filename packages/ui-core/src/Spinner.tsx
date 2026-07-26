import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type SpinnerSize = "sm" | "md" | "lg";

type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  label: string;
  size?: SpinnerSize;
};

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-5 border-2",
  lg: "size-8 border-3",
};

const Spinner = ({ label, size = "md", className, ...rest }: SpinnerProps) => (
  <span role="status" aria-label={label} className={classNames("inline-block animate-spin rounded-full border-neutral-200 border-t-brand-primary", sizeClasses[size], className)} {...rest} />
);

Spinner.displayName = "Spinner";

export { Spinner };
export type { SpinnerProps, SpinnerSize };
