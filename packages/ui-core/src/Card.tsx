import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardElement = "div" | "article" | "section";
type CardVariant = "default" | "flat" | "elevated" | "interactive";
type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: CardElement;
  variant?: CardVariant;
  padding?: CardPadding;
};

const variantClasses: Record<CardVariant, string> = {
  default: "border border-neutral-200 bg-neutral-0",
  flat: "border border-transparent bg-neutral-50",
  elevated: "border border-neutral-200 bg-neutral-0 shadow-elevated",
  interactive:
    "border border-neutral-200 bg-neutral-0 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-elevated",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = ({
  as = "div",
  variant = "default",
  padding = "none",
  className,
  ...rest
}: CardProps) => {
  const Element = as;

  return (
    <Element
      className={classNames(
        "flex flex-col overflow-hidden rounded-lg",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...rest}
    />
  );
};

Card.displayName = "Card";

export { Card };
export type { CardElement, CardPadding, CardProps, CardVariant };
