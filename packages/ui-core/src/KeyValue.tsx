import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type KeyValueProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
};

// Rend une seule paire <dt>/<dd> : à composer, une ou plusieurs instances,
// à l'intérieur d'un <dl> porté par l'appelant (cf. story DataDisplay/KeyValue).
const KeyValue = ({ label, value, className, ...rest }: KeyValueProps) => (
  <div
    className={classNames(
      "flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
      className,
    )}
    {...rest}
  >
    <dt className="text-sm text-neutral-500">{label}</dt>
    <dd className="text-sm font-semibold text-neutral-900 sm:text-right">{value}</dd>
  </div>
);

KeyValue.displayName = "KeyValue";

export { KeyValue };
export type { KeyValueProps };
