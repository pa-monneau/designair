import type { HTMLAttributes, ReactNode } from "react";

type MetricProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: ReactNode;
  supportingText?: string;
};

const Metric = ({ label, value, supportingText, className, ...rest }: MetricProps) => (
  <div className={["flex flex-col gap-1", className].filter(Boolean).join(" ")} {...rest}>
    <span className="text-overline font-semibold uppercase tracking-wide text-neutral-500">{label}</span>
    <strong className="text-body font-bold text-neutral-900">{value}</strong>
    {supportingText ? <span className="text-caption text-neutral-500">{supportingText}</span> : null}
  </div>
);

Metric.displayName = "Metric";

export { Metric };
export type { MetricProps };
