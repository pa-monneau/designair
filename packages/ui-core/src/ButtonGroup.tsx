import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center" | "end" | "stretch";
};

const alignClasses: Record<NonNullable<ButtonGroupProps["align"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>*]:flex-1",
};

const ButtonGroup = ({
  align = "start",
  className,
  ...rest
}: ButtonGroupProps) => (
  <div
    role="group"
    className={classNames("flex flex-wrap items-center gap-3", alignClasses[align], className)}
    {...rest}
  />
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
export type { ButtonGroupProps };
