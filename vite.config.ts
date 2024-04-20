/*
 * Generated file.
 *
 * I then:
 *  - Added tailwind & autoprefixer
 */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
