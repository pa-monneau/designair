import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type ChoiceChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  icon?: ReactNode;
};

const ChoiceChip = ({ selected = false, icon, className, children, ...rest }: ChoiceChipProps) => (
  <button
    type="button"
    aria-pressed={selected}
    className={classNames(
      "inline-flex h-[var(--size-btn-sm)] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition focus:outline-none focus-visible:shadow-focus",
      selected ? "border-transparent bg-selected-tint text-selected-fg" : "border-line bg-transparent text-fg-secondary hover:bg-line-subtle",
      className,
    )}
    {...rest}
  >
    {icon}
    {children}
  </button>
);

ChoiceChip.displayName = "ChoiceChip";

export { ChoiceChip };
export type { ChoiceChipProps };
