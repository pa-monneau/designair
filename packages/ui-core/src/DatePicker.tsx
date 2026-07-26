"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDaysIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { classNames } from "./classNames";

type Cell = { day: number; iso: string } | null;

const pad2 = (n: number): string => String(n).padStart(2, "0");

const toIso = (year: number, month: number, day: number): string =>
  `${year}-${pad2(month + 1)}-${pad2(day)}`;

/** `YYYY-MM-DD` → `{ year, month0 }` (mois 0-indexé). */
const parseYearMonth = (iso: string): { year: number; month: number } => {
  const [y, m] = iso.split("-").map(Number);
  return { year: y, month: m - 1 };
};

const monthIndex = (year: number, month: number): number => year * 12 + month;

/** Grille du mois (lundi en première colonne), cases vides avant le 1er. */
const buildMonthGrid = (year: number, month: number): Cell[] => {
  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: Cell[] = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, iso: toIso(year, month, day) });
  }
  return cells;
};

const capitalize = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

type DatePickerProps = {
  /** Nom accessible du champ (aria-label du déclencheur et du calendrier). */
  label: string;
  /** Locale Intl pour le formatage des libellés (ex. `"fr"`, `"en"`). */
  locale: string;
  /** Borne min sélectionnable, `YYYY-MM-DD`. */
  min: string;
  /** Borne max sélectionnable, `YYYY-MM-DD`. */
  max: string;
  /** Valeur contrôlée, `YYYY-MM-DD`. Omettre pour un usage non contrôlé. */
  value?: string;
  /** Valeur initiale en mode non contrôlé. */
  defaultValue?: string;
  onChange?: (iso: string) => void;
  /** Désactive des jours au-delà de `min`/`max` (ex. jours fermés). */
  isDateDisabled?: (iso: string) => boolean;
  /** Si fourni, ajoute un `<input type="hidden">` pour un submit de formulaire GET natif. */
  name?: string;
  placeholder?: string;
  prevLabel?: string;
  nextLabel?: string;
  /** Classe du bouton déclencheur (le calendrier ouvert n'est pas stylable). */
  className?: string;
  /**
   * `"popover"` (défaut) : bouton déclencheur + calendrier flottant.
   * `"inline"` : grille toujours visible, pleine largeur, sans bouton ni
   * cadre propre (à intégrer dans un conteneur existant, ex. une Card).
   */
  mode?: "popover" | "inline";
};

/**
 * Calendrier custom (1 mois affiché, navigation flèches, sélection d'un
 * seul jour) : remplace un `<input type="date">` natif pour un style
 * homogène avec le reste du design system. Contrôlé (`value`/`onChange`)
 * ou non contrôlé (`defaultValue`) ; `name` ajoute un input hidden pour un
 * submit de formulaire GET natif (ex. recherche par query params).
 */
const DatePicker = ({
  label,
  locale,
  min,
  max,
  value,
  defaultValue = "",
  onChange,
  isDateDisabled,
  name,
  placeholder,
  prevLabel = "Précédent",
  nextLabel = "Suivant",
  className,
  mode = "popover",
}: DatePickerProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = isControlled ? (value as string) : internalValue;

  const [open, setOpen] = useState(false);
  const initial = parseYearMonth(current || min);
  const [viewYear, setViewYear] = useState(initial.year);
  const [viewMonth, setViewMonth] = useState(initial.month);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointer = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const { year: minYear, month: minMonth } = parseYearMonth(min);
  const { year: maxYear, month: maxMonth } = parseYearMonth(max);
  const minKey = monthIndex(minYear, minMonth);
  const maxKey = monthIndex(maxYear, maxMonth);
  const viewKey = monthIndex(viewYear, viewMonth);

  const goToMonth = (delta: number) => {
    const next = viewKey + delta;
    if (next < minKey || next > maxKey) return;
    setViewYear(Math.floor(next / 12));
    setViewMonth(((next % 12) + 12) % 12);
  };

  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    // 1er janvier 2024 est un lundi : point de repère pour dériver les
    // libellés localisés lundi→dimanche sans dépendre du mois affiché.
    const d = new Date(Date.UTC(2024, 0, 1 + i));
    return new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }).format(d);
  });

  const monthLabel = capitalize(
    new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(viewYear, viewMonth, 1))),
  );

  const displayValue = current
    ? capitalize(
        new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(`${current}T00:00:00Z`)),
      )
    : "";

  const chooseDay = (iso: string) => {
    if (!isControlled) setInternalValue(iso);
    onChange?.(iso);
    setOpen(false);
  };

  const cells = buildMonthGrid(viewYear, viewMonth);

  const panel = (
    <>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          disabled={viewKey <= minKey}
          aria-label={prevLabel}
          className="grid size-8 place-items-center rounded-full text-neutral-700 transition hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <p className="text-sm font-semibold text-neutral-900">{monthLabel}</p>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          disabled={viewKey >= maxKey}
          aria-label={nextLabel}
          className="grid size-8 place-items-center rounded-full text-neutral-700 transition hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {weekdayLabels.map((w, i) => (
          <span key={`${w}-${i}`} className="py-1 text-xs font-medium text-neutral-500">
            {w}
          </span>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <span key={`empty-${i}`} />;
          const disabled =
            cell.iso < min || cell.iso > max || Boolean(isDateDisabled?.(cell.iso));
          const selected = cell.iso === current;
          return (
            <button
              key={cell.iso}
              type="button"
              disabled={disabled}
              onClick={() => chooseDay(cell.iso)}
              className={classNames(
                "mx-auto grid size-9 place-items-center rounded-full text-sm transition",
                selected
                  ? "bg-brand-primary font-semibold text-neutral-0"
                  : disabled
                    ? "text-neutral-300"
                    : "text-neutral-900 hover:bg-neutral-100",
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </>
  );

  if (mode === "inline") {
    return (
      <div className="w-full">
        {name ? <input type="hidden" name={name} value={current} /> : null}
        {panel}
      </div>
    );
  }

  return (
    <div ref={boxRef} className="relative w-full">
      {name ? <input type="hidden" name={name} value={current} /> : null}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className={className}
      >
        <span className="flex w-full items-center gap-2">
          <CalendarDaysIcon aria-hidden className="size-4 shrink-0 text-neutral-500" />
          <span className="flex-1 truncate text-left">
            {displayValue || <span className="text-neutral-500">{placeholder}</span>}
          </span>
          <ChevronDownIcon
            aria-hidden
            className={classNames(
              "size-4 shrink-0 text-neutral-500 transition-transform",
              open && "rotate-180",
            )}
          />
        </span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="absolute left-0 top-full z-30 mt-2 w-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-0 p-4 shadow-elevated"
        >
          {panel}
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
export type { DatePickerProps };
