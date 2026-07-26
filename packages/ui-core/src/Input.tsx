import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid = false, leadingIcon, trailingIcon, className, ...rest },
  ref,
) {
  const input = (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={classNames(
        "h-[var(--size-btn-md)] w-full rounded-md border-control bg-surface-elevated px-4 text-sm text-fg-primary placeholder:text-fg-tertiary",
        "focus:outline-none focus:shadow-focus",
        "disabled:bg-surface-page disabled:text-fg-tertiary",
        Boolean(leadingIcon) && "pl-11",
        Boolean(trailingIcon) && "pr-11",
        invalid
          ? "border-error focus:border-error"
          : "border-line focus:border-brand-primary",
        className,
      )}
      {...rest}
    />
  );

  if (!leadingIcon && !trailingIcon) {
    return input;
  }

  return (
    <span className="relative block w-full">
      {leadingIcon ? (
        <span className="pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-fg-tertiary">
          {leadingIcon}
        </span>
      ) : null}
      {input}
      {trailingIcon ? (
        <span className="absolute inset-y-0 right-4 grid place-items-center text-fg-secondary">
          {trailingIcon}
        </span>
      ) : null}
    </span>
  );
});

Input.displayName = "Input";

export { Input };
export type { InputProps };
