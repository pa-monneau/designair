import type { ComponentType } from "react";
import { Card, IconBox, IconButton } from "@recordair/ui-core";
import { BellIcon, XIcon, type IconProps } from "@recordair/ui-core/icons";

type NotificationCardData = {
  id: string;
  title: string;
  subtitle?: string;
  read: boolean;
};

type NotificationCardProps = {
  notification: NotificationCardData;
  unreadLabel: string;
  deleteLabel: string;
  Icon?: ComponentType<IconProps>;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
};

const NotificationCard = ({
  notification,
  unreadLabel,
  deleteLabel,
  Icon = BellIcon,
  onOpen,
  onDelete,
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
      "!flex-row items-start gap-3 transition",
      notification.read
        ? "!border-line !bg-surface-elevated"
        : "!border-brand-primary/40 !bg-brand-primary/[0.04]",
    ].join(" ")}
  >
    <button
      type="button"
      onClick={() => onOpen(notification.id)}
      className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
    >
      <IconBox tone="brand" pill icon={<Icon />} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-fg-primary">{notification.title}</span>
        {notification.subtitle ? (
          <span className="truncate text-xs text-fg-secondary">{notification.subtitle}</span>
        ) : null}
      </span>
      {!notification.read ? (
        <span
          className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-primary"
          aria-label={unreadLabel}
        />
      ) : null}
    </button>
    <IconButton
      onClick={() => onDelete(notification.id)}
      label={deleteLabel}
      icon={<XIcon />}
      variant="ghost"
      size="sm"
      className="size-7 shrink-0 text-fg-tertiary"
    />
  </Card>
);

NotificationCard.displayName = "NotificationCard";

export { NotificationCard };
export type { NotificationCardData, NotificationCardProps };
