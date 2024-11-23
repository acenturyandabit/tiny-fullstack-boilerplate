import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
    plugins:[
        tsconfigPaths()
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:$NEW_PORT',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: '../backend/static',
        emptyOutDir: true,
    },
});