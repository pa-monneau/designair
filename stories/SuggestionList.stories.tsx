import type { Meta, StoryObj } from "@storybook/react-vite";
import { SuggestionList, SuggestionListItem } from "@recordair/ui-core";
import { HouseIcon, MapPinIcon } from "@recordair/ui-core/icons";

/**
 * Panneau flottant (`SuggestionList`) pour une liste de `SuggestionListItem`
 * — dropdown de destination/adresse. `SuggestionList` gère uniquement la
 * présentation (carte, en-tête, zone scrollable) ; le positionnement
 * (`absolute`, largeur, `open`/`close`) reste à la charge de l'appelant.
 * `SuggestionListItem` est une ligne icône + titre + sous-titre (2 lignes
 * max) : toute la ligne est cliquable et se surligne au survol.
 */
const meta = {
  title: "Core/Forms/Suggestion list",
  component: SuggestionList,
  tags: ["autodocs"],
  argTypes: {
    heading: {
      description: "Libellé au-dessus de la liste (ex. \"Suggestions de destinations\").",
      control: "text",
    },
    children: {
      description: "Un ou plusieurs `SuggestionListItem` (voir plus bas pour ses props).",
      control: false,
    },
    className: {
      description: "Classes additionnelles sur le panneau (ex. largeur, positionnement).",
      control: "text",
    },
  },
  args: {
    heading: "Suggestions de destinations",
    children: null,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SuggestionList>;

type Story = StoryObj<typeof meta>;

/**
 * `SuggestionListItem` props (pas de composant Storybook dédié — toujours
 * utilisé à l'intérieur d'un `SuggestionList`) :
 * - `icon` (ReactNode, requis) : icône affichée dans un `IconBox`.
 * - `title` (ReactNode, requis) : texte en gras, 1 ligne (`truncate`).
 * - `subtitle` (ReactNode) : texte gris, 2 lignes max (`line-clamp-2`).
 * - `tone` (`IconBoxTone`, défaut `"neutral"`) : couleur de l'`IconBox`
 *   (ex. `"brand"` pour une option mise en avant comme "à proximité").
 * - `disabled` (boolean) : désactive le clic (ex. le temps d'une géoloc).
 * - `onClick` (`() => void`) : callback au clic sur la ligne.
 * - `className` : classes additionnelles sur le `<button>`.
 */
const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <SuggestionList {...args}>
        <SuggestionListItem
          tone="brand"
          icon={<MapPinIcon />}
          title="À proximité"
          subtitle="Découvre les studios autour de toi"
          onClick={() => undefined}
        />
        <SuggestionListItem
          icon={<HouseIcon />}
          title="Lille"
          subtitle="Nord, Hauts-de-France"
          onClick={() => undefined}
        />
        <SuggestionListItem
          icon={<HouseIcon />}
          title="Lyon"
          subtitle="Rhône, Auvergne-Rhône-Alpes"
          onClick={() => undefined}
        />
      </SuggestionList>
    </div>
  ),
};

const Disabled: Story = {
  name: "Item désactivé (ex. géolocalisation en cours)",
  render: (args) => (
    <div className="w-96">
      <SuggestionList {...args}>
        <SuggestionListItem
          tone="brand"
          icon={<MapPinIcon />}
          title="À proximité"
          subtitle="Localisation en cours…"
          disabled
        />
      </SuggestionList>
    </div>
  ),
};

export default meta;
export { Default, Disabled };
