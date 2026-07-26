import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationCard, Pagination, Stepper } from "@recordair/ui-patterns";

/**
 * Recherche et progression, générique — partagé entre Record'air, Home'air
 * et Bi'air : `Stepper` (progression multi-étapes contrôlée), `Pagination`
 * (résultats de recherche paginés), `NotificationCard` (notification
 * dismissible avec état lu/non lu).
 */
const meta = {
  title: "Patterns/Search and progress",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Overview: Story = {
  render: function Overview() {
    const [notificationVisible, setNotificationVisible] = useState(true);

    return (
      <div className="grid w-full max-w-5xl gap-10">
        <Stepper
          currentStep={2}
          ariaLabel="Progression"
          completedStepLabel="Étape terminée"
          steps={[
            { id: "step-1", eyebrow: "Étape 1", label: "Sélection" },
            { id: "step-2", eyebrow: "Étape 2", label: "Paiement" },
            { id: "step-3", eyebrow: "Étape 3", label: "Confirmation" },
          ]}
        />
        {notificationVisible ? (
          <NotificationCard
            notification={{
              id: "notification-1",
              title: "Nouvelle notification",
              subtitle: "Samedi 22 juin à 14 h",
              read: false,
            }}
            unreadLabel="Non lue"
            deleteLabel="Supprimer la notification"
            onOpen={() => undefined}
            onDelete={() => setNotificationVisible(false)}
          />
        ) : null}
        <Pagination
          currentPage={4}
          totalPages={12}
          totalResults={128}
          hrefForPage={(page) => `#page-${page}`}
          labels={{
            navigation: "Pagination des résultats",
            previous: "Page précédente",
            next: "Page suivante",
            page: (page) => `Page ${page}`,
            status: (current, total, results) => `Page ${current} sur ${total}, ${results} résultats`,
          }}
        />
      </div>
    );
  },
};

const NotificationCardStory: Story = {
  name: "NotificationCard",
  render: () => (
    <div className="w-[36rem]">
      <NotificationCard
        notification={{ id: "notification-1", title: "Nouvelle notification", subtitle: "Samedi 22 juin à 14 h", read: false }}
        unreadLabel="Non lue"
        deleteLabel="Supprimer"
        onOpen={() => undefined}
        onDelete={() => undefined}
      />
    </div>
  ),
};

const PaginationStory: Story = {
  name: "Pagination",
  render: () => (
    <Pagination
      currentPage={4}
      totalPages={12}
      totalResults={128}
      hrefForPage={(page) => `#page-${page}`}
      labels={{
        navigation: "Pagination des résultats",
        previous: "Page précédente",
        next: "Page suivante",
        page: (page) => `Page ${page}`,
        status: (current, total, results) => `Page ${current} sur ${total}, ${results} résultats`,
      }}
    />
  ),
};

const StepperStory: Story = {
  name: "Stepper",
  render: () => (
    <div className="w-[48rem]">
      <Stepper
        currentStep={2}
        ariaLabel="Progression"
        completedStepLabel="Étape terminée"
        steps={[
          { id: "step-1", eyebrow: "Étape 1", label: "Sélection" },
          { id: "step-2", eyebrow: "Étape 2", label: "Paiement" },
          { id: "step-3", eyebrow: "Étape 3", label: "Confirmation" },
        ]}
      />
    </div>
  ),
};

export default meta;
export { NotificationCardStory, Overview, PaginationStory, StepperStory };
