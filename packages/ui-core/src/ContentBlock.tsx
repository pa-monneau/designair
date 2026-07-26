import type { HTMLAttributes } from "react";
import { classNames } from "./classNames";

type ContentBlockData =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "callout"; text: string; tone?: "neutral" | "info" | "warning" };

type ContentBlockProps = HTMLAttributes<HTMLElement> & {
  block: ContentBlockData;
};

const calloutClasses: Record<NonNullable<Extract<ContentBlockData, { kind: "callout" }>["tone"]>, string> = {
  neutral: "border-neutral-200 bg-neutral-100 text-neutral-700",
  info: "border-info-border bg-info-bg text-info-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
};

const ContentBlock = ({ block, className, ...rest }: ContentBlockProps) => {
  if (block.kind === "list") {
    return (
      <ul
        className={classNames(
          "flex list-disc flex-col gap-2 pl-5 text-body-sm leading-copy text-neutral-700 marker:text-neutral-400",
          className,
        )}
        {...rest}
      >
        {block.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
      </ul>
    );
  }

  if (block.kind === "callout") {
    return (
      <aside
        className={classNames(
          "rounded-lg border px-4 py-3 text-body-sm leading-copy",
          calloutClasses[block.tone ?? "neutral"],
          className,
        )}
        {...rest}
      >
        {block.text}
      </aside>
    );
  }

  return (
    <p className={classNames("text-body-sm leading-copy text-neutral-700", className)} {...rest}>
      {block.text}
    </p>
  );
};

ContentBlock.displayName = "ContentBlock";

export { ContentBlock };
export type { ContentBlockData, ContentBlockProps };
