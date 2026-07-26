import type { HTMLAttributes, ReactNode } from "react";
import { CircleHelpIcon, CheckIcon, TriangleAlertIcon, XIcon } from "./icons";
import { classNames } from "./classNames";

type AlertTone = "info" | "success" | "warning" | "error";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone;
  title: string;
  icon?: ReactNode;
};

const toneClasses: Record<AlertTone, string> = {
  info: "border-info-border bg-info-bg text-info-text",
  success: "border-success-border bg-success-bg text-success-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  error: "border-error-border bg-error-bg text-error-text",
};

const toneIcons: Record<AlertTone, ReactNode> = {
  info: <CircleHelpIcon aria-hidden className="size-5" />,
  success: <CheckIcon aria-hidden className="size-5" />,
  warning: <TriangleAlertIcon aria-hidden className="size-5" />,
  error: <XIcon aria-hidden className="size-5" />,
};

const Alert = ({ tone = "info", title, icon, className, children, ...rest }: AlertProps) => (
  <div role="alert" className={classNames("flex gap-3 rounded-md border p-4", toneClasses[tone], className)} {...rest}>
    <span className="shrink-0">{icon ?? toneIcons[tone]}</span>
    <span className="flex flex-col gap-1">
      <strong className="text-sm font-semibold">{title}</strong>
      {children ? <span className="text-label leading-5">{children}</span> : null}
    </span>
  </div>
);

Alert.displayName = "Alert";

export { Alert };
export type { AlertProps, AlertTone };
