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
        host: '0.0.0.0',      // Listen on all network interfaces
        port: 5179,            // Match your exposed port
        strictPort: true,      // Fail if port is already in use
        hmr: {
            host: 'localhost',   // Use localhost for hot module reload
            port: 5179,
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
