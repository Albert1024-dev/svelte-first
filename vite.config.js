import postcss from './postcss.config.js';
import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { svelte } from '@sveltejs/vite-plugin-svelte';

dotenv.config();

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: getHtml('src'),
        },
        emptyOutDir: true
    },
    plugins: [
        svelte()
    ],
    css: {
        postcss
    },
    define: {
        'process.env': process.env
    },
    server: {
        open: '/'
    }
})

function getHtml(dir) {
    let ext = '.html';
    const files = readdirSync(resolve(__dirname, dir));
    return files
        .filter((file) => file.endsWith(ext))
        .reduce((entries, file) => {
            const name = file.replace(ext, '');
            entries[name] = resolve(__dirname, `${dir}/${file}`);
            return entries;
        }, {});
}
