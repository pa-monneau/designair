import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  description?: ReactNode;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={classNames("flex items-start gap-3", disabled && "cursor-not-allowed opacity-60", className)}>
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        className="mt-0.5 size-4 accent-brand-primary focus:outline-none focus:shadow-focus"
        {...rest}
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-fg-primary">{label}</span>
        {description ? <span className="text-label text-fg-tertiary">{description}</span> : null}
      </span>
    </label>
  );
});

export { Radio };
export type { RadioProps };
