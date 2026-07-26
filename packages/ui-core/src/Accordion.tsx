"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "./icons";
import { classNames } from "./classNames";

type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  defaultOpenIds?: readonly string[];
  allowMultiple?: boolean;
  className?: string;
};

const Accordion = ({
  items,
  defaultOpenIds = [],
  allowMultiple = false,
  className,
}: AccordionProps) => {
  const instanceId = useId();
  const [openIds, setOpenIds] = useState<readonly string[]>(defaultOpenIds);

  const toggle = (id: string) => {
    const isOpen = openIds.includes(id);

    if (isOpen) {
      setOpenIds(openIds.filter((openId) => openId !== id));
      return;
    }

    setOpenIds(allowMultiple ? [...openIds, id] : [id]);
  };

  return (
    <div className={classNames("w-full", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${instanceId}-${item.id}-trigger`;
        const panelId = `${instanceId}-${item.id}-panel`;

        return (
          <section key={item.id} className="border-b border-neutral-200">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left text-heading-md font-semibold leading-heading text-neutral-900 transition hover:text-brand-primary focus:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{item.title}</span>
                <ChevronDownIcon
                  aria-hidden
                  className={classNames(
                    "size-5 shrink-0 text-brand-primary transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-6 pr-10 text-body leading-copy text-neutral-700"
            >
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
};

Accordion.displayName = "Accordion";

export { Accordion };
export type { AccordionItem, AccordionProps };
