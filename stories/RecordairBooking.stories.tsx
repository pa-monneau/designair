import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChoiceChip } from "@recordair/ui-core";
import {
  BookingCard as BookingCardComponent,
  BookingChip as BookingChipComponent,
  BookingField as BookingFieldComponent,
  EmbeddedBookingCard as EmbeddedBookingCardComponent,
  ReviewCard as ReviewCardComponent,
  StudioCard as StudioCardComponent,
} from "@recordair/ui-patterns";

/**
 * **Composants métier Record'air, non génériques.** Modélisent le domaine
 * studio/réservation (`StudioCard`, `BookingCard`, `ReviewCard`,
 * `EmbeddedBookingCard`, `BookingChip`, `BookingField`) et ne sont pas
 * destinés à être réutilisés par Home'air ou Bi'air — contrairement au reste
 * de `ui-patterns` (voir `Patterns/*`), qui est générique et partagé entre
 * les 3 apps. Conservés dans le package pour l'instant (usage réel par
 * Record'air), migration vers son propre code envisagée séparément.
 */
const meta = {
  title: "Record'air specific/Booking",
  parameters: { layout: "padded" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Overview: Story = {
  render: () => (
    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2">
      <StudioCardComponent
        studio={{
          name: "Studio République",
          location: "Lille Centre",
          type: "Enregistrement",
          rating: "4,9",
          reviews: 38,
          tags: ["Voix", "Mixage", "Podcast"],
          priceLabel: "80 €",
          rateSuffix: "par heure",
          gradient: "studio",
          href: "#",
          ratingAriaLabel: "Note de 4,9 sur 5, 38 avis",
        }}
      />
      <BookingCardComponent
        detailsLabel="Voir le détail"
        booking={{
          id: "booking-1",
          studioName: "Studio République",
          studioCity: "Lille",
          durationLabel: "2 heures",
          totalLabel: "160 €",
          status: "confirmed",
          statusLabel: "Confirmée",
          href: "#",
        }}
      />
      <ReviewCardComponent
        ratingLabel="5 étoiles sur 5"
        review={{ authorName: "Camille", body: "Accueil précis, matériel prêt et excellente acoustique.", dateLabel: "juin 2026", rating: 5 }}
      />
      <EmbeddedBookingCardComponent
        eyebrow="Réservation proposée"
        title="Studio République, 22 juin"
        metadata="2 h × 80 € = 160 €"
        actionLabel="Voir la proposition"
        actionHref="#"
      />
      <div className="flex items-center gap-2">
        <BookingChipComponent active>14:00</BookingChipComponent>
        <BookingChipComponent active={false}>15:00</BookingChipComponent>
        <BookingChipComponent active={false} disabled>16:00</BookingChipComponent>
      </div>
      <BookingFieldComponent label="Type de session">
        <ChoiceChip selected>Enregistrement</ChoiceChip>
        <ChoiceChip>Répétition</ChoiceChip>
      </BookingFieldComponent>
    </div>
  ),
};

const StudioCard: Story = {
  name: "StudioCard",
  render: () => (
    <div className="w-96">
      <StudioCardComponent
        studio={{
          name: "Studio République",
          location: "Lille Centre",
          type: "Enregistrement",
          rating: "4,9",
          reviews: 38,
          tags: ["Voix", "Mixage", "Podcast"],
          priceLabel: "80 €",
          rateSuffix: "par heure",
          gradient: "studio",
          href: "#",
          ratingAriaLabel: "Note de 4,9 sur 5, 38 avis",
        }}
      />
    </div>
  ),
};

const BookingCard: Story = {
  name: "BookingCard",
  render: () => (
    <div className="w-[36rem]">
      <BookingCardComponent
        detailsLabel="Voir le détail"
        booking={{
          id: "booking-1",
          studioName: "Studio République",
          studioCity: "Lille",
          durationLabel: "2 heures",
          totalLabel: "160 €",
          status: "confirmed",
          statusLabel: "Confirmée",
          href: "#",
        }}
      />
    </div>
  ),
};

const ReviewCard: Story = {
  name: "ReviewCard",
  render: () => (
    <div className="w-96">
      <ReviewCardComponent
        ratingLabel="5 étoiles sur 5"
        review={{ authorName: "Camille", body: "Accueil précis, matériel prêt et excellente acoustique.", dateLabel: "juin 2026", rating: 5 }}
      />
    </div>
  ),
};

const EmbeddedBookingCard: Story = {
  name: "EmbeddedBookingCard",
  render: () => <EmbeddedBookingCardComponent eyebrow="Réservation proposée" title="Studio République, 22 juin" metadata="2 h × 80 € = 160 €" actionLabel="Voir la proposition" actionHref="#" />,
};

const BookingChip: Story = {
  name: "BookingChip",
  render: () => (
    <div className="flex items-center gap-2">
      <BookingChipComponent active>14:00</BookingChipComponent>
      <BookingChipComponent active={false}>15:00</BookingChipComponent>
      <BookingChipComponent active={false} disabled>16:00</BookingChipComponent>
    </div>
  ),
};

const BookingField: Story = {
  name: "BookingField",
  render: () => (
    <BookingFieldComponent label="Type de session">
      <ChoiceChip selected>Enregistrement</ChoiceChip>
      <ChoiceChip>Répétition</ChoiceChip>
    </BookingFieldComponent>
  ),
};

export default meta;
export { BookingCard, BookingChip, BookingField, EmbeddedBookingCard, Overview, ReviewCard, StudioCard };
