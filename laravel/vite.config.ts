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
        host: "0.0.0.0",  // Required for Docker
        port: 5173,       // INTERNAL container port
        strictPort: true,
        hmr: {
            host: "localhost", // Use 'localhost' for the host (where the browser connects)
            port: 5173,        // Internal port
            clientPort: 5200,  // Tell the client to connect to the HOST's port 5200
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            host: 'localhost', // Ensure client URLs use localhost (Crucial for Laravel integration)
            refresh: true,
        }),
        react(),
        tailwindcss()
    ]
});
