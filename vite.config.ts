import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import path from 'path';
import pkg from './package.json';
import vue from '@vitejs/plugin-vue';
import Markdown, {Mode} from 'vite-plugin-markdown';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

export default defineConfig({
    plugins: [
        vue(),
        vueI18n({
            // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
            include: path.join(__dirname, '/locales/**'),
        }),
        Markdown({
            mode: [Mode.HTML, Mode.VUE]
        }),
        electron({
            main: {
                entry: 'electron/main/index.ts',
                vite: {
                    build: {
                        outDir: 'dist/electron/main',
                    },
                },
            },
            preload: {
                input: {
                    // Multiple preload can be configured here
                    index: path.join(__dirname, 'electron/preload/index.ts'),
                },
                vite: {
                    build: {
                        // For Debug
                        sourcemap: false,
                        outDir: 'dist/electron/preload',
                    },
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // Detect other extensions to SFC imports
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
        host: pkg.env.VITE_DEV_SERVER_HOSTNAME,
        port: pkg.env.VITE_DEV_SERVER_PORT,
    },
})