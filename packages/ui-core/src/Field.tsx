import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
};

/** Fusionne l'id de description du champ avec un `aria-describedby` déjà porté par l'enfant, sans doublon de token. */
const mergeDescribedBy = (
  descriptionId: string,
  existing: unknown,
): string => {
  const tokens =
    typeof existing === "string"
      ? existing.split(/\s+/).filter(Boolean)
      : [];

  return [...new Set([descriptionId, ...tokens])].join(" ");
};

const Field = ({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
}: FieldProps) => {
  const descriptionId = error || hint ? `${htmlFor}-description` : undefined;

  // Rattache le message (erreur ou hint) au champ pour l'AT : `Field` rend
  // `children` brut, donc c'est ici que se pose `aria-describedby`. En
  // présence d'une erreur, `aria-invalid` est forcé — le champ est signalé
  // même si l'appelant a oublié de passer `invalid`.
  const describedChild =
    descriptionId && isValidElement(children)
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-describedby": mergeDescribedBy(
            descriptionId,
            (children.props as Record<string, unknown>)["aria-describedby"],
          ),
          ...(error ? { "aria-invalid": true } : {}),
        })
      : children;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-label font-medium text-fg-secondary">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {describedChild}
      {error ? (
        <p id={descriptionId} className="text-xs text-error-text" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={descriptionId} className="text-xs text-fg-tertiary">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

Field.displayName = "Field";

export { Field };
export type { FieldProps };
