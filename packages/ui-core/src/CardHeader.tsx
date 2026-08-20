import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardHeaderProps = HTMLAttributes<HTMLElement> & {
  divided?: boolean;
  layout?: "stack" | "row";
};

const CardHeader = ({
  divided = false,
  layout = "stack",
  className,
  ...rest
}: CardHeaderProps) => (
  // <div> plutôt que <header> : un <header> hors d'un élément sectionnant
  // (Card rend un <div> par défaut) devient un landmark banner implicite —
  // plusieurs CardHeader sur une page produisaient des banners dupliqués.
  <div
    className={classNames(
      "flex items-start px-6 py-5",
      layout === "stack" ? "flex-col gap-1" : "flex-row justify-between gap-4",
      divided && "border-b border-neutral-200",
      className,
    )}
    {...rest}
  />
);

CardHeader.displayName = "CardHeader";

export { CardHeader };
export type { CardHeaderProps };
