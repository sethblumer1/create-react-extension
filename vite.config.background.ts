// vite.config.background.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, './background.ts'),
      name: 'Threadnote',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'background.global.js',
        extend: true,
      },
    },
  },
});
