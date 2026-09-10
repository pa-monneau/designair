import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field } from "../../packages/ui-core/src/Field";

const input = () => screen.getByRole("textbox");

describe("Field", () => {
  it("rattache l'erreur au champ et le signale invalide", () => {
    render(
      <Field label="Email" htmlFor="email" error="Adresse invalide.">
        <input id="email" aria-label="Email" />
      </Field>,
    );

    expect(input()).toHaveAttribute("aria-describedby", "email-description");
    expect(input()).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-description");
    expect(screen.getByRole("alert")).toHaveTextContent("Adresse invalide.");
  });

  it("rattache le hint au champ sans le marquer invalide", () => {
    render(
      <Field label="Pseudo" htmlFor="handle" hint="Visible publiquement.">
        <input id="handle" aria-label="Pseudo" />
      </Field>,
    );

    expect(input()).toHaveAttribute("aria-describedby", "handle-description");
    expect(input()).not.toHaveAttribute("aria-invalid");
  });

  it("ne touche pas le champ sans erreur ni hint", () => {
    render(
      <Field label="Nom" htmlFor="name">
        <input id="name" aria-label="Nom" />
      </Field>,
    );

    expect(input()).not.toHaveAttribute("aria-describedby");
    expect(input()).not.toHaveAttribute("aria-invalid");
  });

  it("fusionne un aria-describedby déjà présent, id du Field en tête", () => {
    render(
      <Field label="Email" htmlFor="email" error="Adresse invalide.">
        <input id="email" aria-label="Email" aria-describedby="counter" />
      </Field>,
    );

    expect(input()).toHaveAttribute(
      "aria-describedby",
      "email-description counter",
    );
  });

  it("ne duplique pas l'id de description si l'enfant le porte déjà", () => {
    render(
      <Field label="Email" htmlFor="email" error="Adresse invalide.">
        <input id="email" aria-label="Email" aria-describedby="email-description" />
      </Field>,
    );

    expect(input()).toHaveAttribute("aria-describedby", "email-description");
  });

  it("force aria-invalid même si l'enfant le pose à false", () => {
    render(
      <Field label="Email" htmlFor="email" error="Adresse invalide.">
        <input id="email" aria-label="Email" aria-invalid={false} />
      </Field>,
    );

    expect(input()).toHaveAttribute("aria-invalid", "true");
  });

  it("rend un enfant non-élément tel quel sans planter", () => {
    const { rerender } = render(
      <Field label="X" htmlFor="x" error="err">
        {null}
      </Field>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(
      <Field label="X" htmlFor="x" error="err">
        texte nu
      </Field>,
    );
    expect(screen.getByText("texte nu")).toBeInTheDocument();

    rerender(
      <Field label="X" htmlFor="x" error="err">
        {[
          <input key="a" aria-label="a" />,
          <input key="b" aria-label="b" />,
        ]}
      </Field>,
    );
    // Tableau : pas un élément valide → rendu brut, aucun aria-describedby injecté.
    expect(screen.getByRole("textbox", { name: "a" })).not.toHaveAttribute(
      "aria-describedby",
    );
  });
});
