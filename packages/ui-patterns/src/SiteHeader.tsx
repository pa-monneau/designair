import type { HTMLAttributes, ReactNode } from "react";

type SiteHeaderProps = HTMLAttributes<HTMLElement> & {
  brand: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  sticky?: boolean;
  contained?: boolean;
};

const SiteHeader = ({
  brand,
  navigation,
  actions,
  sticky = true,
  contained = false,
  className,
  ...rest
}: SiteHeaderProps) => (
  <header
    className={[
      "z-40 border-b border-neutral-200 bg-neutral-0/90 backdrop-blur",
      sticky ? "sticky top-0" : "relative",
      className,
    ].filter(Boolean).join(" ")}
    {...rest}
  >
    <div className={[
      "mx-auto flex items-center justify-between gap-6 px-5 py-4 sm:px-8",
      contained ? "max-w-site" : "w-full",
    ].join(" ")}>
      <div className="shrink-0">{brand}</div>
      {navigation ? <div className="hidden flex-1 justify-center md:flex">{navigation}</div> : null}
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  </header>
);

SiteHeader.displayName = "SiteHeader";

export { SiteHeader };
export type { SiteHeaderProps };
