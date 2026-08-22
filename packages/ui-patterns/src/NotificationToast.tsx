import { type ComponentType, useEffect, useState } from "react";
import { IconBox, IconButton } from "@recordair/ui-core";
import { BellIcon, XIcon, type IconProps } from "@recordair/ui-core/icons";
import type { NotificationCardAction } from "./NotificationCard";

type NotificationToastProps = {
  title: string;
  subtitle?: string;
  Icon?: ComponentType<IconProps>;
  /** Cf. `NotificationCardAction` — même forme que la carte de la liste persistante. */
  actions?: NotificationCardAction[];
  closeLabel: string;
  onClose: () => void;
};

/**
 * Encart "à l'appui" (style notification système, ancré en haut à droite) :
 * affiché le temps qu'une notification arrive en direct, en plus — jamais à
 * la place — de son entrée dans la liste persistante `/notifications`.
 * Composant "bête" : ne gère ni minuterie d'auto-fermeture ni file d'attente,
 * c'est au responsable de la file (ex. un centre de notifications applicatif)
 * de monter/démonter cette instance. Pas d'animation de sortie en v1 (le
 * démontage est immédiat) : à ajouter si le manque se fait sentir à l'usage.
 */
const NotificationToast = ({
  title,
  subtitle,
  Icon = BellIcon,
  actions,
  closeLabel,
  onClose,
}: NotificationToastProps) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-4 z-50 w-[calc(100vw-2rem)] max-w-sm sm:right-6 sm:top-6"
    >
      <div
        className={[
          "flex items-center gap-3 rounded-2xl border border-line bg-surface-elevated p-4 shadow-elevated transition-all duration-200 ease-out",
          shown ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        ].join(" ")}
      >
        <IconBox tone="brand" pill icon={<Icon />} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold text-fg-primary">{title}</p>
          {subtitle ? <p className="truncate text-xs text-fg-secondary">{subtitle}</p> : null}
        </div>
        {actions && actions.length > 0 ? (
          <span className="flex shrink-0 items-center gap-1.5">
            {actions.map(({ icon: ActionIcon, label, tone, onClick }) => (
              <IconButton
                key={label}
                onClick={onClick}
                label={label}
                icon={<ActionIcon />}
                variant={tone}
                size="sm"
                className="size-7"
              />
            ))}
          </span>
        ) : null}
        <IconButton
          onClick={onClose}
          label={closeLabel}
          icon={<XIcon />}
          variant="ghost"
          size="sm"
          className="size-7 shrink-0 text-fg-tertiary"
        />
      </div>
    </div>
  );
};

NotificationToast.displayName = "NotificationToast";

export { NotificationToast };
export type { NotificationToastProps };
