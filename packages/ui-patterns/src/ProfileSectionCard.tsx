import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@recordair/ui-core";

type ProfileSectionCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const ProfileSectionCard = ({
  title,
  subtitle,
  children,
}: ProfileSectionCardProps) => (
  <Card as="section" padding="none" className="overflow-hidden">
    <CardHeader className="border-b border-neutral-200 px-6 py-5">
      <CardTitle level={2}>{title}</CardTitle>
      {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
    </CardHeader>
    <CardContent className="flex flex-col px-6 pb-4 pt-2">{children}</CardContent>
  </Card>
);

ProfileSectionCard.displayName = "ProfileSectionCard";

export { ProfileSectionCard };
export type { ProfileSectionCardProps };
