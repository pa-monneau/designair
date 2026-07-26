"use client";

import { useId, useState } from "react";
import type { ChangeEventHandler } from "react";
import { classNames } from "./classNames";

type ToggleProps = {
  name?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  ariaLabel: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Toggle = ({
  name,
  defaultChecked = false,
  checked,
  ariaLabel,
  disabled = false,
  onChange,
}: ToggleProps) => {
  const id = useId();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    onChange?.(event);
  };

  return (
    <label
      htmlFor={id}
      className={classNames(
        "relative inline-flex h-[var(--size-toggle-track-height)] w-[var(--size-toggle-track-width)] shrink-0 items-center rounded-full transition-colors focus-within:shadow-focus",
        isChecked ? "bg-brand-primary" : "bg-line",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      )}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        defaultChecked={isControlled ? undefined : defaultChecked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={handleChange}
        className="sr-only"
      />
      <span
        aria-hidden
        className={classNames(
          "inline-block size-[var(--size-toggle-thumb)] transform rounded-full bg-surface-elevated shadow-sm transition-transform",
          isChecked
            ? "translate-x-[var(--spacing-toggle-on)]"
            : "translate-x-[var(--spacing-toggle-off)]",
        )}
      />
    </label>
  );
};

Toggle.displayName = "Toggle";

export { Toggle };
export type { ToggleProps };
