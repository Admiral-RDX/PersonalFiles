import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [imagetools(), visualizer()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }
                },
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
            },
            format: {
                comments: false,
            },
            mangle: true,
        },
    },
});
