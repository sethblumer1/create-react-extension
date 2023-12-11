// import { defineConfig } from 'vite'
// import tsconfigPaths from 'vite-tsconfig-paths'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   build: {
//     rollupOptions: {
//       output: {
//         entryFileNames: `react/[name].js`,
//         chunkFileNames: `react/[name].js`,
//         assetFileNames: `react/[name].[ext]`,
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

const fetchVersion = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(/__APP_VERSION__/, `v${process.env.npm_package_version}`);
    }
  }
}

export default defineConfig({
  plugins: [react(), fetchVersion()],
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, 'background.ts'),
      name: 'YourExtensionName'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'background.global.js',
        extend: true,
      }
    }
  }
})
