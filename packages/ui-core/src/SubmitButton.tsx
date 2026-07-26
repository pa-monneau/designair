"use client";

import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

type SubmitButtonProps = Omit<ButtonProps, "type" | "loading"> & {
  pendingLabel?: ReactNode;
  nativeProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;
};

const SubmitButton = ({
  children,
  pendingLabel,
  disabled,
  nativeProps,
  ...rest
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      loading={pending}
      disabled={disabled || pending}
      {...nativeProps}
      {...rest}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </Button>
  );
};

SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
export type { SubmitButtonProps };
