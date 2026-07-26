import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, MenuButton } from "@recordair/ui-core";
import { LogOutIcon, SettingsIcon, UserIcon } from "@recordair/ui-core/icons";

const menuItemClassName =
  "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-fg-primary transition-colors hover:bg-line-subtle";

const MenuItems = () => (
  <>
    <a href="#profile" className={menuItemClassName}>
      <UserIcon aria-hidden className="size-[18px]" />
      Profil
    </a>
    <a href="#settings" className={menuItemClassName}>
      <SettingsIcon aria-hidden className="size-[18px]" />
      Paramètres
    </a>
    <div className="my-1 h-px bg-line" />
    <button type="button" className={`${menuItemClassName} w-full text-error-text hover:bg-error-bg`}>
      <LogOutIcon aria-hidden className="size-[18px]" />
      Déconnexion
    </button>
  </>
);

/**
 * Bouton (stylé comme un `Button` du DS) qui déroule un menu de contenu
 * libre. Encapsule l'état d'ouverture, la fermeture au clic extérieur et à
 * `Escape`, et l'ARIA (`aria-haspopup="menu"`). Le menu se ferme
 * automatiquement après un clic sur un `button` ou un lien enfant — pour un
 * `<form action>` de déconnexion, préférer `startTransition` à une soumission
 * native (le démontage coupe la requête avant qu'elle ne parte).
 */
const meta = {
  title: "Core/Actions/Menu button",
  component: MenuButton,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Contenu du bouton déclencheur.",
      control: false,
    },
    children: {
      description: "Contenu du panneau (items, formulaires, liens — libre).",
      control: false,
    },
    variant: {
      description: "Palette du déclencheur, mêmes valeurs que `Button`.",
      control: "select",
      options: ["primary", "secondary", "ghost", "soft", "danger", "tinted", "subtle"],
    },
    size: {
      description: "Hauteur et padding du déclencheur.",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    shape: {
      description: "Coins arrondis (`default`) ou capsule complète (`pill`).",
      control: "radio",
      options: ["default", "pill"],
    },
    block: {
      description: "Déclencheur pleine largeur ; force `align=\"stretch\"` par défaut.",
      control: "boolean",
    },
    align: {
      description: "Alignement du panneau sous le déclencheur. `stretch` = même largeur que le déclencheur.",
      control: "radio",
      options: ["start", "end", "stretch"],
    },
    showChevron: {
      description: "Chevron indicateur d'ouverture après `label`. À désactiver pour un déclencheur icône seule.",
      control: "boolean",
    },
    iconOnly: {
      description: "Déclencheur carré sans padding horizontal (ex. avatar seul), comme `IconButton`.",
      control: "boolean",
    },
    className: {
      description: "Classes additionnelles sur le conteneur racine (positionnement, largeur max).",
      control: "text",
    },
    menuClassName: {
      description: "Classes additionnelles sur le panneau déroulant (largeur, hauteur max, scroll).",
      control: "text",
    },
  },
  args: {
    variant: "tinted",
    shape: "pill",
    align: "end",
    showChevron: true,
    iconOnly: false,
    label: (
      <span className="flex items-center gap-2">
        <Avatar name="Alex Martin" size="sm" />
        <span>Alex Martin</span>
      </span>
    ),
    children: <MenuItems />,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MenuButton>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const IconOnly: Story = {
  name: "Déclencheur icône seule (mobile)",
  args: {
    showChevron: false,
    iconOnly: true,
    label: <Avatar name="Alex Martin" size="sm" />,
  },
};

export default meta;
export { Default, IconOnly };
