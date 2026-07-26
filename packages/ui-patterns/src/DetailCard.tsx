import type { ReactNode } from "react";
import { Card, CardDescription, CardTitle } from "@recordair/ui-core";

type DetailCardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

const DetailCard = ({ title, description, action, children }: DetailCardProps) => (
  <Card as="section" padding="md" className="gap-4">
    {title || description || action ? (
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          {title ? <CardTitle level={2}>{title}</CardTitle> : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {action}
      </header>
    ) : null}
    {children}
  </Card>
);

DetailCard.displayName = "DetailCard";

export { DetailCard };
export type { DetailCardProps };
