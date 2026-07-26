import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
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

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-label font-medium text-fg-secondary">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
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

export { Field };
export type { FieldProps };
