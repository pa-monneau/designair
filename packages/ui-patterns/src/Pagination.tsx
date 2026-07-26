import type { ElementType } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
} from "@recordair/ui-core/icons";
import { LinkButton } from "@recordair/ui-core";

type PaginationLabels = {
  navigation: string;
  previous: string;
  next: string;
  page: (page: number) => string;
  status: (currentPage: number, totalPages: number, totalResults: number) => string;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hrefForPage: (page: number) => string;
  labels: PaginationLabels;
  /**
   * Composant de lien pour les pages naviguables (ex. le `Link` localisé d'un
   * routeur applicatif). Les boutons désactivés (bord de pagination, sans
   * `href`) restent en `<a>` natif quel que soit ce prop.
   */
  as?: ElementType;
};

const buildPageList = (current: number, total: number): Array<number | "ellipsis"> => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) {
    pages.push("ellipsis");
  }

  for (let page = left; page <= right; page += 1) {
    pages.push(page);
  }

  if (right < total - 1) {
    pages.push("ellipsis");
  }

  pages.push(total);

  return pages;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalResults,
  hrefForPage,
  labels,
  as,
}: PaginationProps) => {
  const pages = buildPageList(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <nav aria-label={labels.navigation} className="flex items-center gap-1">
        <LinkButton
          as={currentPage > 1 ? as : undefined}
          href={currentPage > 1 ? hrefForPage(currentPage - 1) : undefined}
          aria-label={labels.previous}
          aria-disabled={currentPage === 1}
          variant="ghost"
          size="sm"
          shape="pill"
          className={currentPage === 1 ? "pointer-events-none size-9 px-0 text-neutral-300" : "size-9 px-0 text-neutral-900"}
        >
          <ChevronLeftIcon aria-hidden className="size-4" />
        </LinkButton>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden
              className="grid size-9 place-items-center text-sm text-neutral-500"
            >
              <EllipsisIcon className="size-4" />
            </span>
          ) : (
            <LinkButton
              key={page}
              as={as}
              href={hrefForPage(page)}
              aria-label={labels.page(page)}
              aria-current={page === currentPage ? "page" : undefined}
              variant={page === currentPage ? "primary" : "ghost"}
              size="sm"
              shape="pill"
              className="size-9 px-0"
            >
              {page}
            </LinkButton>
          ),
        )}
        <LinkButton
          as={currentPage < totalPages ? as : undefined}
          href={currentPage < totalPages ? hrefForPage(currentPage + 1) : undefined}
          aria-label={labels.next}
          aria-disabled={currentPage === totalPages}
          variant="ghost"
          size="sm"
          shape="pill"
          className={currentPage === totalPages ? "pointer-events-none size-9 px-0 text-neutral-300" : "size-9 px-0 text-neutral-900"}
        >
          <ChevronRightIcon aria-hidden className="size-4" />
        </LinkButton>
      </nav>
      <p className="text-xs text-neutral-500">
        {labels.status(currentPage, totalPages, totalResults)}
      </p>
    </div>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
export type { PaginationLabels, PaginationProps };
