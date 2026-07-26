import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardFooterProps = HTMLAttributes<HTMLElement> & {
  divided?: boolean;
};

const CardFooter = ({
  divided = false,
  className,
  ...rest
}: CardFooterProps) => (
  <footer
    className={classNames(
      "flex items-center gap-3 px-6 py-4",
      divided && "border-t border-neutral-200",
      className,
    )}
    {...rest}
  />
);

CardFooter.displayName = "CardFooter";

export { CardFooter };
export type { CardFooterProps };
