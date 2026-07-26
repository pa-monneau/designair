type StatusTone = "neutral" | "success" | "error" | "warning" | "info";

type StatusPillProps = {
  label: string;
  tone?: StatusTone;
};

const StatusPill = ({ label, tone = "neutral" }: StatusPillProps) => (
  <Badge tone={tone}>{label}</Badge>
);

StatusPill.displayName = "StatusPill";

export { StatusPill };
export type { StatusPillProps, StatusTone };
import { Badge } from "@recordair/ui-core";
