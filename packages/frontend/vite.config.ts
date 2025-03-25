import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import isolation from "./.vite/plugins/isolation"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (chunkInfo) => {
          const noHashFiles = ["vips-es6.js", "vips.wasm"];
          if (chunkInfo.names instanceof Array && chunkInfo.names.length === 1 && noHashFiles.includes(chunkInfo.names[0])) {
            return "assets/[name].[ext]";
          }

          // if (noHashFiles.includes(chunkInfo.name)) {
          //   return "[name].js"; // Keep file unhashed
          // }

          return "assets/[name]-[hash].[ext]";
        }
      }
    }
  },
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
