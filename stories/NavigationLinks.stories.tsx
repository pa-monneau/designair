import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LinkTabs as LinkTabsComponent,
  MenuSelect as MenuSelectComponent,
  NavigationList as NavigationListComponent,
  ScrollAnchor as ScrollAnchorComponent,
} from "@recordair/ui-core";
import { CalendarDaysIcon, HouseIcon, SettingsIcon, UserIcon } from "@recordair/ui-core/icons";

const navigationItems = [
  { href: "/dashboard", label: "Tableau de bord", leadingIcon: <HouseIcon className="size-5" />, exact: true },
  { href: "/dashboard/reservations", label: "Réservations", leadingIcon: <CalendarDaysIcon className="size-5" />, badge: 3 },
  { href: "/dashboard/profile", label: "Profil", leadingIcon: <UserIcon className="size-5" /> },
  { href: "/dashboard/settings", label: "Paramètres", leadingIcon: <SettingsIcon className="size-5" /> },
] as const;

const tabItems = [
  { href: "/studios/42", label: "Aperçu" },
  { href: "/studios/42/bookings", label: "Réservations", count: 12 },
  { href: "/studios/42/reviews", label: "Avis", count: 8 },
] as const;

const studioOptions = [
  { id: "all", label: "Tous les studios" },
  { id: "republique", label: "Studio République" },
  { id: "vieux-lille", label: "Le Vieux-Lille" },
] as const;

/**
 * Navigation par liens : `LinkTabs` a sa propre page (voir `LinkTabs` plus
 * bas), `NavigationList` et `MenuSelect` ont chacun leur page dédiée
 * (Core/NavigationList, Core/MenuSelect) — montrés ici composés ensemble
 * dans un layout de compte. `ScrollAnchor` maintient le scroll calé en bas
 * d'une zone (ex. fil de messages) tant que l'utilisateur ne remonte pas.
 */
const meta = {
  title: "Core/Navigation/Overview",
  parameters: { layout: "padded" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Catalog: Story = {
  render: function Catalog() {
    const [selectedStudio, setSelectedStudio] = useState("all");

    return (
      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[var(--size-sidebar)_1fr]">
        <NavigationListComponent items={navigationItems} activeHref="/dashboard/reservations" label="Navigation du compte" />
        <div className="flex min-w-0 flex-col gap-8">
          <LinkTabsComponent items={tabItems} activeHref="/studios/42/bookings" label="Sections du studio" />
          <MenuSelectComponent label="Filtrer par studio" options={studioOptions} selectedId={selectedStudio} onSelect={setSelectedStudio} />
        </div>
      </div>
    );
  },
};

const LinkTabs: Story = {
  render: () => <LinkTabsComponent items={tabItems} activeHref="/studios/42/bookings" label="Sections du studio" />,
};

const ScrollAnchor: Story = {
  render: () => (
    <div className="max-h-48 w-[var(--container-content-sm)] overflow-auto rounded-lg border border-neutral-200 bg-neutral-0 p-4">
      <p className="min-h-64 text-body-sm text-neutral-600">Le point d’ancrage reste aligné sur le dernier contenu lorsque la propriété signal change.</p>
      <ScrollAnchorComponent signal="message-42" behavior="auto" />
    </div>
  ),
};

export default meta;
export { Catalog, LinkTabs, ScrollAnchor };
