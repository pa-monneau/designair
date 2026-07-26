import type { ReactNode } from "react";
import { Button, LinkButton } from "@recordair/ui-core";

type ErrorStateTone = "brand" | "error" | "warning";

type ErrorStateAction = {
  label: string;
  variant?: "primary" | "secondary";
} & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
);

type ErrorStateProps = {
  code: string;
  icon: ReactNode;
  title: string;
  description: string;
  actions: readonly ErrorStateAction[];
  tone?: ErrorStateTone;
};

const toneClasses: Record<ErrorStateTone, string> = {
  brand: "text-brand-primary/30",
  error: "text-error/30",
  warning: "text-warning/40",
};

const ErrorState = ({
  code,
  icon,
  title,
  description,
  actions,
  tone = "brand",
}: ErrorStateProps) => (
  <section className="flex flex-col items-center gap-5 px-4 py-16 text-center">
    <span
      aria-hidden
      className={`select-none text-display-lg font-black leading-none tracking-tight sm:text-display-xl ${toneClasses[tone]}`}
    >
      {code}
    </span>
    <span aria-hidden className="text-brand-primary">{icon}</span>
    <h1 className="text-heading-lg font-bold text-neutral-900">{title}</h1>
    <p className="max-w-content-sm text-body-sm leading-copy text-neutral-500">{description}</p>
    <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
      {actions.map((action) => (
        "href" in action ? (
          <LinkButton key={action.label} href={action.href} variant={action.variant ?? "primary"}>
            {action.label}
          </LinkButton>
        ) : (
          <Button key={action.label} onClick={action.onClick} variant={action.variant ?? "primary"}>
            {action.label}
          </Button>
        )
      ))}
    </div>
  </section>
);

ErrorState.displayName = "ErrorState";

export { ErrorState };
export type { ErrorStateAction, ErrorStateProps, ErrorStateTone };
