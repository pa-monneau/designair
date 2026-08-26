import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";
import { Input } from "./Input";
import type { InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "type" | "trailingIcon"> & {
  /** Libellé accessible du bouton quand le mot de passe est masqué (action proposée : l'afficher). */
  showLabel: string;
  /** Libellé accessible du bouton quand le mot de passe est visible (action proposée : le masquer). */
  hideLabel: string;
};

/**
 * `Input` de mot de passe avec bascule afficher/masquer intégrée. Les
 * libellés du bouton sont des props, jamais codés en dur, pour rester
 * traduisibles par l'app consommatrice (FR/EN).
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ showLabel, hideLabel, ...rest }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        trailingIcon={
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? hideLabel : showLabel}
            className="-m-1 rounded p-1 text-fg-secondary transition hover:text-fg-primary focus-visible:outline-none focus-visible:shadow-focus"
          >
            {visible ? (
              <EyeOffIcon aria-hidden className="size-4" />
            ) : (
              <EyeIcon aria-hidden className="size-4" />
            )}
          </button>
        }
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
export type { PasswordInputProps };
