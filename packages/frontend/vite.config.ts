import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import isolation from "./.vite/plugins/isolation"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    isolation(),
  ],
  optimizeDeps: {
    exclude: [
      'wasm-vips'
    ]
  }
})
