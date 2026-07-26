import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "@recordair/ui-core";
import { BellIcon, HeartIcon, ShoppingCartIcon } from "@recordair/ui-core/icons";

/**
 * Bouton-icône rond, avec badge compteur optionnel (notifications, panier).
 * Par défaut un `<button>` (design system `Button`) ; passer `as` pour le
 * rendre comme un lien (`Link` d'un routeur) ou tout autre élément (ex.
 * `"summary"` dans un `<details>`), en conservant le même style. Voir aussi
 * `Core/Button` pour les autres variantes de boutons.
 */
const meta = {
  title: "Core/Actions/Icon button",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Icône affichée (ex. un composant de `@recordair/ui-core/icons`).",
      control: false,
    },
    label: {
      description: "Nom accessible (`aria-label`) — obligatoire, le bouton n'a pas de texte visible.",
      control: "text",
    },
    variant: {
      description: "Variante visuelle (mêmes valeurs que `Button`).",
      control: "select",
      options: ["primary", "secondary", "ghost", "soft", "danger", "artist", "studio", "pro"],
    },
    size: {
      description: "Taille (mêmes valeurs que `Button`).",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    badge: {
      description: "Nombre affiché en badge (coin haut-droit). Masqué si absent ou <= 0.",
      control: "number",
    },
    as: {
      description:
        "Élément à rendre à la place du `<button>` natif (ex. le `Link` d'un routeur pour un icon-button qui navigue, ou `\"summary\"` dans un `<details>`). Sans ce prop, le comportement `<button>` d'origine est inchangé.",
      control: false,
    },
  },
  args: {
    label: "Notifications",
    icon: <BellIcon />,
    variant: "ghost",
    size: "md",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const WithBadge: Story = {
  name: "Avec badge compteur",
  args: { badge: 3, icon: <BellIcon /> },
};

const BadgeOverflow: Story = {
  name: "Badge > 9 (affiche \"9+\")",
  args: { badge: 24, icon: <ShoppingCartIcon /> },
};

const AsLink: Story = {
  name: "Rendu comme un lien (prop `as`)",
  args: {
    as: "a",
    href: "#notifications",
    icon: <BellIcon />,
    badge: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dans l'app, `as={Link}` avec le `Link` localisé du routeur (ex. `@/i18n/navigation`) au lieu de `\"a\"`.",
      },
    },
  },
};

const AsSummary: Story = {
  name: "Rendu comme <summary> (déclencheur de <details>)",
  render: (args) => (
    <details className="relative [&_summary::-webkit-details-marker]:hidden">
      <IconButton {...args} as="summary" className="cursor-pointer list-none" />
      <div className="absolute right-0 top-12 z-10 w-48 rounded-lg border border-neutral-200 bg-neutral-0 p-3 shadow-elevated text-sm text-neutral-600">
        Contenu du panier…
      </div>
    </details>
  ),
  args: {
    icon: <ShoppingCartIcon />,
    label: "Panier",
    badge: 1,
  },
};

const Variant: Story = {
  name: "Favoris (variant secondary)",
  args: { variant: "secondary", icon: <HeartIcon />, label: "Ajouter aux favoris" },
};

export default meta;
export { Default, WithBadge, BadgeOverflow, AsLink, AsSummary, Variant };
