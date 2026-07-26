import type { ReactNode } from "react";

type FormRowProps = {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
  last?: boolean;
};

const FormRow = ({
  label,
  hint,
  error,
  htmlFor,
  children,
  last = false,
}: FormRowProps) => (
  <div
    className={[
      "flex flex-col gap-2 px-8 py-6 lg:flex-row lg:items-start lg:gap-8",
      last ? "" : "border-b border-neutral-200",
    ].join(" ")}
  >
    <div className="flex w-full flex-col lg:w-[var(--size-form-label)] lg:shrink-0">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-neutral-900">
        {label}
      </label>
      {hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
    </div>
    <div className="flex w-full flex-1 flex-col gap-2">
      {children}
      {error ? (
        <p className="text-xs text-error-text" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  </div>
);

FormRow.displayName = "FormRow";

export { FormRow };
export type { FormRowProps };
