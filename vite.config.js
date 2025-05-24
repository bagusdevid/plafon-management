import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        tailwindcss(),
        react(),
        nodePolyfills()
    ],
    resolve: {
        alias: {
            "@": "/resources/js"
        }
    }
});
