import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest")
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

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
