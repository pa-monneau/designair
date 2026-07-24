import type { ElementType, ReactNode } from "react";
import { classNames } from "./classNames";

type NavigationListTone = "brand" | "inverted" | "neutral";

type NavigationListItem = {
  href: string;
  label: ReactNode;
  badge?: ReactNode;
  leadingIcon?: ReactNode;
  exact?: boolean;
};

type NavigationListProps = {
  items: readonly NavigationListItem[];
  activeHref?: string;
  label: string;
  tone?: NavigationListTone;
  /**
   * Composant de lien à utiliser à la place de `<a>` (ex. le `Link`
   * localisé d'un routeur applicatif). Même convention que `RecordairLogo`.
   */
  as?: ElementType;
  /** Rail icône seule (label masqué, tooltip natif via `title`) au lieu de icône + label. */
  collapsed?: boolean;
  className?: string;
};

const activeClasses: Record<NavigationListTone, string> = {
  brand: "bg-role-studio-bg text-role-studio-text",
  inverted: "bg-surface-inverted text-neutral-0",
  neutral: "bg-selected-tint text-selected-fg",
};

const inactiveClasses: Record<NavigationListTone, string> = {
  brand: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
  inverted: "text-neutral-300 hover:bg-neutral-0/10 hover:text-neutral-0",
  neutral: "text-fg-secondary hover:bg-line-subtle hover:text-fg-primary",
};

const NavigationList = ({
  items,
  activeHref,
  label,
  tone = "brand",
  as: LinkComponent = "a",
  collapsed = false,
  className,
}: NavigationListProps) => (
  <nav aria-label={label} className={classNames("flex flex-col gap-1", className)}>
    {items.map((item) => {
      const target = item.href.split("#")[0]?.split("?")[0] || "/";
      const active = Boolean(
        activeHref
        && !item.href.includes("#")
        && (item.exact || target === "/"
          ? activeHref === target
          : activeHref === target || activeHref.startsWith(`${target}/`)),
      );

      return (
        <LinkComponent
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          title={collapsed && typeof item.label === "string" ? item.label : undefined}
          className={classNames(
            "flex items-center gap-3 rounded-lg py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:shadow-focus",
            collapsed ? "justify-center px-3" : "px-4",
            active
              ? activeClasses[tone]
              : inactiveClasses[tone],
          )}
        >
          {item.leadingIcon ? <span aria-hidden className="shrink-0">{item.leadingIcon}</span> : null}
          {collapsed ? null : <span className="flex-1">{item.label}</span>}
          {!collapsed && item.badge ? (
            <span className="grid min-w-[var(--size-nav-badge-min)] place-items-center rounded-full bg-error px-2 py-0.5 text-overline font-bold text-neutral-0">
              {item.badge}
            </span>
          ) : null}
        </LinkComponent>
      );
    })}
  </nav>
);

export { NavigationList };
export type { NavigationListItem, NavigationListProps, NavigationListTone };
