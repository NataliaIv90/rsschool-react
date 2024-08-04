import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
    },
    setupFiles: './src/tests/setup.ts',
    globals: true,
    environment: 'jsdom',
  },
});
