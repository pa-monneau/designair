import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    // Le % de couverture rapporté ici reste actuellement à 0 malgré une
    // exécution réelle vérifiée manuellement (composants rendus, assertions
    // a11y qui échouent bien sur du vrai DOM) — probable isolation de
    // window.__coverage__/CDP entre l'iframe preview Storybook et la page
    // Vitest. Piste non résolue, cf. Etat.md. Les tests eux-mêmes font foi ;
    // ce report est pour l'instant indicatif seulement.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['packages/ui-core/src/**/*.{ts,tsx}', 'packages/ui-patterns/src/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.tsx', '**/index.ts', '**/types.ts'],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
