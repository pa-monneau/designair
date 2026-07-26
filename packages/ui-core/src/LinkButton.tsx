import type { AnchorHTMLAttributes, ElementType, ReactNode } from "react";
import { buttonClassName } from "./buttonStyles";
import type { ButtonShape, ButtonSize, ButtonVariant } from "./buttonStyles";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: ElementType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  block?: boolean;
};

const LinkButton = ({
  as: LinkComponent = "a",
  variant = "primary",
  size = "md",
  shape = "default",
  leadingIcon,
  trailingIcon,
  block = false,
  className,
  children,
  ...rest
}: LinkButtonProps) => (
  <LinkComponent
    className={buttonClassName({ variant, size, shape, block, className })}
    {...rest}
  >
    {leadingIcon}
    {children}
    {trailingIcon}
  </LinkComponent>
);

LinkButton.displayName = "LinkButton";

export { LinkButton };
export type { LinkButtonProps };
