import type { ReactNode } from "react";
import { classNames } from "./classNames";

type LinkTabItem = {
  href: string;
  label: ReactNode;
  count?: number;
  disabled?: boolean;
};

type LinkTabsProps = {
  items: readonly LinkTabItem[];
  activeHref: string;
  label: string;
  className?: string;
};

const LinkTabs = ({ items, activeHref, label, className }: LinkTabsProps) => (
  <nav aria-label={label} className={classNames("flex gap-1 border-b border-neutral-200", className)}>
    {items.map((item) => {
      const active = activeHref === item.href || activeHref.startsWith(`${item.href}/`);

      return (
        <a
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          aria-disabled={item.disabled || undefined}
          onClick={item.disabled ? (event) => event.preventDefault() : undefined}
          className={classNames(
            "-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:shadow-focus",
            active
              ? "border-brand-primary text-neutral-900"
              : "border-transparent text-neutral-500 hover:text-neutral-900",
            item.disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {item.label}
          {item.count !== undefined ? (
            <span
              className={classNames(
                "grid min-w-[var(--size-nav-badge-min)] place-items-center rounded-full px-2 py-0.5 text-overline font-bold",
                active ? "bg-brand-primary text-neutral-0" : "bg-neutral-200 text-neutral-600",
              )}
            >
              {item.count}
            </span>
          ) : null}
        </a>
      );
    })}
  </nav>
);

LinkTabs.displayName = "LinkTabs";

export { LinkTabs };
export type { LinkTabItem, LinkTabsProps };
