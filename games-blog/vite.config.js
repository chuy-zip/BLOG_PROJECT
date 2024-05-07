// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@controller': '/src/controller',
      '@style': '/src/style',
      '@pages': '/src/pages',
      '@backend': '/src/backend',
      '@components': '/src/components',
      '@hooks': '/src/hooks'
    }
  },
  base: '/proyecto/221007/dist/' 
});
