import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@recordair/ui-core";

type FormCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const FormCard = ({ title, subtitle, children }: FormCardProps) => (
  <Card as="section" padding="none" className="overflow-hidden">
    <CardHeader className="border-b border-neutral-200 px-6 py-5">
      <CardTitle level={2}>{title}</CardTitle>
      {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
    </CardHeader>
    <CardContent className="flex flex-col px-6 pb-4 pt-2">{children}</CardContent>
  </Card>
);

FormCard.displayName = "FormCard";

export { FormCard };
export type { FormCardProps };
