import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { MenuSelect } from "@recordair/ui-core";

const studioOptions = [
  { id: "all", label: "Tous les studios" },
  { id: "republique", label: "Studio République" },
  { id: "vieux-lille", label: "Le Vieux-Lille" },
];

const sortOptions = [
  { id: "relevance", label: "Pertinence", href: "#sort=relevance" },
  { id: "rating", label: "Le mieux noté", href: "#sort=rating" },
  { id: "price", label: "Prix croissant", href: "#sort=price" },
  {
    id: "distance",
    label: "Distance",
    href: "#sort=distance",
    disabled: true,
    disabledHint: "Active ta position pour trier par distance",
  },
];

/**
 * Menu déroulant à sélection unique. Deux modes de sélection, au choix par
 * option :
 * - `onSelect(id)` (callback) : état client pur, ex. filtrer une liste déjà
 *   chargée.
 * - `option.href` (lien, via `as`) : la sélection change l'URL — utile
 *   quand le tri/filtre est recalculé côté serveur (ex. `SortMenu` de
 *   Record'air, résultats de recherche).
 * Une option peut être désactivée (`disabled` + `disabledHint` en tooltip),
 * rendue en `<span aria-disabled>` non focusable plutôt qu'un lien/bouton.
 */
const meta = {
  title: "Core/Navigation/Menu select",
  component: MenuSelect,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Nom accessible du menu (`aria-label`/`aria-controls`).",
      control: "text",
    },
    trigger: {
      description: "Contenu visuel du déclencheur. Par défaut, affiche `label`.",
      control: false,
    },
    options: {
      description:
        "`{ id, label, disabled?, disabledHint?, href? }[]`. Une option avec `href` navigue (rendue via `as`) au lieu d'appeler `onSelect`.",
      control: false,
    },
    selectedId: {
      description: "`id` de l'option actuellement sélectionnée (surlignée en dégradé brand).",
      control: "text",
    },
    onSelect: {
      description: "Callback appelé avec l'`id` choisi — requis seulement pour les options sans `href`.",
      control: false,
    },
    as: {
      description: "Composant de lien pour les options `href` (ex. le `Link` d'un routeur). Défaut : `\"a\"`.",
      control: false,
    },
    className: {
      description: "Classes additionnelles sur le conteneur racine.",
      control: "text",
    },
  },
  args: {
    label: "Filtrer par studio",
    options: studioOptions,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MenuSelect>;

type Story = StoryObj<typeof meta>;

const WithCallback: Story = {
  name: "Sélection callback (état client)",
  render: () => {
    const [selected, setSelected] = useState("all");
    return (
      <MenuSelect
        label="Filtrer par studio"
        options={studioOptions}
        selectedId={selected}
        onSelect={setSelected}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Filtrer par studio" });
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("menuitemradio", { name: "Studio République" }));
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

const WithLinks: Story = {
  name: "Options en lien + option désactivée (tri de recherche)",
  render: () => (
    <MenuSelect
      label="Trier par"
      trigger={
        <>
          Trier par : <span className="font-semibold text-neutral-900">Pertinence</span>
        </>
      }
      options={sortOptions}
      selectedId="relevance"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dans l'app, `as={Link}` avec le `Link` localisé du routeur pour que les options naviguent sans rechargement complet. Ici, les liens pointent vers des ancres `#` pour la démo.",
      },
    },
  },
};

export default meta;
export { WithCallback, WithLinks };
