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
      "flex items-start gap-3 transition",
      notification.read ? "" : "border-brand-primary/40 bg-brand-primary/[0.04]",
    ].join(" ")}
  >
    <button
      type="button"
      onClick={() => onOpen(notification.id)}
      className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
    >
      <IconBox tone="brand" pill icon={<Icon />} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-neutral-900">{notification.title}</span>
        {notification.subtitle ? (
          <span className="truncate text-xs text-neutral-500">{notification.subtitle}</span>
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
      className="size-7 shrink-0 text-neutral-400"
    />
  </Card>
);

NotificationCard.displayName = "NotificationCard";

export { NotificationCard };
export type { NotificationCardData, NotificationCardProps };
