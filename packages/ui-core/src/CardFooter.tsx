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
  // <div> plutôt que <footer> : même risque de landmark contentinfo
  // dupliqué que CardHeader (cf. son commentaire) dès que 2 CardFooter
  // coexistent hors élément sectionnant.
  <div
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
