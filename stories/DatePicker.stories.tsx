import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { DatePicker } from "@recordair/ui-core";

const isWeekend = (iso: string): boolean => {
  const day = new Date(`${iso}T00:00:00Z`).getUTCDay();
  return day === 0 || day === 6;
};

/**
 * Calendrier custom (grille d'un mois, navigation par flèches, un seul jour
 * sélectionnable) — remplace `<input type="date">` pour un style homogène
 * avec le reste du design system. Contrôlé (`value`/`onChange`) ou non
 * contrôlé (`defaultValue`) ; `name` ajoute un `<input type="hidden">` pour
 * un submit de formulaire GET natif (ex. recherche par query params). Deux
 * modes : `popover` (bouton déclencheur + calendrier flottant, défaut) ou
 * `inline` (grille toujours visible, à intégrer dans un conteneur existant).
 */
const meta = {
  title: "Core/Forms/Date picker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Nom accessible du champ (`aria-label` du déclencheur et du calendrier).",
      control: "text",
    },
    locale: {
      description: "Locale Intl pour le formatage des libellés (ex. `\"fr\"`, `\"en\"`).",
      control: "text",
    },
    min: {
      description: "Borne min sélectionnable, `YYYY-MM-DD`.",
      control: "text",
    },
    max: {
      description: "Borne max sélectionnable, `YYYY-MM-DD`.",
      control: "text",
    },
    value: {
      description: "Valeur contrôlée, `YYYY-MM-DD`. Omettre pour un usage non contrôlé.",
      control: false,
    },
    defaultValue: {
      description: "Valeur initiale en mode non contrôlé.",
      control: "text",
    },
    onChange: {
      description: "Appelé avec la date choisie (`YYYY-MM-DD`).",
      control: false,
    },
    isDateDisabled: {
      description: "Désactive des jours au-delà de `min`/`max` (ex. jours complets).",
      control: false,
    },
    name: {
      description: "Si fourni, ajoute un `<input type=\"hidden\">` pour un submit de formulaire GET natif.",
      control: "text",
    },
    placeholder: {
      description: "Texte affiché quand aucune date n'est sélectionnée.",
      control: "text",
    },
    prevLabel: {
      description: "Nom accessible de la flèche mois précédent. Défaut : `\"Précédent\"`.",
      control: "text",
    },
    nextLabel: {
      description: "Nom accessible de la flèche mois suivant. Défaut : `\"Suivant\"`.",
      control: "text",
    },
    mode: {
      description: "`popover` (bouton + calendrier flottant) ou `inline` (grille toujours visible, pleine largeur).",
      control: "radio",
      options: ["popover", "inline"],
    },
    className: {
      description:
        "Classes du bouton déclencheur (mode `popover` uniquement) — le calendrier ouvert n'est pas stylable de l'extérieur.",
      control: "text",
    },
  },
  args: {
    label: "Choisir une date",
    locale: "fr",
    min: "2026-08-01",
    max: "2026-09-30",
    defaultValue: "2026-08-14",
    placeholder: "Sélectionner une date",
    mode: "popover",
    className:
      "flex h-[var(--size-btn-md)] w-72 items-center rounded-md border-control border-neutral-200 bg-neutral-0 px-4 text-sm text-neutral-900",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Choisir une date" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(canvas.getByRole("button", { name: "15" }));
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveTextContent("15 août 2026");
  },
};

const Inline: Story = {
  name: "Mode inline (intégré à un conteneur)",
  args: { mode: "inline" },
  render: (args) => <div className="w-80 rounded-lg border border-neutral-200 bg-neutral-0 p-4">{<DatePicker {...args} />}</div>,
};

const WithDisabledDates: Story = {
  name: "Avec jours désactivés (ex. week-ends complets)",
  args: {
    isDateDisabled: isWeekend,
  },
};

export default meta;
export { Default, Inline, WithDisabledDates };
