import type { AnchorHTMLAttributes, ElementType, ReactNode } from "react";
import { buttonClassName } from "./buttonStyles";
import type { ButtonSize, ButtonVariant } from "./buttonStyles";
import { classNames } from "./classNames";

type IconButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "type"> & {
  icon: ReactNode;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Nombre affiché en badge (coin haut-droit). Masqué si absent ou <= 0. */
  badge?: number;
  /**
   * Élément à rendre à la place du `<button>` natif (ex. le `Link` d'un
   * routeur pour un icon-button qui navigue, ou `"summary"` dans un
   * `<details>`). Sans ce prop, le comportement `<button>` d'origine est
   * inchangé.
   */
  as?: ElementType;
};

/**
 * Bouton-icône rond, avec badge compteur optionnel (notifications, panier).
 * Par défaut un `<button>` ; passer `as` pour le rendre comme un lien ou
 * tout autre élément (même convention que `RecordairLogo`/`NavigationList`),
 * en conservant le même style.
 */
const IconButton = ({
  icon,
  label,
  variant = "ghost",
  size = "md",
  badge,
  as: AsElement,
  className,
  ...rest
}: IconButtonProps) => {
  const Tag = AsElement ?? "button";
  const showBadge = typeof badge === "number" && badge > 0;

  return (
    <Tag
      // Sans `as`, on rend un vrai `<button>` : `type="button"` évite un
      // submit accidentel si l'icon-button vit dans un `<form>`.
      {...(AsElement ? {} : { type: "button" })}
      aria-label={label}
      className={classNames(
        "relative",
        buttonClassName({ variant, size, shape: "pill", iconOnly: true }),
        className,
      )}
      {...rest}
    >
      {icon}
      {showBadge ? (
        <span className="absolute -right-0.5 -top-0.5 grid size-[18px] place-items-center rounded-full border-2 border-neutral-0 bg-error text-[10px] font-bold text-neutral-0">
          {badge! > 9 ? "9+" : badge}
        </span>
      ) : null}
    </Tag>
  );
};

IconButton.displayName = "IconButton";

export { IconButton };
export type { IconButtonProps };
