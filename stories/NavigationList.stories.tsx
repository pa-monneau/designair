import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationList } from "@recordair/ui-core";
import { CalendarDaysIcon, HouseIcon, SettingsIcon, UserIcon } from "@recordair/ui-core/icons";

const items = [
  { href: "/dashboard", label: "Tableau de bord", leadingIcon: <HouseIcon className="size-5" />, exact: true },
  { href: "/dashboard/reservations", label: "Réservations", leadingIcon: <CalendarDaysIcon className="size-5" />, badge: 3 },
  { href: "/dashboard/profile", label: "Profil", leadingIcon: <UserIcon className="size-5" /> },
  { href: "/dashboard/settings", label: "Paramètres", leadingIcon: <SettingsIcon className="size-5" /> },
];

/**
 * Liste de liens verticale (icône + label + badge), état actif basé sur
 * `activeHref` (préfixe de route, sauf ancres `#...` jamais actives). Rend
 * `<a>` par défaut ; passer `as` (ex. le `Link` localisé d'un routeur
 * applicatif) pour naviguer sans rechargement complet. Base de
 * `MobileNavigation` (menu hamburger).
 */
const meta = {
  title: "Core/Navigation/Navigation list",
  component: NavigationList,
  tags: ["autodocs"],
  argTypes: {
    items: {
      description:
        "Liens à afficher : `{ href, label, badge?, leadingIcon?, exact? }[]`. `exact` force un match strict (sinon les sous-routes de `href` sont aussi actives).",
      control: false,
    },
    activeHref: {
      description: "Route courante — détermine quel item est mis en avant (`aria-current`).",
      control: "text",
    },
    label: {
      description: "Nom accessible de la liste (`aria-label` du `<nav>`).",
      control: "text",
    },
    tone: {
      description: "Palette de l'état actif/inactif.",
      control: "radio",
      options: ["brand", "inverted"],
    },
    as: {
      description:
        "Composant de lien à utiliser à la place de `<a>` (ex. le `Link` localisé d'un routeur applicatif). Même convention que `RecordairLogo`.",
      control: false,
    },
    collapsed: {
      description:
        "Rail icône seule : le label est masqué et repris en tooltip natif (`title`). Pour une sidebar repliable.",
      control: "boolean",
    },
    className: {
      description: "Classes additionnelles sur le `<nav>`.",
      control: "text",
    },
  },
  args: {
    items,
    activeHref: "/dashboard/reservations",
    label: "Navigation du compte",
    tone: "brand",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NavigationList>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args) => <div className="w-[var(--size-sidebar)]"><NavigationList {...args} /></div>,
};

const Inverted: Story = {
  name: "Ton inversé (fond sombre)",
  args: { tone: "inverted" },
  render: (args) => (
    <div className="w-[var(--size-sidebar)] rounded-lg bg-surface-inverted p-2">
      <NavigationList {...args} />
    </div>
  ),
};

const Collapsed: Story = {
  name: "Replié (rail icône seule)",
  args: { collapsed: true },
  render: (args) => (
    <div className="w-[var(--size-sidebar-collapsed)]">
      <NavigationList {...args} />
    </div>
  ),
};

export default meta;
export { Collapsed, Default, Inverted };
