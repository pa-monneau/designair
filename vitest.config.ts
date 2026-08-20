import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    // Les sources TypeScript priment sur d'anciens artefacts JavaScript
    // ignorés par Git : les tests unitaires exercent toujours le code source
    // réellement maintenu, jamais une sortie de build locale résiduelle.
    extensions: ['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs', '.json'],
  },
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
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['tests/**/*.test.ts?(x)'],
          exclude: ['tests/visual/**'],
          setupFiles: ['tests/setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'visual',
          include: ['tests/visual/**/*.visual.test.tsx'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
            screenshotDirectory: '__screenshots__',
            expect: {
              toMatchScreenshot: {
                comparatorName: 'pixelmatch',
                comparatorOptions: {
                  allowedMismatchedPixelRatio: 0.001,
                  threshold: 0.1,
                },
                resolveScreenshotPath: ({
                  arg,
                  browserName,
                  ext,
                  platform,
                  testFileName,
                  root,
                }) => path.join(root, 'tests', '__screenshots__', testFileName, `${arg}-${browserName}-${platform}${ext}`),
              },
            },
          },
        },
      },
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
