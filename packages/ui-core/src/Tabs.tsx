import type { ReactNode } from "react";
import { classNames } from "./classNames";

type TabItem = {
  id: string;
  label: ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  items: readonly TabItem[];
  activeId: string;
  label: string;
  onChange: (id: string) => void;
  className?: string;
};

const Tabs = ({ items, activeId, label, onChange, className }: TabsProps) => (
  <div role="tablist" aria-label={label} className={classNames("flex gap-1 border-b border-neutral-200", className)}>
    {items.map((item) => {
      const active = item.id === activeId;

      return (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={active}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
          className={classNames(
            "relative h-[var(--size-btn-md)] px-4 text-sm font-semibold transition focus:outline-none focus-visible:shadow-focus",
            active ? "text-brand-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand-primary" : "text-neutral-500 hover:text-neutral-900",
            item.disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {item.label}
        </button>
      );
    })}
  </div>
);

Tabs.displayName = "Tabs";

export { Tabs };
export type { TabItem, TabsProps };
