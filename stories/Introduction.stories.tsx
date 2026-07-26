import type { Meta, StoryObj } from "@storybook/react-vite";

const packages = [
  {
    name: "@recordair/theme-recordair",
    role: "Tokens Tailwind CSS v4 : couleurs sémantiques, espacement, typographie, rayons, ombres. Aucune couleur ni taille ne doit jamais être écrite en dur dans une app consommatrice — toujours passer par un token.",
  },
  {
    name: "@recordair/ui-core",
    role: "Primitives d'interface sans connaissance métier : boutons, champs de formulaire, feedback, navigation, cartes, icônes. Utilisable tel quel dans n'importe quelle app.",
  },
  {
    name: "@recordair/ui-patterns",
    role: "Assemblages construits avec ui-core (en-têtes de page, cartes de contenu, tableaux de bord). La majorité est générique et partagée ; une section \"Record'air specific\", clairement isolée, documente les quelques composants couplés au domaine métier de Record'air.",
  },
] as const;

const sections = [
  { title: "Foundations", description: "Les tokens visuels (couleurs, espacement, typographie, rayons, ombres) — la source de vérité que tout composant consomme." },
  { title: "Core", description: "Primitives d'interface génériques (ui-core). Aucune ne dépend du domaine métier d'une app en particulier." },
  { title: "Patterns", description: "Assemblages génériques (ui-patterns) réellement partagés entre Record'air, Home'air et Bi'air." },
  { title: "Record'air specific", description: "Composants de ui-patterns couplés au domaine métier ou à la marque Record'air (studios, réservations, rôles artiste/studio/pro, logo). Documentés séparément pour ne jamais être confondus avec les patterns génériques." },
] as const;

const IntroductionPage = () => (
  <div className="mx-auto grid max-w-3xl gap-12 py-4">
    <section className="grid gap-3">
      <h1 className="text-display-lg font-black text-neutral-900">Design'air</h1>
      <p className="text-body leading-copy text-neutral-700">
        Lib UI React/TypeScript partagée entre <strong>Record'air</strong>, <strong>Home'air</strong> et{" "}
        <strong>Bi'air</strong>. Née comme design system extrait de Record'air, elle est aujourd'hui consommée par
        les trois apps : tout composant réutilisable s'y ajoute, jamais dupliqué localement dans une app
        consommatrice.
      </p>
      <p className="text-body leading-copy text-neutral-700">
        Publiée sous le scope npm historique <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-caption text-neutral-800">@recordair</code> — conservé tel quel pour ne pas casser les
        packages déjà publiés, même si la lib elle-même n'est plus scopée à un seul produit.
      </p>
    </section>

    <section className="grid gap-4">
      <h2 className="text-heading-lg font-bold text-neutral-900">Installation</h2>
      <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-0"><code>{`npm install @recordair/ui-core @recordair/ui-patterns @recordair/theme-recordair`}</code></pre>
      <p className="text-body-sm text-neutral-600">Prérequis : React 18.2+, Tailwind CSS v4. Le thème s'importe une fois, côté CSS global :</p>
      <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-0"><code>{`@import "tailwindcss";\n@import "@recordair/theme-recordair";`}</code></pre>
    </section>

    <section className="grid gap-4">
      <h2 className="text-heading-lg font-bold text-neutral-900">Architecture — 3 packages</h2>
      <div className="grid gap-3">
        {packages.map((pkg) => (
          <div key={pkg.name} className="rounded-lg border border-neutral-200 bg-neutral-0 p-5">
            <code className="text-label font-semibold text-brand-primary">{pkg.name}</code>
            <p className="mt-2 text-body-sm leading-copy text-neutral-600">{pkg.role}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="grid gap-4">
      <h2 className="text-heading-lg font-bold text-neutral-900">Comment naviguer cette documentation</h2>
      <div className="grid gap-3">
        {sections.map((section) => (
          <div key={section.title} className="rounded-lg border border-neutral-200 bg-neutral-0 p-5">
            <span className="text-label font-semibold text-neutral-900">{section.title}</span>
            <p className="mt-2 text-body-sm leading-copy text-neutral-600">{section.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="grid gap-3 rounded-lg border border-neutral-200 bg-neutral-0 p-6">
      <h2 className="text-heading-lg font-bold text-neutral-900">Règle de conception</h2>
      <p className="text-body-sm leading-copy text-neutral-600">
        Aucune valeur en dur (couleur, espacement, taille) dans un composant ou une app consommatrice — toujours un
        token issu de <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-caption text-neutral-800">theme-recordair</code>. Un composant réutilisable ajouté par une app se fait dans ce
        repo, jamais dupliqué localement.
      </p>
    </section>
  </div>
);

const meta = {
  title: "Introduction/Overview",
  component: IntroductionPage,
  parameters: {
    layout: "padded",
    previewTabs: {
      canvas: { hidden: false },
    },
  },
} satisfies Meta<typeof IntroductionPage>;

type Story = StoryObj<typeof meta>;

const Overview: Story = {};

export default meta;
export { Overview };
