"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { ChevronDownIcon } from "./icons";
import { classNames } from "./classNames";

type MenuSelectOption = {
  id: string;
  label: string;
  disabled?: boolean;
  /** Info-bulle sur une option désactivée (ex. "active ta position pour trier par distance"). */
  disabledHint?: string;
  /**
   * Si fourni, l'option navigue (rendue via `as`) au lieu d'appeler
   * `onSelect` — utile quand la sélection doit changer l'URL (filtres de
   * recherche côté serveur) plutôt qu'un simple état client.
   */
  href?: string;
};

type MenuSelectProps = {
  /** Nom accessible du menu (aria-label / aria-controls). */
  label: string;
  /** Contenu visuel du déclencheur. Par défaut, affiche `label`. */
  trigger?: ReactNode;
  options: readonly MenuSelectOption[];
  selectedId?: string;
  /** Requis seulement pour les options sans `href`. */
  onSelect?: (id: string) => void;
  /** Composant de lien pour les options `href` (ex. le `Link` d'un routeur). */
  as?: ElementType;
  className?: string;
};

const MenuSelect = ({
  label,
  trigger,
  options,
  selectedId,
  onSelect,
  as: LinkComponent = "a",
  className,
}: MenuSelectProps) => {
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

  const select = (id: string) => {
    onSelect?.(id);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const optionClassName = (option: MenuSelectOption) =>
    classNames(
      "rounded-md px-3 py-2 text-left text-label transition focus-visible:outline-none focus-visible:shadow-focus",
      option.id === selectedId
        ? "bg-gradient-to-br from-brand-gradient-from to-brand-gradient-to font-semibold text-neutral-0"
        : option.disabled
          ? "cursor-not-allowed text-neutral-400"
          : "text-neutral-700 hover:bg-neutral-50",
    );

  return (
    <div ref={rootRef} className={classNames("relative inline-flex", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        onClick={() => setOpen((current) => !current)}
        className="flex h-[var(--size-btn-sm)] items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-0 px-4 text-label font-medium text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:shadow-focus"
      >
        {trigger ?? label}
        <ChevronDownIcon aria-hidden className={classNames("size-4 text-neutral-500 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute left-0 top-full z-20 mt-1 flex w-[var(--size-mobile-menu)] flex-col rounded-lg border border-neutral-200 bg-neutral-0 p-1 shadow-elevated"
        >
          {options.map((option) => {
            if (option.disabled) {
              return (
                <span
                  key={option.id}
                  role="menuitemradio"
                  aria-checked={false}
                  aria-disabled="true"
                  title={option.disabledHint}
                  className={optionClassName(option)}
                >
                  {option.label}
                </span>
              );
            }

            if (option.href) {
              return (
                <LinkComponent
                  key={option.id}
                  href={option.href}
                  role="menuitemradio"
                  aria-checked={option.id === selectedId}
                  onClick={() => setOpen(false)}
                  className={optionClassName(option)}
                >
                  {option.label}
                </LinkComponent>
              );
            }

            return (
              <button
                key={option.id}
                type="button"
                role="menuitemradio"
                aria-checked={option.id === selectedId}
                onClick={() => select(option.id)}
                className={optionClassName(option)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

MenuSelect.displayName = "MenuSelect";

export { MenuSelect };
export type { MenuSelectOption, MenuSelectProps };
