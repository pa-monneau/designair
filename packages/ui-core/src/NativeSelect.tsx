import type { SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "./icons";
import { classNames } from "./classNames";

type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

const NativeSelect = ({
  invalid = false,
  className,
  children,
  ...rest
}: NativeSelectProps) => (
  <span className="relative block w-full">
    <select
      aria-invalid={invalid || undefined}
      className={classNames(
        "h-[var(--size-btn-md)] w-full appearance-none rounded-md border-control bg-surface-elevated px-4 pr-10 text-sm text-fg-primary",
        "focus:outline-none focus:shadow-focus",
        "disabled:bg-surface-page disabled:text-fg-tertiary",
        invalid
          ? "border-error focus:border-error"
          : "border-line focus:border-brand-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
    <ChevronDownIcon
      aria-hidden
      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-tertiary"
    />
  </span>
);

export { NativeSelect };
export type { NativeSelectProps };
