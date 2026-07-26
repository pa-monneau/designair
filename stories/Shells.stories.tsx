import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, IconButton, LinkTabs } from "@recordair/ui-core";
import { BellIcon, CalendarDaysIcon, HouseIcon, SettingsIcon, UserIcon } from "@recordair/ui-core/icons";
import {
  MobileNavigation as MobileNavigationComponent,
  PageHeader as PageHeaderComponent,
  SiteHeader as SiteHeaderComponent,
} from "@recordair/ui-patterns";

const BrandPlaceholder = () => <span className="text-lg font-bold text-neutral-900">Marque</span>;

const headerTabs = [
  { href: "/item/42", label: "Aperçu" },
  { href: "/item/42/activity", label: "Activité", count: 12 },
  { href: "/item/42/reviews", label: "Avis", count: 8 },
] as const;

const navigationItems = [
  { href: "/", label: "Accueil", leadingIcon: <HouseIcon className="size-5" />, exact: true },
  { href: "/activity", label: "Activité", leadingIcon: <CalendarDaysIcon className="size-5" />, badge: 3 },
  { href: "/profile", label: "Profil", leadingIcon: <UserIcon className="size-5" /> },
  { href: "/settings", label: "Paramètres", leadingIcon: <SettingsIcon className="size-5" /> },
] as const;

/**
 * Chrome applicatif générique, partagé entre Record'air, Home'air et Bi'air :
 * `SiteHeader` (en-tête global, slots `brand`/`navigation`/`actions` — la
 * marque de chaque app se compose au niveau de l'app, pas ici),
 * `PageHeader` (en-tête de page avec retour + navigation secondaire),
 * `MobileNavigation` (menu hamburger, base = `NavigationList`, voir
 * Core/Navigation/Navigation list). La marque Record'air (`RecordairLogo`,
 * `RecordairMark`) est documentée à part, voir `Record'air specific/Identity
 * and branding`.
 */
const meta = {
  title: "Patterns/Navigation and shells",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Overview: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-12">
      <SiteHeaderComponent
        sticky={false}
        contained
        brand={<BrandPlaceholder />}
        navigation={<LinkTabs items={headerTabs} activeHref="/item/42" label="Navigation principale" />}
        actions={<><IconButton icon={<BellIcon className="size-5" />} label="Notifications" /><Button size="sm">Action principale</Button></>}
      />
      <div className="mx-auto w-full max-w-site px-8">
        <PageHeaderComponent
          title="Titre de la page"
          description="Sous-titre ou contexte"
          backLink={{ label: "Retour à la liste", href: "#" }}
          metaLink={{ label: "Voir la page publique", href: "#" }}
          navigation={<LinkTabs items={headerTabs} activeHref="/item/42/activity" label="Sections de la page" />}
        />
      </div>
    </div>
  ),
};

const SiteHeader: Story = {
  render: () => (
    <SiteHeaderComponent
      sticky={false}
      contained
      brand={<BrandPlaceholder />}
      actions={<Button size="sm">Se connecter</Button>}
    />
  ),
};

const PageHeader: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-site p-8">
      <PageHeaderComponent title="Titre de la page" description="Sous-titre ou contexte" backLink={{ label: "Retour à la liste", href: "#" }} navigation={<LinkTabs items={headerTabs} activeHref="/item/42" label="Sections de la page" />} />
    </div>
  ),
};

const MobileNavigation: Story = {
  render: () => (
    <div className="flex min-h-64 justify-end bg-neutral-0 p-8">
      <MobileNavigationComponent className="!block" items={navigationItems} activeHref="/activity" label="Ouvrir la navigation" footer={<Button size="sm" block>Se déconnecter</Button>} />
    </div>
  ),
};

export default meta;
export { MobileNavigation, Overview, PageHeader, SiteHeader };
