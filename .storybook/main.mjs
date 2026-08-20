import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const stripUseClientDirectiveForStorybook = {
  name: "designair:strip-use-client-directive-for-storybook",
  enforce: "pre",
  transform(code, id) {
    // Les packages publiés gardent `"use client"` pour Next.js. Storybook
    // s'exécute entièrement dans le navigateur : le retirer de son bundle
    // dédié évite que Rollup le jette lui-même avec un warning, sans modifier
    // les artefacts npm consommés par les applications.
    if (!id.includes("/packages/") || !id.includes("/dist/") || !id.endsWith(".js")) {
      return null;
    }

    const transformed = code.replace(/^["']use client["'];?\s*/, "");
    return transformed === code ? null : { code: transformed, map: null };
  },
};

/** @type {import("@storybook/react-vite").StorybookConfig} */
const config = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  // Les packages du workspace (@recordair/ui-core, @recordair/ui-patterns)
  // sont consommés depuis leur `dist/` pré-buildé : sans dedupe, Vite peut
  // pré-bundler React une seconde fois pour ce graphe de modules et créer
  // deux instances React (warning "Expected static flag was missing").
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {};
    viteConfig.resolve.dedupe = [...(viteConfig.resolve.dedupe ?? []), "react", "react-dom"];
    viteConfig.optimizeDeps ??= {};
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include ?? []),
      "@recordair/ui-core",
      "@recordair/ui-core/icons",
      "@recordair/ui-patterns",
    ];
    viteConfig.plugins = [...(viteConfig.plugins ?? []), stripUseClientDirectiveForStorybook];
    viteConfig.build ??= {};
    // Les trois chunks au-dessus de la limite Vite par défaut viennent de
    // Storybook lui-même (`iframe`, `DocsRenderer`, `axe`). Leur budget réel
    // est contrôlé après build dans `verify-storybook-bundle.mjs` ; ce seuil
    // évite que l'avertissement générique masque ce contrôle précis.
    viteConfig.build.chunkSizeWarningLimit = 1_300;
    // Le code source affiché dans la doc est dérivé du nom des composants
    // rendus. En build de production, la minification renomme les fonctions
    // (`LinkButton` devient `c`), ce qui produirait des exemples faux et non
    // copiables sur le Storybook déployé — invisible en dev, où rien n'est
    // minifié. `keepNames` préserve ces noms ; le coût de taille ne concerne
    // que le bundle de la doc, jamais les packages publiés.
    viteConfig.esbuild = {
      ...(typeof viteConfig.esbuild === "object" ? viteConfig.esbuild : {}),
      keepNames: true,
    };
    return viteConfig;
  },
};

export default config;

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
