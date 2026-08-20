import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Alert, Button, Modal, Skeleton, Spinner, Toast } from "@recordair/ui-core";

const ModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Ouvrir la modale</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeLabel="Fermer" labelledBy="standalone-modal-title">
        <h2 id="standalone-modal-title" className="text-heading-sm font-semibold">Confirmer la réservation</h2>
        <p className="mt-2 text-sm text-neutral-600">Le créneau sera bloqué pendant quinze minutes.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={() => setOpen(false)}>Confirmer</Button>
        </div>
      </Modal>
    </>
  );
};

/**
 * États de retour utilisateur : `Alert` (bandeau `tone` info/success/warning/
 * error), `Modal` (focus contenu, revient au déclencheur à la fermeture),
 * `Toast` (notification éphémère, `variant` + `onClose`), `Spinner` et
 * `Skeleton` (chargement).
 */
const meta = {
  title: "Core/Feedback/Overview",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Catalog: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Alert tone="info" title="Information">La réservation reste modifiable pendant 15 minutes.</Alert>
        <Alert tone="success" title="Paiement confirmé">Le studio a reçu la demande.</Alert>
        <Alert tone="warning" title="Action requise">Ajoute un moyen de paiement.</Alert>
        <Alert tone="error" title="Échec du paiement">Vérifie les informations de carte.</Alert>
      </div>
      <div className="flex items-center gap-4">
        <Spinner label="Chargement" />
        <div className="w-56 space-y-2"><Skeleton /><Skeleton className="w-2/3" /></div>
      </div>
    </div>
  ),
};

const AlertStory: Story = {
  name: "Alert",
  render: () => <div className="w-[32rem]"><Alert tone="success" title="Paiement confirmé">La réservation est enregistrée.</Alert></div>,
};

const ModalStory: Story = {
  name: "Modal",
  render: () => <ModalExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Ouvrir la modale" });
    await userEvent.click(trigger);
    const page = within(document.body);
    await expect(page.getByRole("dialog")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(page.queryByRole("dialog")).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

const ToastStory: Story = {
  name: "Toast",
  render: () => <Toast open variant="success" message="Modifications enregistrées." closeLabel="Fermer" onClose={() => undefined} />,
};

const SpinnerStory: Story = {
  name: "Spinner",
  render: () => <Spinner label="Chargement" size="lg" />,
};

const SkeletonStory: Story = {
  name: "Skeleton",
  render: () => <div className="w-80 space-y-3"><Skeleton shape="rectangle" /><Skeleton /><Skeleton className="w-2/3" /></div>,
};

export default meta;
export { AlertStory, Catalog, ModalStory, SkeletonStory, SpinnerStory, ToastStory };
