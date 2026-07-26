import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const CardDescription = ({ className, ...rest }: CardDescriptionProps) => (
  <p className={classNames("text-label text-neutral-500", className)} {...rest} />
);

CardDescription.displayName = "CardDescription";

export { CardDescription };
export type { CardDescriptionProps };
