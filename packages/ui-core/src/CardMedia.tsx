import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type CardMediaRatio = "landscape" | "square" | "wide";

type CardMediaProps = HTMLAttributes<HTMLDivElement> & {
  ratio?: CardMediaRatio;
};

const ratioClasses: Record<CardMediaRatio, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-video",
};

const CardMedia = ({
  ratio = "landscape",
  className,
  ...rest
}: CardMediaProps) => (
  <div
    className={classNames("relative overflow-hidden", ratioClasses[ratio], className)}
    {...rest}
  />
);

CardMedia.displayName = "CardMedia";

export { CardMedia };
export type { CardMediaProps, CardMediaRatio };
