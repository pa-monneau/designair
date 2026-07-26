import type { HTMLAttributes } from "react";
import { StarIcon } from "./icons";
import { classNames } from "./classNames";

type RatingStarsSize = "sm" | "md";

type RatingStarsProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  value: number;
  max?: number;
  label?: string;
  size?: RatingStarsSize;
};

const sizeClasses: Record<RatingStarsSize, string> = {
  sm: "size-4",
  md: "size-5",
};

const RatingStars = ({
  value,
  max = 5,
  label = `${value} sur ${max}`,
  size = "sm",
  className,
  ...rest
}: RatingStarsProps) => {
  const normalizedValue = Math.max(0, Math.min(value, max));

  return (
    <div
      role="img"
      aria-label={label}
      className={classNames("flex items-center gap-1", className)}
      {...rest}
    >
      {Array.from({ length: max }).map((_, index) => (
        <StarIcon
          key={index}
          aria-hidden
          className={classNames(
            sizeClasses[size],
            index < normalizedValue ? "fill-star text-star" : "text-neutral-300",
          )}
        />
      ))}
    </div>
  );
};

RatingStars.displayName = "RatingStars";

export { RatingStars };
export type { RatingStarsProps, RatingStarsSize };
