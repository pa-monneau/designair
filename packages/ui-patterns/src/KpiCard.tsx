type KpiCardProps = {
  label: string;
  value: string;
  supportingText?: string;
  href?: string;
  supportingTone?: "neutral" | "success" | "error" | "warning";
};

const toneClasses: Record<NonNullable<KpiCardProps["supportingTone"]>, string> = {
  neutral: "text-neutral-500",
  success: "text-success-text",
  error: "text-error-text",
  warning: "text-warning-text",
};

const KpiCard = ({
  label,
  value,
  supportingText,
  href,
  supportingTone = "neutral",
}: KpiCardProps) => {
  const body = (
    <Card variant={href ? "interactive" : "default"} padding="md" className="flex flex-1 flex-col gap-2">
      <span className="text-label font-medium text-neutral-500">{label}</span>
      <span className="text-heading-lg font-bold leading-none text-neutral-900">{value}</span>
      {supportingText ? (
        <span className={`text-label font-semibold ${toneClasses[supportingTone]}`}>
          {supportingText}
        </span>
      ) : null}
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="flex flex-1">
        {body}
      </a>
    );
  }

  return body;
};

KpiCard.displayName = "KpiCard";

export { KpiCard };
export type { KpiCardProps };
import { Card } from "@recordair/ui-core";
