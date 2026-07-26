import type { AnchorHTMLAttributes, ElementType } from "react";
import { RecordairMark } from "./RecordairMark";

type RecordairLogoSize = "sm" | "md" | "lg";

type RecordairLogoProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  as?: ElementType;
  href?: string;
  size?: RecordairLogoSize;
  inverted?: boolean;
  label?: string;
};

const sizeClasses: Record<RecordairLogoSize, { mark: string; text: string }> = {
  sm: { mark: "size-9", text: "text-lg" },
  md: { mark: "size-10", text: "text-xl" },
  lg: { mark: "size-12", text: "text-2xl" },
};

const RecordairLogo = ({
  as: LinkComponent = "a",
  href,
  size = "md",
  inverted = false,
  label = "Record'air",
  className,
  ...rest
}: RecordairLogoProps) => {
  const sizeClass = sizeClasses[size];
  const content = (
    <>
      <RecordairMark className={sizeClass.mark} />
      <span
        className={[
          "font-bold tracking-tight",
          sizeClass.text,
          inverted ? "text-neutral-0" : "text-neutral-900",
        ].join(" ")}
      >
        {label}
      </span>
    </>
  );
  const rootClassName = ["inline-flex items-center gap-2", className]
    .filter(Boolean)
    .join(" ");

  if (!href) {
    return <span className={rootClassName}>{content}</span>;
  }

  return (
    <LinkComponent href={href} className={rootClassName} {...rest}>
      {content}
    </LinkComponent>
  );
};

RecordairLogo.displayName = "RecordairLogo";

export { RecordairLogo };
export type { RecordairLogoProps, RecordairLogoSize };
