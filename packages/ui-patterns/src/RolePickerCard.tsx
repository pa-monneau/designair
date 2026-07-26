import type { ComponentType, ElementType } from "react";
import { Card, CardContent, CardTitle, IconBox, LinkButton } from "@recordair/ui-core";
import { ArrowRightIcon, type IconProps } from "@recordair/ui-core/icons";
import type { Role } from "./RoleBadge";

type RolePickerCardProps = {
  role: Role;
  href: string;
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
  bullets: readonly string[];
  cta: string;
  linkComponent?: ElementType;
  interaction?: RolePickerInteraction;
};

type RolePickerInteraction = "action" | "card";

const roleClasses: Record<
  Role,
  { iconTone: "artist" | "studio" | "pro"; cta: string; bullet: string }
> = {
  artist: {
    iconTone: "artist",
    cta: "from-role-artist-from to-role-artist-to",
    bullet: "bg-role-artist-bg",
  },
  studio: {
    iconTone: "studio",
    cta: "from-role-studio-from to-role-studio-to",
    bullet: "bg-role-studio-bg",
  },
  pro: {
    iconTone: "pro",
    cta: "from-role-pro-from to-role-pro-to",
    bullet: "bg-role-pro-bg",
  },
};

const RolePickerCard = ({
  role,
  href,
  Icon,
  title,
  description,
  bullets,
  cta,
  linkComponent,
  interaction = "action",
}: RolePickerCardProps) => {
  const classes = roleClasses[role];
  const LinkComponent = linkComponent ?? "a";
  const cardClassName = [
    "min-h-[var(--size-role-card-min-height)] gap-6 rounded-xl",
    interaction === "card"
      ? "border-control shadow-card transition group-hover:-translate-y-1 group-hover:border-neutral-300 group-hover:shadow-lg group-focus-visible:shadow-focus"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <IconBox tone={classes.iconTone} size="lg" icon={<Icon />} />
      <CardTitle
        level={2}
        className="text-heading-lg font-bold leading-tight tracking-tight"
      >
        {title}
      </CardTitle>
      <p className="text-base leading-6 text-neutral-600">{description}</p>
      <ul className="flex flex-col gap-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-sm leading-6 text-neutral-700"
          >
            <span
              aria-hidden
              className={`mt-0.5 inline-block size-5 shrink-0 rounded-full ${classes.bullet}`}
            />
            {bullet}
          </li>
        ))}
      </ul>
      <CardContent className="flex-1" />
      <LinkButton
        as={interaction === "card" ? "span" : linkComponent}
        href={interaction === "action" ? href : undefined}
        size="lg"
        block
        trailingIcon={<ArrowRightIcon className="size-4" />}
        className={`bg-gradient-to-r ${classes.cta}`}
      >
        {cta}
      </LinkButton>
    </>
  );

  if (interaction === "card") {
    return (
      <LinkComponent
        href={href}
        className="group block rounded-xl focus-visible:outline-none"
      >
        <Card
          as="article"
          variant="default"
          padding="lg"
          className={cardClassName}
        >
          {content}
        </Card>
      </LinkComponent>
    );
  }

  return (
    <Card
      as="article"
      variant="elevated"
      padding="lg"
      className={cardClassName}
    >
      {content}
    </Card>
  );
};

RolePickerCard.displayName = "RolePickerCard";

export { RolePickerCard };
export type { RolePickerCardProps, RolePickerInteraction };
