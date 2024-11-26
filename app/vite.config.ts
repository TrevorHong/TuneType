import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://uut1elv95e.execute-api.us-west-2.amazonaws.com/deploy',  // The actual API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Optional: rewrites '/api' to the target path
      }
    }
  },
  plugins: [react()],
})
