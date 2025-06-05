// frontend/vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        proxy: {
            '/api': { // Para tu API
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/uploads': { // NUEVA REGLA: Para la carpeta de imágenes subidas al backend
                target: 'http://localhost:5000', // También apunta a tu backend
                changeOrigin: true,
            }
        }
    }
});