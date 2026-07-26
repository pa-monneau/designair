import type { Meta, StoryObj } from "@storybook/react-vite";
import { MicIcon } from "@recordair/ui-core/icons";
import {
  AuthVisualPanel as AuthVisualPanelComponent,
  RecordairLogo as RecordairLogoComponent,
  RecordairMark as RecordairMarkComponent,
  RolePickerCard as RolePickerCardComponent,
  RoleBadge as RoleBadgeComponent,
} from "@recordair/ui-patterns";

/**
 * **Composants métier Record'air, non génériques.** `RoleBadge`/
 * `RolePickerCard` modélisent le modèle à 3 rôles propre à Record'air
 * (artiste / studio / pro, palette `role-{artist,studio,pro}-*`) ;
 * `RecordairLogo`/`RecordairMark` sont la marque Record'air elle-même ;
 * `AuthVisualPanel` compose `RecordairLogo` en dur. Aucun n'est destiné à
 * Home'air ou Bi'air — voir `Patterns/*` pour les patterns réellement
 * partagés entre les 3 apps.
 */
const meta = {
  title: "Record'air specific/Identity and branding",
  parameters: { layout: "padded" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Overview: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl gap-8">
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-0 p-6">
        <RecordairLogoComponent href="#" size="sm" />
        <RoleBadgeComponent role="artist" />
        <RoleBadgeComponent role="studio" />
        <RoleBadgeComponent role="pro" />
      </div>
      <div className="max-w-sm">
        <RolePickerCardComponent
          role="artist"
          href="#"
          Icon={MicIcon}
          title="Je suis artiste"
          description="Trouve et réserve le studio adapté à ton projet."
          bullets={["Comparer les studios", "Réserver un créneau", "Payer en ligne"]}
          cta="Créer mon compte"
        />
      </div>
    </div>
  ),
};

const RoleBadge: Story = {
  name: "RoleBadge",
  parameters: {
    docs: {
      description: {
        story: "Une pastille par rôle (icône + libellé). `label` permet de surcharger le texte par défaut.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <RoleBadgeComponent role="artist" />
      <RoleBadgeComponent role="studio" />
      <RoleBadgeComponent role="pro" />
    </div>
  ),
};

const RolePickerCardDefault: Story = {
  name: "RolePickerCard — action seule",
  parameters: {
    docs: {
      description: {
        story: "`interaction=\"action\"` (défaut) : seul le CTA est cliquable, le reste de la carte n'est pas un lien.",
      },
    },
  },
  render: () => (
    <div className="w-96">
      <RolePickerCardComponent
        role="artist"
        href="#"
        Icon={MicIcon}
        title="Je suis artiste"
        description="Trouve et réserve le studio adapté à ton projet."
        bullets={["Comparer les studios", "Réserver un créneau", "Payer en ligne"]}
        cta="Créer mon compte"
      />
    </div>
  ),
};

const RolePickerCardAsCard: Story = {
  name: "RolePickerCard — carte interactive",
  parameters: {
    docs: {
      description: {
        story: "`interaction=\"card\"` : toute la carte est un lien (hover/focus sur l'ensemble), sans lien imbriqué dans le CTA.",
      },
    },
  },
  render: () => (
    <div className="w-96">
      <RolePickerCardComponent
        interaction="card"
        role="artist"
        href="#"
        Icon={MicIcon}
        title="Je suis artiste"
        description="Trouve le studio adapté à ton projet."
        bullets={["Comparer les studios", "Réserver un créneau", "Payer en ligne"]}
        cta="Créer mon compte"
      />
    </div>
  ),
};

const RecordairLogo: Story = {
  name: "RecordairLogo",
  render: () => <RecordairLogoComponent href="#" />,
};

const RecordairMark: Story = {
  name: "RecordairMark",
  render: () => <RecordairMarkComponent />,
};

const AuthVisualPanel: Story = {
  name: "AuthVisualPanel",
  render: () => (
    <div className="min-h-screen bg-surface-page">
      <AuthVisualPanelComponent
        heading={["Réserve.", "Crée.", "Vibre."]}
        tagline="Trouve le studio adapté à ton projet et réserve ton prochain créneau."
        testimonial={{ quote: "Une réservation claire et un studio parfaitement équipé.", author: "Maya D.", location: "Artiste à Lille" }}
        logoHref="#"
      />
    </div>
  ),
};

export default meta;
export {
  AuthVisualPanel,
  Overview,
  RecordairLogo,
  RecordairMark,
  RoleBadge,
  RolePickerCardAsCard,
  RolePickerCardDefault,
};
