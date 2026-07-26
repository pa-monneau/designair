import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClassName } from "./buttonStyles";
import type { ButtonShape, ButtonSize, ButtonVariant } from "./buttonStyles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  block?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    shape = "default",
    leadingIcon,
    trailingIcon,
    loading = false,
    loadingLabel = "Chargement",
    block = false,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClassName({ variant, size, shape, block, className })}
      {...rest}
    >
      {loading ? (
        <span
          aria-label={loadingLabel}
          className="inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        leadingIcon
      )}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
export type { ButtonShape, ButtonSize, ButtonVariant } from "./buttonStyles";
