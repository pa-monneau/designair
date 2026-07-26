import type { ElementType } from "react";
import { AudioLinesIcon, ClockIcon } from "@recordair/ui-core/icons";
import { Badge, Card, IconBox, LinkButton } from "@recordair/ui-core";

type BookingStatus =
  | "confirmed"
  | "awaiting-payment"
  | "pending"
  | "completed"
  | "cancelled";

type BookingCardData = {
  id: string;
  studioName: string;
  studioCity?: string;
  durationLabel: string;
  totalLabel: string;
  status: BookingStatus;
  statusLabel: string;
  href: string;
};

type BookingCardProps = {
  booking: BookingCardData;
  detailsLabel: string;
  /** Composant de lien du CTA "détails" (ex. le `Link` localisé d'un routeur applicatif). */
  as?: ElementType;
};

const statusTones: Record<BookingStatus, "success" | "warning" | "neutral" | "error"> = {
  confirmed: "success",
  "awaiting-payment": "warning",
  pending: "warning",
  completed: "neutral",
  cancelled: "error",
};

const BookingCard = ({ booking, detailsLabel, as }: BookingCardProps) => (
  <Card as="article" padding="sm" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
    <div className="flex min-w-0 flex-1 items-center gap-4">
      <IconBox tone="brand" icon={<AudioLinesIcon />} className="size-12 [&_svg]:size-6" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Badge tone={statusTones[booking.status]} className="uppercase">
          {booking.statusLabel}
        </Badge>
        <p className="truncate text-sm font-semibold text-neutral-900">
          {booking.studioName}
          {booking.studioCity ? `, ${booking.studioCity}` : ""}
        </p>
        <p className="flex items-center gap-2 text-label text-neutral-500">
          <span className="flex items-center gap-1">
            <ClockIcon className="size-4" />
            {booking.durationLabel}
          </span>
          <span aria-hidden>·</span>
          <span className="font-semibold text-neutral-900">{booking.totalLabel}</span>
        </p>
      </div>
    </div>
    <LinkButton
      as={as}
      href={booking.href}
      variant="secondary"
      size="sm"
      shape="pill"
      className="shrink-0"
    >
      {detailsLabel}
    </LinkButton>
  </Card>
);

BookingCard.displayName = "BookingCard";

export { BookingCard };
export type { BookingCardData, BookingCardProps, BookingStatus };
