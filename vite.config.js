import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['myterraceapp.com', 'www.myterraceapp.com'],
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.myterraceapp.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})