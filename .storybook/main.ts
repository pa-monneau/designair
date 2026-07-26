import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-docs"), getAbsolutePath("@storybook/addon-a11y")],
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
    return viteConfig;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
