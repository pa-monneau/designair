import type { ButtonHTMLAttributes } from "react";
import { buttonClassName } from "./buttonStyles";
import type { ButtonSize } from "./buttonStyles";
import { classNames } from "./classNames";
import { MoonIcon, SunIcon } from "./icons";

type ThemeToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "onClick"> & {
  theme: "light" | "dark";
  onToggle: () => void;
  size?: ButtonSize;
};

/**
 * Bouton icône contrôlé, affiche l'icône du thème à activer (soleil en
 * sombre, lune en clair) — jamais l'état courant, pour signaler l'action.
 */
const ThemeToggle = ({ theme, onToggle, size = "md", className, ...rest }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
    title={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
    className={classNames(buttonClassName({ variant: "subtle", size, shape: "pill", iconOnly: true }), className)}
    {...rest}
  >
    {theme === "dark" ? <SunIcon aria-hidden className="size-5" /> : <MoonIcon aria-hidden className="size-5" />}
  </button>
);

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
export type { ThemeToggleProps };
