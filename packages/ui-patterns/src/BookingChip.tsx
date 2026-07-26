import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ChoiceChip } from "@recordair/ui-core";

type BookingChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  active: boolean;
  children: ReactNode;
};

const BookingChip = ({ active, disabled, children, ...rest }: BookingChipProps) => (
  <ChoiceChip
    selected={active}
    disabled={disabled}
    className="rounded-md disabled:cursor-not-allowed disabled:border-neutral-100 disabled:bg-neutral-50 disabled:text-neutral-300"
    {...rest}
  >
    {children}
  </ChoiceChip>
);

BookingChip.displayName = "BookingChip";

export { BookingChip };
export type { BookingChipProps };
