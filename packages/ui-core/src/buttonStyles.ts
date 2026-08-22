import { classNames } from "./classNames";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "soft"
  | "tinted"
  | "subtle"
  | "danger"
  | "success"
  | "artist"
  | "studio"
  | "pro";
type ButtonSize = "sm" | "md" | "lg";
type ButtonShape = "default" | "pill";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  block?: boolean;
  /**
   * Carré icône seule (`size-X`, sans padding horizontal) au lieu de la
   * largeur "texte" (`h-X px-Y`) — les deux ne peuvent pas coexister sans
   * conflit d'utilitaires Tailwind (pas de merge à la `tailwind-merge` ici).
   */
  iconOnly?: boolean;
  className?: string;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[var(--size-btn-sm)] px-4 text-sm",
  md: "h-[var(--size-btn-md)] px-5 text-sm",
  lg: "h-[var(--size-btn-lg)] px-6 text-base",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: "size-[var(--size-btn-sm)] p-0",
  md: "size-[var(--size-btn-md)] p-0",
  lg: "size-[var(--size-btn-lg)] p-0",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to text-neutral-0 shadow-brand hover:brightness-110",
  secondary:
    "border-control border-line bg-surface-elevated text-fg-primary hover:bg-line-subtle",
  ghost: "bg-transparent text-fg-secondary hover:bg-line-subtle",
  soft: "bg-role-studio-bg text-role-studio-text hover:brightness-95",
  tinted: "bg-line-subtle text-fg-primary hover:bg-line",
  subtle: "bg-transparent text-fg-secondary hover:bg-line-subtle hover:text-fg-primary",
  danger: "bg-error text-neutral-0 hover:brightness-95",
  success: "bg-success text-neutral-0 hover:brightness-95",
  artist:
    "bg-gradient-to-r from-role-artist-from to-role-artist-to text-neutral-0 shadow-lg shadow-role-artist-to/30 hover:brightness-110",
  studio:
    "bg-gradient-to-r from-role-studio-from to-role-studio-to text-neutral-0 shadow-lg shadow-role-studio-from/30 hover:brightness-110",
  pro:
    "bg-gradient-to-r from-role-pro-from to-role-pro-to text-neutral-0 shadow-lg shadow-role-pro-from/30 hover:brightness-110",
};

const buttonClassName = ({
  variant = "primary",
  size = "md",
  shape = "default",
  block = false,
  iconOnly = false,
  className,
}: ButtonStyleOptions): string =>
  classNames(
    "inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-60",
    shape === "pill" ? "rounded-full" : "rounded-md",
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    variantClasses[variant],
    block && "w-full",
    className,
  );

export { buttonClassName };
export type { ButtonShape, ButtonSize, ButtonStyleOptions, ButtonVariant };
