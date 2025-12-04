import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    base: '',
    plugins: [react()],

    resolve: {
        alias: {
            '@atoms': path.resolve(__dirname, 'src/design-system/atoms'),
            '@molecules': path.resolve(__dirname, 'src/design-system/molecules'),
            "@projects": path.resolve(__dirname, 'src/design-system/projects'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@css': path.resolve(__dirname, 'src/css'),
            '#': path.resolve(__dirname, 'src/'),
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: ``,
            },
        }
    },
})
