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
  const progress = interval === 0 ? 0 : (normalizedValue - min) / interval;
  // Le thumb d'un <input type="range"> ne peut pas visuellement atteindre les
  // bords du champ : son centre est borné à [thumbRadius, largeur-thumbRadius].
  // On applique le même retrait (moitié de size-6 = 12px) à la piste visuelle
  // pour que ses extrémités tombent exactement sous les positions min/max
  // réellement atteignables par le curseur.
  const style = {
    "--range-progress-fraction": progress,
  } as CSSProperties;

  return (
    <span className="relative h-9 w-full" style={style}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-3 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-line-subtle"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to transition-[width] duration-150"
        style={{
          width: "calc((100% - 24px) * var(--range-progress-fraction))",
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={normalizedValue}
        className={classNames(
          "absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent focus:outline-none",
          "[&::-webkit-slider-runnable-track]:h-6 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-moz-range-track]:h-6 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
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
