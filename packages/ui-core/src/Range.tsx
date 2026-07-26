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
    <span className="relative flex h-9 w-full items-center" style={style}>
      <span aria-hidden className="absolute h-1.5 w-full rounded-full bg-line-subtle" />
      <span
        aria-hidden
        className="absolute h-1.5 rounded-full bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to transition-[width] duration-150"
        style={{ width: "var(--range-progress)" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={normalizedValue}
        className={classNames(
          "relative h-full w-full cursor-pointer appearance-none bg-transparent focus:outline-none",
          "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
          "[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-surface-elevated [&::-webkit-slider-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:shadow-brand [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
          "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-surface-elevated [&::-moz-range-thumb]:bg-brand-primary [&::-moz-range-thumb]:shadow-brand [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150",
          "[&:hover::-webkit-slider-thumb]:scale-110 [&:hover::-moz-range-thumb]:scale-110",
          "[&:active::-webkit-slider-thumb]:scale-95 [&:active::-moz-range-thumb]:scale-95",
          "[&:focus-visible::-webkit-slider-thumb]:shadow-focus [&:focus-visible::-moz-range-thumb]:shadow-focus",
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
