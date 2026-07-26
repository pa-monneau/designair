import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@recordair/ui-core";

/**
 * Pastille (statut, catégorie, décompte). Trois tailles : `xs` (pastille de
 * statut compacte et uppercase, ex. état d'une réservation), `sm` (défaut),
 * `md`. `dot` ajoute un point de couleur avant le texte ; `pill={false}`
 * passe en coins arrondis plutôt qu'en capsule.
 */
const meta = {
  title: "Core/Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      description: "Palette de couleur.",
      control: "select",
      options: ["neutral", "brand", "success", "error", "warning", "info"],
    },
    size: {
      description: "Taille du texte et du padding. `xs` : texte uppercase compact (pastilles de statut).",
      control: "radio",
      options: ["xs", "sm", "md"],
    },
    icon: {
      description: "Icône avant le texte. Omis si absent.",
      control: false,
    },
    dot: {
      description: "Point de couleur avant le texte (et l'icône si présente).",
      control: "boolean",
    },
    pill: {
      description: "Coins arrondis en capsule (`true`, défaut) ou légèrement arrondis (`false`).",
      control: "boolean",
    },
    children: {
      description: "Texte de la pastille.",
      control: "text",
    },
  },
  args: {
    tone: "success",
    size: "sm",
    dot: false,
    pill: true,
    children: "Vérifié",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

const Default: Story = {};

const WithDot: Story = {
  name: "Avec point de couleur",
  args: { dot: true },
};

const Tones: Story = {
  name: "Toutes les tones",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Neutre</Badge>
      <Badge tone="brand">Brand</Badge>
      <Badge tone="success">Confirmée</Badge>
      <Badge tone="warning">En attente</Badge>
      <Badge tone="error">Annulée</Badge>
      <Badge tone="info">Info</Badge>
    </div>
  ),
};

const StatusPill: Story = {
  name: "xs — pastille de statut (réservations)",
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="xs" tone="success">Confirmée</Badge>
      <Badge size="xs" tone="warning">En attente</Badge>
      <Badge size="xs" tone="neutral">Terminée</Badge>
      <Badge size="xs" tone="error">Annulée</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Remplace le pattern dupliqué dans BookingRequestCard/RequestRow/BookingCard (Record'air) : `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase` codé à la main à 3 endroits légèrement différents.",
      },
    },
  },
};

export default meta;
export { Default, WithDot, Tones, StatusPill };
