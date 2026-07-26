"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { classNames } from "./classNames";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  labelledBy?: string;
  describedBy?: string;
  panelClassName?: string;
  children: ReactNode;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const Modal = ({
  open,
  onClose,
  closeLabel,
  labelledBy,
  describedBy,
  panelClassName,
  children,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;

    document.body.style.overflow = "hidden";
    (panel?.querySelector(focusableSelector) as HTMLElement | null)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/50"
      />
      <div
        ref={panelRef}
        className={classNames(
          "relative z-10 flex w-full flex-col rounded-xl bg-neutral-0 shadow-xl",
          panelClassName ?? "max-w-lg p-8",
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

Modal.displayName = "Modal";

export { Modal };
export type { ModalProps };
