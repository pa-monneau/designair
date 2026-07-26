type SummaryLineProps = {
  label: string;
  value: string;
  className?: string;
};

const SummaryLine = ({ label, value, className }: SummaryLineProps) => (
  <div className={["flex items-center justify-between", className].filter(Boolean).join(" ")}>
    <span className="text-sm text-neutral-500">{label}</span>
    <span className="text-sm font-semibold text-neutral-900">{value}</span>
  </div>
);

SummaryLine.displayName = "SummaryLine";

export { SummaryLine };
export type { SummaryLineProps };
