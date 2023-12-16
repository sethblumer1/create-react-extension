// vite.config.main.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'react/[name].js',
        chunkFileNames: 'react/[name].js',
        assetFileNames: 'react/[name].[ext]',
      },
    },
  },
});
