import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/build3dgame/',               // importante: path pubblico finale
  server: {
    port: 5173,
    headers: {                  // dev: MIME corretto per WASM (Rapier)
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    target: 'es2020',
    sourcemap: false
  },
  assetsInclude: ['**/*.wasm', '**/*.ktx2', '**/*.hdr']
})
