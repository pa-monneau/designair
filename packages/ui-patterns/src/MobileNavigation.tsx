import type { ElementType, ReactNode } from "react";
import { NavigationList } from "@recordair/ui-core";
import type { NavigationListItem } from "@recordair/ui-core";
import { MenuIcon } from "@recordair/ui-core/icons";

type MobileNavigationProps = {
  items: readonly NavigationListItem[];
  activeHref?: string;
  label: string;
  footer?: ReactNode;
  hiddenFrom?: "md" | "lg";
  /** Transmis à `NavigationList` (ex. le `Link` localisé d'un routeur). */
  as?: ElementType;
  className?: string;
};

const MobileNavigation = ({
  items,
  activeHref,
  label,
  footer,
  hiddenFrom = "md",
  as,
  className,
}: MobileNavigationProps) => (
  <details
    className={`${hiddenFrom === "lg" ? "lg:hidden" : "md:hidden"} relative [&_summary::-webkit-details-marker]:hidden ${className ?? ""}`}
  >
    <summary
      aria-label={label}
      className="grid size-10 cursor-pointer list-none place-items-center rounded-full text-neutral-700 transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:shadow-focus"
    >
      <MenuIcon aria-hidden className="size-6" />
    </summary>
    <div className="absolute right-0 top-12 z-50 w-[var(--size-mobile-menu)] rounded-lg border border-neutral-200 bg-neutral-0 p-2 shadow-elevated">
      <NavigationList items={items} activeHref={activeHref} label={label} as={as} />
      {footer ? <div className="mt-2 border-t border-neutral-200 px-3 pt-3">{footer}</div> : null}
    </div>
  </details>
);

MobileNavigation.displayName = "MobileNavigation";

export { MobileNavigation };
export type { MobileNavigationProps };
