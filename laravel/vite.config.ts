import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    // build: {
    //   minify: 'terser',
    //   terserOptions: {
    //     compress: {
    //       drop_console: true,
    //     },
    //     output: {
    //       comments: false,
    //     },
    //   },
    //   cssCodeSplit: true,
    // },
    server: {
        host: "172.20.0.3",  // Required for Docker
        port: 5173,       // INTERNAL container port
        strictPort: true,
        hmr: {
            host: "172.20.0.3", // Your host machine
            port: 5200,        // EXTERNAL mapped port
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss()
    ]
});
