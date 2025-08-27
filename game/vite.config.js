// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// export default defineConfig({
//   plugins: [react()],
//   base: './',               // importante: path pubblico finale
//   server: {
//     port: 5173,
//     headers: {                  // dev: MIME corretto per WASM (Rapier)
//       'Cross-Origin-Opener-Policy': 'same-origin',
//       'Cross-Origin-Embedder-Policy': 'require-corp'
//     }
//   },
//   build: {
//     target: 'es2020',
//     sourcemap: false
//   },
//   assetsInclude: ['**/*.wasm', '**/*.ktx2', '**/*.hdr']
// })

// vite.config.js (ALLA ROOT, multipagina: index.html + game/neural.html)
// game/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',           // asset relativi in dist/
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: 'index.html', // entry HTML in root/
        neural: 'neural.html',   // entry HTML in game/
      },
    },
  },
})

