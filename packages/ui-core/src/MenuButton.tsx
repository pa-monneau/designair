"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "./icons";
import { classNames } from "./classNames";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "./buttonStyles";

type MenuButtonAlign = "start" | "end" | "stretch";

type MenuButtonProps = {
  label: ReactNode;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  /** Alignement du panneau sous le trigger. `stretch` = même largeur. */
  align?: MenuButtonAlign;
  /** Chevron indicateur d'ouverture après `label`. Désactiver pour un trigger icône seule (ex. avatar, burger). */
  showChevron?: boolean;
  className?: string;
  menuClassName?: string;
};

const alignClasses: Record<MenuButtonAlign, string> = {
  start: "left-0",
  end: "right-0",
  stretch: "inset-x-0",
};

/**
 * Bouton (stylé comme un `Button` du DS) qui déroule un menu de contenu libre.
 * Encapsule l'état d'ouverture, la fermeture au clic extérieur et à `Escape`,
 * et l'ARIA. Le contenu (`children`) est arbitraire : items, formulaires, liens.
 * Le menu se ferme automatiquement après un clic sur un `button` ou un lien.
 */
const MenuButton = ({
  label,
  children,
  variant = "secondary",
  size = "md",
  block = false,
  align = block ? "stretch" : "start",
  showChevron = true,
  className,
  menuClassName,
}: MenuButtonProps) => {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={classNames("relative", block && "w-full", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className={buttonClassName({ variant, size, block })}
      >
        {label}
        {showChevron ? (
          <ChevronDownIcon
            aria-hidden
            className={classNames("size-4 transition-transform", open && "rotate-180")}
          />
        ) : null}
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          onClick={handleMenuClick}
          className={classNames(
            "absolute top-full z-50 mt-2 flex flex-col gap-0.5 rounded-xl border border-neutral-200 bg-neutral-0 p-2 shadow-elevated",
            alignClasses[align],
            menuClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export { MenuButton };
export type { MenuButtonAlign, MenuButtonProps };
