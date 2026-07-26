import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { classNames } from "./classNames";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, className, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={classNames(
        "min-h-28 w-full resize-y rounded-md border-control bg-surface-elevated px-4 py-3 text-sm text-fg-primary placeholder:text-fg-tertiary",
        "focus:outline-none focus:shadow-focus",
        "disabled:bg-surface-page disabled:text-fg-tertiary",
        invalid ? "border-error focus:border-error" : "border-line focus:border-brand-primary",
        className,
      )}
      {...rest}
    />
  );
});

export { Textarea };
export type { TextareaProps };
