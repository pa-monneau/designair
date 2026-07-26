"use client";

import { useEffect, useState } from "react";
import { XIcon } from "./icons";
import { classNames } from "./classNames";

type ToastVariant = "success" | "error" | "warning" | "info";
type ToastPosition = "bottom-center" | "top-right";

type ToastProps = {
  open: boolean;
  variant: ToastVariant;
  message: string;
  closeLabel: string;
  onClose: () => void;
  duration?: number;
  position?: ToastPosition;
};

const variantClasses: Record<ToastVariant, string> = {
  success: "border-success-border bg-success-bg text-success-text",
  error: "border-error-border bg-error-bg text-error-text",
  warning: "border-warning-border bg-warning-bg text-warning-text",
  info: "border-info-border bg-info-bg text-info-text",
};

const positionClasses: Record<ToastPosition, string> = {
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "top-right": "top-6 right-6",
};

// Transform de l'état masqué (avant entrée / après sortie), selon l'ancrage.
const hiddenClasses: Record<ToastPosition, string> = {
  "bottom-center": "translate-y-2 opacity-0",
  "top-right": "translate-x-4 opacity-0",
};

// Doit rester aligné avec la classe `duration-200` ci-dessous.
const ANIMATION_MS = 200;

const Toast = ({
  open,
  variant,
  message,
  closeLabel,
  onClose,
  duration = 3500,
  position = "bottom-center",
}: ToastProps) => {
  const [rendered, setRendered] = useState(open);
  const [shown, setShown] = useState(false);

  // Montage retardé pour jouer la transition d'entrée, démontage différé après
  // la transition de sortie.
  useEffect(() => {
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => setShown(true));

      return () => cancelAnimationFrame(raf);
    }

    setShown(false);
    const timeout = window.setTimeout(() => setRendered(false), ANIMATION_MS);

    return () => window.clearTimeout(timeout);
  }, [open]);

  // Fermeture automatique : déclenche la sortie via le parent (onClose).
  useEffect(() => {
    if (!open || duration === 0) {
      return;
    }

    const timeout = window.setTimeout(onClose, duration);

    return () => window.clearTimeout(timeout);
  }, [open, duration, onClose]);

  if (!rendered) {
    return null;
  }

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={classNames("fixed z-50", positionClasses[position])}
    >
      <div
        className={classNames(
          "flex items-center gap-3 rounded-md border px-4 py-3 text-sm shadow-md transition-all duration-200 ease-out",
          variantClasses[variant],
          shown
            ? "translate-x-0 translate-y-0 opacity-100"
            : hiddenClasses[position],
        )}
      >
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="text-current opacity-60 transition-opacity hover:opacity-100"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

Toast.displayName = "Toast";

export { Toast };
export type { ToastProps, ToastVariant, ToastPosition };
