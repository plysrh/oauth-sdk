import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['test/utils.spec.ts'],
    setupFiles: ['vitest.setup.ts'],
  },
});