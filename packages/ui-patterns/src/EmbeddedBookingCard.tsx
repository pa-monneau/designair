import type { ElementType } from "react";
import { Card, CardContent, CardMedia, LinkButton } from "@recordair/ui-core";

type EmbeddedBookingCardProps = {
  mediaUrl?: string;
  mediaAlt?: string;
  eyebrow: string;
  title: string;
  metadata: string;
  actionLabel: string;
  actionHref: string;
  /** Composant de lien du CTA (ex. le `Link` localisé d'un routeur applicatif). */
  as?: ElementType;
};

const EmbeddedBookingCard = ({
  mediaUrl,
  mediaAlt = "",
  eyebrow,
  title,
  metadata,
  actionLabel,
  actionHref,
  as,
}: EmbeddedBookingCardProps) => (
  <Card
    as="article"
    padding="none"
    className="w-[var(--size-embedded-card)] max-w-full overflow-hidden rounded-xl"
  >
    <CardMedia
      ratio="wide"
      className="h-[var(--size-embedded-media)] bg-gradient-to-br from-brand-gradient-from to-brand-gradient-to"
    >
      {mediaUrl ? <img src={mediaUrl} alt={mediaAlt} className="size-full object-cover" /> : null}
    </CardMedia>
    <CardContent className="items-start gap-1 px-4 py-3">
      <span className="text-overline font-semibold uppercase tracking-wide text-neutral-500">{eyebrow}</span>
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="text-caption text-neutral-500">{metadata}</p>
      <LinkButton as={as} href={actionHref} size="sm" className="mt-2">{actionLabel}</LinkButton>
    </CardContent>
  </Card>
);

EmbeddedBookingCard.displayName = "EmbeddedBookingCard";

export { EmbeddedBookingCard };
export type { EmbeddedBookingCardProps };
