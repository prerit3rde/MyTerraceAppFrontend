import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev-only: proxies same-origin /api/* calls to the real backend server-to-server,
    // so the browser never makes a cross-origin request and CORS never applies.
    // Requires VITE_API_BASE_URL to be empty in dev (see .env.development) so the
    // frontend calls relative paths like /api/auth/send-otp instead of the full URL.
    proxy: {
      '/api': {
        target: 'https://api.myterraceapp.com',
        changeOrigin: true,
      },
    },
  },
})
