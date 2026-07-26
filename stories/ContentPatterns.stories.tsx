import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, KeyValue } from "@recordair/ui-core";
import { CircleHelpIcon } from "@recordair/ui-core/icons";
import {
  DetailCard as DetailCardComponent,
  ErrorState as ErrorStateComponent,
  FormCard as FormCardComponent,
  FormRow as FormRowComponent,
  Metric as MetricComponent,
  ProfileSectionCard as ProfileSectionCardComponent,
  StatusPill as StatusPillComponent,
} from "@recordair/ui-patterns";

/**
 * Structure de contenu générique, partagée entre Record'air, Home'air et
 * Bi'air : `FormRow`/`FormCard` (structure de formulaire), `ProfileSectionCard`
 * (section de profil), `DetailCard` (récapitulatif clé/valeur), `ErrorState`
 * (page d'erreur), `Metric` (indicateur chiffré compact), `StatusPill`
 * (pastille de statut — alias fin de `Badge`, sans les tailles `xs`/`dot`,
 * voir Core/Data display/Badge pour ces variantes).
 */
const meta = {
  title: "Patterns/Content and data",
  parameters: { layout: "padded" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Overview: Story = {
  render: () => (
    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
      <FormCardComponent title="Informations" subtitle="Données visibles publiquement.">
        <div className="py-5"><FormRowComponent label="Nom" htmlFor="pattern-name" last><Input id="pattern-name" /></FormRowComponent></div>
      </FormCardComponent>
      <DetailCardComponent title="Récapitulatif" description="Résumé d'une action en attente de confirmation">
        <dl className="grid gap-3">
          <KeyValue label="Référence" value="#4821" />
          <KeyValue label="Statut" value="En attente" />
          <KeyValue label="Total" value="160 €" />
        </dl>
      </DetailCardComponent>
      <div className="grid grid-cols-3 gap-6 rounded-lg border border-neutral-200 bg-neutral-0 p-6">
        <MetricComponent label="Volume" value="31" supportingText="Ce mois-ci" />
        <MetricComponent label="Taux" value="68 %" supportingText="+6 points" />
        <MetricComponent label="Revenu" value="4 280 €" supportingText="Net" />
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-0 p-6">
        <StatusPillComponent label="Vérifié" tone="success" />
        <StatusPillComponent label="En attente" tone="warning" />
        <StatusPillComponent label="Refusé" tone="error" />
      </div>
    </div>
  ),
};

const DetailCard: Story = {
  render: () => <div className="w-96"><DetailCardComponent title="Détail"><KeyValue label="Total" value="160 €" /></DetailCardComponent></div>,
};

const ErrorState: Story = {
  render: () => <ErrorStateComponent code="404" icon={<CircleHelpIcon className="size-12" />} title="Page introuvable" description="Cette page n’existe pas ou a été déplacée." actions={[{ label: "Retour à l’accueil", href: "#" }, { label: "Réessayer", variant: "secondary", onClick: () => undefined }]} />,
};

const FormCard: Story = {
  render: () => <div className="w-full max-w-content-md"><FormCardComponent title="Informations" subtitle="Données visibles publiquement."><div className="py-5">Contenu du formulaire</div></FormCardComponent></div>,
};

const FormRow: Story = {
  render: () => <div className="w-[44rem]"><FormRowComponent label="Nom public" htmlFor="pattern-name" last><Input id="pattern-name" /></FormRowComponent></div>,
};

const Metric: Story = {
  render: () => <MetricComponent label="Revenu net" value="4 280 €" supportingText="Ce mois-ci" />,
};

const ProfileSectionCard: Story = {
  render: () => (
    <div className="w-[40rem]">
      <ProfileSectionCardComponent title="Informations" subtitle="Données visibles publiquement.">
        <FormRowComponent label="Nom" htmlFor="profile-name" last><Input id="profile-name" /></FormRowComponent>
      </ProfileSectionCardComponent>
    </div>
  ),
};

const StatusPill: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusPillComponent label="Vérifié" tone="success" />
      <StatusPillComponent label="En attente" tone="warning" />
      <StatusPillComponent label="Refusé" tone="error" />
    </div>
  ),
};

export default meta;
export {
  DetailCard,
  ErrorState,
  FormCard,
  FormRow,
  Metric,
  Overview,
  ProfileSectionCard,
  StatusPill,
};
