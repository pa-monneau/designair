import type { HTMLAttributes, ReactNode } from "react";
import { StarIcon } from "./icons";
import { classNames } from "./classNames";

type RatingBadgeSize = "sm" | "md";

type RatingBadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** Texte déjà formaté par l'appelant (ex. "4,8 (12 avis)" ou juste "4,8"). */
  label: ReactNode;
  size?: RatingBadgeSize;
};

const sizeClasses: Record<RatingBadgeSize, { icon: string; text: string }> = {
  sm: { icon: "size-3.5", text: "text-[13px]" },
  md: { icon: "size-5", text: "text-base" },
};

/**
 * Étoile + note (ex. "4,8 (12)"), en ligne. Distinct de `RatingStars` (rangée
 * de 5 étoiles) : ce badge affiche une seule étoile à côté du texte, le
 * pattern réellement utilisé sur les cards/fiches studio Record'air.
 */
const RatingBadge = ({ label, size = "sm", className, ...rest }: RatingBadgeProps) => {
  const { icon, text } = sizeClasses[size];
  return (
    <span
      className={classNames("inline-flex items-center gap-1 font-semibold text-neutral-700", text, className)}
      {...rest}
    >
      <StarIcon aria-hidden className={classNames(icon, "shrink-0 text-star")} />
      {label}
    </span>
  );
};

RatingBadge.displayName = "RatingBadge";

export { RatingBadge };
export type { RatingBadgeProps, RatingBadgeSize };
