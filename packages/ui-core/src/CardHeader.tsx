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
  <header
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
