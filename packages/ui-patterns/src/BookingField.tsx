import type { ReactNode } from "react";

type BookingFieldProps = {
  label: string;
  children: ReactNode;
};

const BookingField = ({ label, children }: BookingFieldProps) => (
  <fieldset className="flex flex-col gap-3">
    <legend className="text-overline font-bold uppercase tracking-wide text-neutral-500">
      {label}
    </legend>
    <div className="flex flex-wrap gap-2">{children}</div>
  </fieldset>
);

BookingField.displayName = "BookingField";

export { BookingField };
export type { BookingFieldProps };
