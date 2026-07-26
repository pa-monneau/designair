import { useId } from "react";
import type { SVGProps } from "react";

type RecordairMarkProps = SVGProps<SVGSVGElement>;

const RecordairMark = (props: RecordairMarkProps) => {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Record'air" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-brand-gradient-from)" />
          <stop offset="1" stopColor="var(--color-brand-gradient-to)" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="8" fill={`url(#${gradientId})`} />
      <g fill="var(--color-neutral-0)">
        <rect x="18.5" y="29" width="3" height="14" rx="1.5" />
        <rect x="24.5" y="21" width="3" height="22" rx="1.5" />
        <rect x="30.5" y="32" width="3" height="11" rx="1.5" />
        <rect x="36.5" y="23" width="3" height="20" rx="1.5" />
        <rect x="42.5" y="35" width="3" height="8" rx="1.5" />
      </g>
    </svg>
  );
};

RecordairMark.displayName = "RecordairMark";

export { RecordairMark };
export type { RecordairMarkProps };
