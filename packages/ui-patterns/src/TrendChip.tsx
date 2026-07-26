import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "@recordair/ui-core/icons";
import { Badge, type BadgeTone } from "@recordair/ui-core";

type TrendDirection = "up" | "down" | "neutral";

type TrendChipProps = {
  direction: TrendDirection;
  value: string;
  accessibleLabel?: string;
  /**
   * Surcharge le ton par défaut associé à `direction` (ex. une baisse jugée
   * attendue/non critique peut rester en `warning` plutôt que `error`).
   */
  tone?: BadgeTone;
};

const defaultTones: Record<TrendDirection, "success" | "error" | "neutral"> = {
  up: "success",
  down: "error",
  neutral: "neutral",
};

const directionIcons = {
  up: ArrowUpIcon,
  down: ArrowDownIcon,
  neutral: ArrowRightIcon,
};

const TrendChip = ({
  direction,
  value,
  accessibleLabel,
  tone,
}: TrendChipProps) => {
  const Icon = directionIcons[direction];

  return (
    <Badge
      aria-label={accessibleLabel}
      tone={tone ?? defaultTones[direction]}
      icon={<Icon aria-hidden className="size-3" />}
    >
      {value}
    </Badge>
  );
};

TrendChip.displayName = "TrendChip";

export { TrendChip };
export type { TrendChipProps, TrendDirection };
