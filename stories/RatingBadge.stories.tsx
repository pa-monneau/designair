import type { Meta, StoryObj } from "@storybook/react-vite";
import { RatingBadge } from "@recordair/ui-core";

/**
 * Étoile + note en ligne (ex. "4,8 (12)") — le pattern réellement utilisé sur
 * les cards studio, la fiche studio, le tunnel de réservation et la
 * messagerie Record'air. Distinct de `RatingStars` (rangée de 5 étoiles) :
 * `RatingBadge` affiche une seule étoile à côté d'un texte déjà formaté par
 * l'appelant (traduction, arrondi... restent côté app).
 */
const meta = {
  title: "Core/Data display/Rating badge",
  component: RatingBadge,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Texte déjà formaté par l'appelant (ex. \"4,8 (12 avis)\" ou juste \"4,8\").",
      control: "text",
    },
    size: {
      description: "Taille de l'icône et du texte.",
      control: "radio",
      options: ["sm", "md"],
    },
    className: {
      description: "Classes additionnelles sur le conteneur (`<span>`).",
      control: "text",
    },
  },
  args: {
    label: "4,8 (12)",
    size: "sm",
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toujours passer un `label` déjà traduit/formaté — ce composant ne fait aucun calcul de note ni de pluriel.",
      },
    },
  },
} satisfies Meta<typeof RatingBadge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Small: Story = {
  args: { size: "sm", label: "4,8 (12)" },
};

const Medium: Story = {
  args: { size: "md", label: "4,8 (12)" },
};

const WithoutCount: Story = {
  name: "Sans nombre d'avis",
  args: { label: "4,8" },
};

export default meta;
export { Default, Small, Medium, WithoutCount };
