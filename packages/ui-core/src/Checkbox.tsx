import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { classNames } from "./classNames";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  invalid?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { invalid = false, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-invalid={invalid || undefined}
      className={classNames(
        "mt-0.5 size-5 shrink-0 rounded-sm border-control bg-surface-elevated transition",
        "checked:border-brand-primary checked:bg-brand-primary",
        "focus:outline-none focus:shadow-focus",
        invalid ? "border-error" : "border-line",
        className,
      )}
      {...rest}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
