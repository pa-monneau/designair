import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { afterEach, beforeEach, expect, test } from "vitest";
import { page } from "vitest/browser";
import { Button } from "../../packages/ui-core/src/Button";
import { Card } from "../../packages/ui-core/src/Card";
import { CardContent } from "../../packages/ui-core/src/CardContent";
import { CardDescription } from "../../packages/ui-core/src/CardDescription";
import { CardFooter } from "../../packages/ui-core/src/CardFooter";
import { CardHeader } from "../../packages/ui-core/src/CardHeader";
import { CardTitle } from "../../packages/ui-core/src/CardTitle";
import { Field } from "../../packages/ui-core/src/Field";
import { Input } from "../../packages/ui-core/src/Input";
import { NavigationList } from "../../packages/ui-core/src/NavigationList";
import { BookingCard } from "../../packages/ui-patterns/src/BookingCard";
import "../../stories/storybook.css";

let root: Root;
let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  root.render(
    <div className="grid max-w-5xl gap-8 bg-surface-page p-8 lg:grid-cols-2">
      <section data-testid="visual-actions" className="flex flex-wrap gap-3 rounded-lg bg-surface-elevated p-6">
        <Button>Réserver</Button>
        <Button variant="secondary">Enregistrer</Button>
        <Button variant="danger">Annuler</Button>
      </section>

      <section data-testid="visual-field" className="rounded-lg bg-surface-elevated p-6">
        <Field label="Adresse email" htmlFor="visual-email" error="Cette adresse email est invalide." required>
          <Input id="visual-email" type="email" value="artiste@" readOnly invalid aria-describedby="visual-email-description" />
        </Field>
      </section>

      <section data-testid="visual-card" className="rounded-lg bg-surface-elevated p-6">
        <Card as="article" variant="elevated" padding="lg" className="max-w-md gap-3">
          <CardHeader>
            <CardTitle level={2}>Studio République</CardTitle>
            <CardDescription>Enregistrement · Lille Centre</CardDescription>
          </CardHeader>
          <CardContent>À partir de 80 € par heure.</CardContent>
          <CardFooter>
            <Button size="sm">Voir le studio</Button>
          </CardFooter>
        </Card>
      </section>

      <section data-testid="visual-navigation" className="w-80 rounded-lg bg-surface-elevated p-6">
        <NavigationList
          label="Navigation principale"
          activeHref="/bookings"
          items={[
            { href: "/dashboard", label: "Tableau de bord" },
            { href: "/bookings", label: "Réservations", badge: 3 },
            { href: "/settings", label: "Réglages" },
          ]}
        />
      </section>

      <section data-testid="visual-booking-card" className="rounded-lg bg-surface-elevated p-6 lg:col-span-2">
        <BookingCard
          detailsLabel="Voir le détail"
          booking={{
            id: "visual-booking-1",
            studioName: "Studio République",
            studioCity: "Lille",
            durationLabel: "2 heures",
            totalLabel: "160 €",
            status: "confirmed",
            statusLabel: "Confirmée",
            href: "#booking-details",
          }}
        />
      </section>
    </div>,
  );
});

afterEach(() => {
  root.unmount();
  container.remove();
});

test("préserve le rendu des composants critiques", async () => {
  await expect.element(page.getByTestId("visual-actions")).toMatchScreenshot("actions");
  await expect.element(page.getByTestId("visual-field")).toMatchScreenshot("field-error");
  await expect.element(page.getByTestId("visual-card")).toMatchScreenshot("card");
  await expect.element(page.getByTestId("visual-navigation")).toMatchScreenshot("navigation");
  await expect.element(page.getByTestId("visual-booking-card")).toMatchScreenshot("booking-card");
}, 30_000);
