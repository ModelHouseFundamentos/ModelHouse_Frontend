import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['ModelHouseOfficialLogo.png',
      'banner.png','src/assets/area_card.png', 'src/assets/room_card.png', 'src/identity-and-access-management']
    }
  }
})
