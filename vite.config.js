import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/media': {
        target: 'https://app.explorerbees.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
