import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

const EmptyState = ({ icon, title, description, action, className, ...rest }: EmptyStateProps) => (
  <div className={classNames("flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-surface-elevated p-8 text-center", className)} {...rest}>
    {icon}
    <div className="flex flex-col gap-1">
      <h3 className="text-heading-sm font-semibold text-fg-primary">{title}</h3>
      {description ? <p className="max-w-md text-sm text-fg-secondary">{description}</p> : null}
    </div>
    {action}
  </div>
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
export type { EmptyStateProps };
