import { CheckIcon, UserIcon, XIcon } from "@recordair/ui-core/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationCard, NotificationToast } from "@recordair/ui-patterns";

/**
 * `NotificationCard` (entrée de liste persistante, `/notifications`) et
 * `NotificationToast` (encart éphémère ancré en haut à droite, style
 * notification système) — partagent le même contrat d'action optionnelle
 * (`icon`/`label`/`tone`/`onClick`), pour qu'une notification actionnable
 * (ex. demande d'ami) s'affiche de façon cohérente aux deux endroits. Les
 * deux forcent leurs propres tokens dark-aware (`!important`, cf. commentaire
 * dans `NotificationCard.tsx`) car ils composent `Card`, dont les valeurs par
 * défaut ne le sont pas.
 */
const meta = {
  title: "Patterns/Notifications",
  parameters: { layout: "padded" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const friendRequestActions = [
  { icon: CheckIcon, label: "Accepter", tone: "success" as const, onClick: () => undefined },
  { icon: XIcon, label: "Refuser", tone: "danger" as const, onClick: () => undefined },
];

const ThemedPair = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-6 sm:grid-cols-2">
    <div data-theme="light" className="rounded-xl bg-surface-page p-6">
      {children}
    </div>
    <div data-theme="dark" className="rounded-xl bg-surface-page p-6">
      {children}
    </div>
  </div>
);

const CardOverview: Story = {
  name: "NotificationCard",
  render: () => (
    <ThemedPair>
      <div className="flex flex-col gap-2">
        <NotificationCard
          notification={{ id: "1", title: "Nouvelle demande d'ami", subtitle: "kingoutest", read: false }}
          unreadLabel="Non lue"
          deleteLabel="Supprimer"
          Icon={UserIcon}
          onOpen={() => undefined}
          onDelete={() => undefined}
          actions={friendRequestActions}
        />
        <NotificationCard
          notification={{ id: "2", title: "Demande d'ami acceptée", subtitle: "kingoutest", read: true }}
          unreadLabel="Non lue"
          deleteLabel="Supprimer"
          onOpen={() => undefined}
          onDelete={() => undefined}
        />
      </div>
    </ThemedPair>
  ),
};

const ToastOverview: Story = {
  name: "NotificationToast",
  render: () => (
    // `contain: layout` crée un bloc de confinement pour la position `fixed`
    // du toast (ancrage réel en haut à droite du viewport applicatif) : sans
    // ça, les deux instances se superposeraient au même endroit de l'écran
    // Storybook au lieu de rester chacune dans sa colonne de démo.
    <div className="grid gap-6 sm:grid-cols-2">
      <div
        data-theme="light"
        className="relative h-56 overflow-hidden rounded-xl bg-surface-page"
        style={{ contain: "layout" }}
      >
        <NotificationToast
          title="Nouvelle demande d'ami"
          subtitle="kingoutest"
          Icon={UserIcon}
          actions={friendRequestActions}
          closeLabel="Fermer"
          onClose={() => undefined}
        />
      </div>
      <div
        data-theme="dark"
        className="relative h-56 overflow-hidden rounded-xl bg-surface-page"
        style={{ contain: "layout" }}
      >
        <NotificationToast
          title="Nouvelle demande d'ami"
          subtitle="kingoutest"
          Icon={UserIcon}
          actions={friendRequestActions}
          closeLabel="Fermer"
          onClose={() => undefined}
        />
      </div>
    </div>
  ),
};

const ToastGeneric: Story = {
  name: "NotificationToast (sans actions)",
  render: () => (
    <div
      className="relative h-40 overflow-hidden rounded-xl bg-surface-page"
      data-theme="dark"
      style={{ contain: "layout" }}
    >
      <NotificationToast title="Demande d'ami acceptée" subtitle="kingoutest" closeLabel="Fermer" onClose={() => undefined} />
    </div>
  ),
};

const LongSubtitle: Story = {
  name: "Sous-titre long (repli sur deux lignes)",
  render: () => (
    // Le sous-titre se replie sur deux lignes avant d'être tronqué : un
    // message porteur d'information (ex. un titre de palier gagné) reste
    // lisible dans un toast étroit ou sur mobile, où une seule ligne le
    // coupait au milieu.
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2" data-theme="light">
        <NotificationCard
          notification={{
            id: "1",
            title: "Niveau supérieur !",
            subtitle: "Niveau 25 atteint · Nouveau titre : « Légende des soirées »",
            read: false,
          }}
          unreadLabel="Non lue"
          deleteLabel="Supprimer"
          onOpen={() => undefined}
          onDelete={() => undefined}
        />
      </div>
      <div
        className="relative h-40 overflow-hidden rounded-xl bg-surface-page"
        data-theme="dark"
        style={{ contain: "layout" }}
      >
        <NotificationToast
          title="Niveau supérieur !"
          subtitle="Niveau 25 atteint · Nouveau titre : « Légende des soirées »"
          closeLabel="Fermer"
          onClose={() => undefined}
        />
      </div>
    </div>
  ),
};

export default meta;
export { CardOverview, LongSubtitle, ToastGeneric, ToastOverview };
