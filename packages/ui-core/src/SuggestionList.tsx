import type { ReactNode } from "react";
import { classNames } from "./classNames";

type SuggestionListProps = {
  /** Libellé au-dessus de la liste (ex. "Suggestions de destinations"). */
  heading?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Panneau flottant pour une liste de `SuggestionListItem` (dropdown de
 * destination/adresse). Gère uniquement la présentation (carte, en-tête,
 * zone scrollable) — le positionnement (`absolute`, largeur, `open`/`close`)
 * reste à la charge de l'appelant, propre à son contexte (champ, formulaire).
 */
const SuggestionList = ({ heading, children, className }: SuggestionListProps) => (
  <div
    className={classNames(
      "overflow-hidden rounded-lg border border-neutral-200 bg-neutral-0 shadow-elevated",
      className,
    )}
  >
    {heading ? (
      <p className="px-4 pb-1 pt-3 text-xs font-semibold text-neutral-500">{heading}</p>
    ) : null}
    <div className="max-h-[60vh] overflow-auto p-2">{children}</div>
  </div>
);

SuggestionList.displayName = "SuggestionList";

export { SuggestionList };
export type { SuggestionListProps };
