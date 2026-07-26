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
      selected ? "border-brand-primary bg-role-studio-bg text-role-studio-text" : "border-neutral-200 bg-neutral-0 text-neutral-700 hover:bg-neutral-100",
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
