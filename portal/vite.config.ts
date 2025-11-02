import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/cloud-genesis/' : '/';
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
  }
})
