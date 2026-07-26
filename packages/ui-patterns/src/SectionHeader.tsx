type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
};

const SectionHeader = ({ title, actionLabel, actionHref }: SectionHeaderProps) => (
  <div className="flex items-center justify-between gap-4">
    <h2 className="text-base font-bold text-neutral-900">{title}</h2>
    {actionLabel && actionHref ? (
      <LinkButton
        href={actionHref}
        variant="ghost"
        size="sm"
        className="h-auto px-0 text-brand-primary"
      >
        {actionLabel}
      </LinkButton>
    ) : null}
  </div>
);

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
export type { SectionHeaderProps };
import { LinkButton } from "@recordair/ui-core";
