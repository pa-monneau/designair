import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion as AccordionComponent,
  ContentBlock as ContentBlockComponent,
  KeyValue as KeyValueComponent,
  RatingStars as RatingStarsComponent,
} from "@recordair/ui-core";

const accordionItems = [
  { id: "booking", title: "Comment fonctionne la réservation ?", content: "Choisis un créneau, confirme les informations puis règle en ligne." },
  { id: "cancel", title: "Puis-je annuler ?", content: "Les conditions d’annulation sont affichées avant le paiement." },
  { id: "support", title: "Comment contacter le studio ?", content: "La messagerie est disponible après l’envoi de la demande." },
] as const;

/**
 * Composants de présentation de contenu et de données : `Accordion` (FAQ,
 * `defaultOpenIds`), `KeyValue` (paire libellé/valeur dans une `<dl>`),
 * `RatingStars` (note en étoiles, `value`/`size`), `ContentBlock` (bloc
 * éditorial typé — `callout` avec `tone`, entre autres variantes).
 */
const meta = {
  title: "Core/Data display/Overview",
  parameters: { layout: "centered" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Catalog: Story = {
  render: () => (
    <div className="grid w-full max-w-content-lg gap-10">
      <AccordionComponent items={accordionItems} defaultOpenIds={["booking"]} />
      <dl className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-0 p-6">
        <KeyValueComponent label="Studio" value="Studio République" />
        <KeyValueComponent label="Créneau" value="22 juin, 14 h à 16 h" />
      </dl>
      <RatingStarsComponent value={4} label="Note de 4 sur 5" size="md" />
      <ContentBlockComponent block={{ kind: "callout", tone: "info", text: "Le paiement est sécurisé jusqu’à la confirmation du studio." }} />
    </div>
  ),
};

const Accordion: Story = {
  render: () => <AccordionComponent className="max-w-content-lg" items={accordionItems} defaultOpenIds={["booking"]} />,
};

const KeyValue: Story = {
  render: () => <dl className="w-96"><KeyValueComponent label="Durée" value="2 heures" /></dl>,
};

const RatingStars: Story = {
  render: () => <RatingStarsComponent value={4} label="Note de 4 sur 5" size="md" />,
};

const ContentBlock: Story = {
  render: () => <ContentBlockComponent className="max-w-content-md" block={{ kind: "callout", tone: "warning", text: "Une pièce d’identité pourra être demandée par le studio." }} />,
};

export default meta;
export { Accordion, Catalog, ContentBlock, KeyValue, RatingStars };
