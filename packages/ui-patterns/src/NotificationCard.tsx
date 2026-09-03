import type { ComponentType } from "react";
import { Card, IconBox, IconButton } from "@recordair/ui-core";
import { BellIcon, XIcon, type IconProps } from "@recordair/ui-core/icons";

type NotificationCardData = {
  id: string;
  title: string;
  subtitle?: string;
  read: boolean;
};

/**
 * Action contextuelle (ex. accepter/refuser une demande d'ami). Générique et
 * réutilisable pour tout futur type de notification actionnable (ex.
 * invitation de salon) — pas de forme spécifique "ami" dans le composant.
 */
type NotificationCardAction = {
  icon: ComponentType<IconProps>;
  label: string;
  tone: "success" | "danger";
  onClick: () => void;
};

type NotificationCardProps = {
  notification: NotificationCardData;
  unreadLabel: string;
  deleteLabel: string;
  Icon?: ComponentType<IconProps>;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  /**
   * Quand fournies, remplacent le bouton de suppression générique par ces
   * actions (ex. Accepter/Refuser) : sur une notification actionnable,
   * "supprimer la ligne" et "refuser la demande" seraient deux croix
   * redondantes et ambiguës l'une à côté de l'autre.
   */
  actions?: NotificationCardAction[];
};

const NotificationCard = ({
  notification,
  unreadLabel,
  deleteLabel,
  Icon = BellIcon,
  onOpen,
  onDelete,
  actions,
}: NotificationCardProps) => (
  <Card
    as="article"
    padding="sm"
    className={[
      // `Card` applique `flex-col`/`bg-neutral-0`/`border-neutral-200` par
      // défaut (cf. Card.tsx), aucun n'est dark-aware ni pensé pour être
      // surchargé : `classNames()` est un concat naïf, pas un merge
      // Tailwind-aware, donc `!` est nécessaire pour garantir que ces
      // surcharges gagnent quel que soit l'ordre de cascade généré. Les deux
      // branches ci-dessous restent mutuellement exclusives (jamais les deux
      // à la fois dans le DOM) pour ne jamais faire concurrencer deux
      // `!important` sur la même propriété.
      "!flex-row items-center gap-3 transition",
      notification.read
        ? "!border-line !bg-surface-elevated"
        : "!border-brand-primary/40 !bg-brand-primary/[0.04]",
    ].join(" ")}
  >
    <button
      type="button"
      onClick={() => onOpen(notification.id)}
      className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
    >
      <IconBox tone="brand" pill icon={<Icon />} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-fg-primary">{notification.title}</span>
        {notification.subtitle ? (
          <span className="line-clamp-2 text-xs text-fg-secondary">{notification.subtitle}</span>
        ) : null}
      </span>
      {!notification.read ? (
        <span
          className="size-2 shrink-0 rounded-full bg-brand-primary"
          aria-label={unreadLabel}
        />
      ) : null}
    </button>
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
    ) : (
      <IconButton
        onClick={() => onDelete(notification.id)}
        label={deleteLabel}
        icon={<XIcon />}
        variant="ghost"
        size="sm"
        className="size-7 shrink-0 text-fg-tertiary"
      />
    )}
  </Card>
);

NotificationCard.displayName = "NotificationCard";

export { NotificationCard };
export type { NotificationCardAction, NotificationCardData, NotificationCardProps };
