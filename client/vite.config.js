import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from 'path' 

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['three'],
  },
  build: {
    rollupOptions: {
      external: ['vanta/dist/vanta.dots.min'],
    },
  },
  resolve: {
    alias: {
      three: 'three',
      '@': path.resolve(__dirname, './src'), 
    },
  },
})
