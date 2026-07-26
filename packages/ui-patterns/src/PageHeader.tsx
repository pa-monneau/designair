import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@recordair/ui-core/icons";

type PageHeaderLink = {
  label: string;
  href: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  backLink?: PageHeaderLink;
  metaLink?: PageHeaderLink;
  navigation?: ReactNode;
};

const PageHeader = ({
  title,
  description,
  backLink,
  metaLink,
  navigation,
}: PageHeaderProps) => (
  <header className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      {backLink ? (
        <a
          href={backLink.href}
          className="inline-flex items-center gap-2 self-start text-sm font-medium text-neutral-500 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:shadow-focus"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          {backLink.label}
        </a>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-lg font-semibold text-neutral-900">{title}</h1>
          {description ? <p className="text-body-sm text-neutral-500">{description}</p> : null}
        </div>
        {metaLink ? (
          <a
            href={metaLink.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:shadow-focus"
          >
            {metaLink.label}
            <ArrowRightIcon aria-hidden className="size-4" />
          </a>
        ) : null}
      </div>
    </div>
    {navigation}
  </header>
);

PageHeader.displayName = "PageHeader";

export { PageHeader };
export type { PageHeaderLink, PageHeaderProps };
