import type { ReactNode } from "react";
import { Badge } from "@recordair/ui-core";
import {
  AudioLinesIcon,
  HeadphonesIcon,
  MicIcon,
  type IconProps,
} from "@recordair/ui-core/icons";

type Role = "artist" | "studio" | "pro";

type RoleBadgeProps = {
  role: Role;
  label?: string;
  trailing?: ReactNode;
};

type RoleConfig = {
  className: string;
  defaultLabel: string;
  Icon: (props: IconProps) => ReactNode;
};

const roleConfig: Record<Role, RoleConfig> = {
  artist: {
    className: "bg-role-artist-bg text-role-artist-text",
    defaultLabel: "Artiste",
    Icon: MicIcon,
  },
  studio: {
    className: "bg-role-studio-bg text-role-studio-text",
    defaultLabel: "Studio",
    Icon: AudioLinesIcon,
  },
  pro: {
    className: "bg-role-pro-bg text-role-pro-text",
    defaultLabel: "Pro",
    Icon: HeadphonesIcon,
  },
};

const RoleBadge = ({ role, label, trailing }: RoleBadgeProps) => {
  const config = roleConfig[role];
  const Icon = config.Icon;

  return (
    <div className="flex items-center gap-3 text-sm">
      <Badge size="md" icon={<Icon className="size-4" />} className={config.className}>
        {label ?? config.defaultLabel}
      </Badge>
      {trailing}
    </div>
  );
};

RoleBadge.displayName = "RoleBadge";

export { RoleBadge };
export type { Role, RoleBadgeProps };
