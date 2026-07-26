import type { AnchorHTMLAttributes, ComponentType, ElementType } from "react";
import { Badge, Card, CardContent, CardMedia, IconBox } from "@recordair/ui-core";
import { MicIcon, StarIcon, type IconProps } from "@recordair/ui-core/icons";

type StudioCardGradient = "artist" | "studio" | "pro" | "brand";

type StudioCardData = {
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: number;
  tags: readonly string[];
  priceLabel: string;
  rateSuffix: string;
  gradient?: StudioCardGradient;
  href: string;
  photoUrl?: string | null;
  ratingAriaLabel?: string;
};

type StudioCardProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
  studio: StudioCardData;
  className?: string;
  Icon?: ComponentType<IconProps>;
  /** Composant de lien à la place de `<a>` (ex. le `Link` localisé d'un routeur applicatif). */
  as?: ElementType;
};

const gradientClasses: Record<StudioCardGradient, string> = {
  artist: "from-role-artist-from to-role-artist-to",
  studio: "from-role-studio-from to-role-studio-to",
  pro: "from-role-pro-from to-role-pro-to",
  brand: "from-brand-gradient-from to-brand-gradient-to",
};

const StudioCard = ({
  studio,
  className,
  Icon = MicIcon,
  as: LinkComponent = "a",
  ...rest
}: StudioCardProps) => (
  <LinkComponent
    href={studio.href}
    className="block h-full"
    {...rest}
  >
    <Card
      variant="interactive"
      padding="none"
      className={["h-full", className].filter(Boolean).join(" ")}
    >
      <CardMedia
        ratio="landscape"
        className={[
          "h-[var(--size-card-media)] aspect-auto",
          studio.photoUrl
            ? "bg-neutral-200"
            : `bg-gradient-to-br ${gradientClasses[studio.gradient ?? "brand"]}`,
        ].join(" ")}
      >
        {studio.photoUrl ? (
          <img
            src={studio.photoUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="absolute -left-5 -top-5 size-40 rounded-full bg-neutral-0/20 blur-2xl"
          />
        )}
        <Badge className="absolute right-3 top-3 bg-neutral-0 text-neutral-900">
          {studio.type}
        </Badge>
        <IconBox pill icon={<Icon />} className="absolute bottom-3 left-3 bg-neutral-0 text-neutral-900 shadow-md" />
      </CardMedia>
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <span className="flex items-start justify-between gap-3">
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate font-semibold text-neutral-900">{studio.name}</span>
            <span className="text-label text-neutral-500">{studio.location}</span>
          </span>
          <span
            className="flex shrink-0 items-center gap-1"
            aria-label={studio.ratingAriaLabel}
          >
            <StarIcon aria-hidden className="size-3.5 fill-star text-star" />
            <span className="text-label font-medium text-neutral-800">
              {studio.rating} ({studio.reviews})
            </span>
          </span>
        </span>
        <span className="flex flex-wrap gap-1.5">
          {studio.tags.map((tag) => (
            <Badge
              key={tag}
              tone="neutral"
            >
              {tag}
            </Badge>
          ))}
        </span>
        <span className="mt-auto flex items-baseline gap-1 pt-2">
          <span className="text-xl font-bold text-neutral-900">{studio.priceLabel}</span>
          <span className="text-sm text-neutral-500">{studio.rateSuffix}</span>
        </span>
      </CardContent>
    </Card>
  </LinkComponent>
);

StudioCard.displayName = "StudioCard";

export { StudioCard };
export type { StudioCardData, StudioCardGradient, StudioCardProps };
