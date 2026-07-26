import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 2 | 3 | 4;
};

const CardTitle = ({ level = 3, className, ...rest }: CardTitleProps) => {
  const Element: "h2" | "h3" | "h4" =
    level === 2 ? "h2" : level === 3 ? "h3" : "h4";

  return (
    <Element
      className={classNames("text-heading-sm font-semibold text-neutral-900", className)}
      {...rest}
    />
  );
};

CardTitle.displayName = "CardTitle";

export { CardTitle };
export type { CardTitleProps };
