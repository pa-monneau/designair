import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceTag } from "@recordair/ui-core";

/**
 * Ligne de prix "À partir de **80€** /heure" : préfixe + montant en gras +
 * suffixe, sur une seule ligne qui wrap proprement si la place manque. Le
 * formatage du montant (devise, arrondi) et la traduction du préfixe/suffixe
 * restent à la charge de l'appelant.
 */
const meta = {
  title: "Core/Data display/Price tag",
  component: PriceTag,
  tags: ["autodocs"],
  argTypes: {
    prefix: {
      description: "Texte avant le montant (ex. \"À partir de\"). Omis si absent.",
      control: "text",
    },
    amount: {
      description: "Montant déjà formaté par l'appelant (ex. \"80€\").",
      control: "text",
    },
    suffix: {
      description: "Texte après le montant (ex. \"/heure\"). Omis si absent.",
      control: "text",
    },
    size: {
      description: "Taille du texte et du montant.",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    className: {
      description: "Classes additionnelles sur le conteneur (`<p>`).",
      control: "text",
    },
  },
  args: {
    prefix: "À partir de",
    amount: "80€",
    suffix: "/heure",
    size: "md",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PriceTag>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Small: Story = {
  name: "sm — card compacte (favoris)",
  args: { size: "sm" },
};

const Medium: Story = {
  name: "md — card studio",
  args: { size: "md" },
};

const Large: Story = {
  name: "lg — sidebar réservation",
  args: { size: "lg" },
};

const AmountOnly: Story = {
  name: "Montant seul (sans préfixe ni suffixe)",
  args: { prefix: undefined, suffix: undefined },
};

export default meta;
export { Default, Small, Medium, Large, AmountOnly };
