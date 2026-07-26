import type { CSSProperties, InputHTMLAttributes } from "react";
import { classNames } from "./classNames";

type RangeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "max" | "min" | "style" | "type" | "value"
> & {
  max?: number;
  min?: number;
  value: number;
};

const Range = ({
  className,
  max = 100,
  min = 0,
  value,
  ...rest
}: RangeProps) => {
  const normalizedValue = Math.min(max, Math.max(min, value));
  const interval = max - min;
  const progress = interval === 0 ? 0 : ((normalizedValue - min) / interval) * 100;
  const style = { "--range-progress": `${progress}%` } as CSSProperties;

  return (
    <span className="relative flex h-8 w-full items-center" style={style}>
      <span aria-hidden className="absolute h-2 w-full rounded-full bg-line" />
      <span
        aria-hidden
        className="absolute h-2 rounded-full bg-brand-primary"
        style={{ width: "var(--range-progress)" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={normalizedValue}
        className={classNames(
          "relative h-full w-full cursor-pointer appearance-none bg-transparent focus:outline-none focus-visible:rounded-full focus-visible:shadow-focus",
          "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
          "[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface-elevated [&::-webkit-slider-thumb]:bg-brand-primary",
          "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface-elevated [&::-moz-range-thumb]:bg-brand-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...rest}
      />
    </span>
  );
};

export { Range };
export type { RangeProps };
