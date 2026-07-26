import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "./classNames";

type PriceTagSize = "sm" | "md" | "lg";

type PriceTagProps = Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
  /** Texte avant le montant (ex. "À partir de"). Omis si absent. */
  prefix?: ReactNode;
  /** Montant déjà formaté par l'appelant (ex. "80€"). */
  amount: ReactNode;
  /** Texte après le montant (ex. "/heure"). Omis si absent. */
  suffix?: ReactNode;
  size?: PriceTagSize;
};

const sizeClasses: Record<PriceTagSize, { text: string; amount: string }> = {
  sm: { text: "text-sm", amount: "text-base" },
  md: { text: "text-[15px]", amount: "text-xl" },
  lg: { text: "text-[15px]", amount: "text-2xl" },
};

/**
 * Ligne de prix "À partir de **80€** /heure" : préfixe + montant en gras +
 * suffixe, sur une seule ligne. Le formatage du montant (devise, arrondi) et
 * la traduction du préfixe/suffixe restent à la charge de l'appelant — ce
 * composant ne fait que la mise en forme.
 */
const PriceTag = ({ prefix, amount, suffix, size = "md", className, ...rest }: PriceTagProps) => {
  const { text, amount: amountClass } = sizeClasses[size];
  return (
    <p
      className={classNames(
        "flex flex-wrap items-baseline gap-x-1 gap-y-0.5",
        text,
        "text-neutral-500",
        className,
      )}
      {...rest}
    >
      {prefix ? <span>{prefix}</span> : null}
      <span className={classNames("font-bold text-neutral-900", amountClass)}>{amount}</span>
      {suffix ? <span>{suffix}</span> : null}
    </p>
  );
};

PriceTag.displayName = "PriceTag";

export { PriceTag };
export type { PriceTagProps, PriceTagSize };
