import type { ReactNode } from "react";
import { IconBox } from "./IconBox";
import type { IconBoxTone } from "./IconBox";
import { classNames } from "./classNames";

type SuggestionListItemProps = {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: IconBoxTone;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

/**
 * Ligne icône + titre + sous-titre (2 lignes max), pensée pour une liste de
 * suggestions (destination, adresse, résultat de recherche...). Toute la
 * ligne est cliquable et se surligne au survol — pas seulement le texte.
 */
const SuggestionListItem = ({
  icon,
  title,
  subtitle,
  tone = "neutral",
  disabled = false,
  onClick,
  className,
}: SuggestionListItemProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={classNames(
      "flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-60",
      className,
    )}
  >
    <IconBox tone={tone} size="md" icon={icon} />
    <span className="flex min-w-0 flex-col overflow-hidden">
      <span className="truncate text-[15px] font-semibold text-neutral-900">{title}</span>
      {subtitle ? (
        <span className="line-clamp-2 text-sm text-neutral-500">{subtitle}</span>
      ) : null}
    </span>
  </button>
);

SuggestionListItem.displayName = "SuggestionListItem";

export { SuggestionListItem };
export type { SuggestionListItemProps };
