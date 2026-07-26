import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  label: string;
};

const Progress = ({ value, label, className, ...rest }: ProgressProps) => {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedValue}
      className={classNames("h-2 overflow-hidden rounded-full bg-neutral-200", className)}
      {...rest}
    >
      <span className="block h-full rounded-full bg-brand-primary transition-[width]" style={{ width: `${normalizedValue}%` }} />
    </div>
  );
};

Progress.displayName = "Progress";

export { Progress };
export type { ProgressProps };
