type DividerProps = {
  label?: string;
};

const Divider = ({ label }: DividerProps) => {
  if (!label) {
    return <hr className="h-px w-full border-0 bg-neutral-200" />;
  }

  return (
    <div className="flex items-center gap-3 text-neutral-400">
      <span className="h-px flex-1 bg-neutral-200" />
      <span className="text-xs font-medium tracking-wider">{label}</span>
      <span className="h-px flex-1 bg-neutral-200" />
    </div>
  );
};

Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };
