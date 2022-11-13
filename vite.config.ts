import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { terser } from 'rollup-plugin-terser';

import Package from './package.json';

const vitestOptions = {
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './tests/dom/setupTests.ts',
		exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
	},
};

export default defineConfig(({ command, mode }) => {
	if (mode === 'ci') {
		return {
			...vitestOptions,
			define: {
				__DEV__: true,
			},
			plugins: [react()],
		};
	}
	return {
		...vitestOptions,
		define: {
			__DEV__: command !== 'build',
		},
		build: {
			minify: 'terser',
			lib: {
				name: Package.name,
				entry: 'src/index.ts',
				formats: ['es', 'umd'],
				fileName: (format) => {
					if (format === 'es') {
						return 'index.js';
					}
					return `index.${format}.min.js`;
				},
			},
			rollupOptions: {
				external: ['react'],
				input: 'src/index.ts',
				output: {
					globals: {
						react: 'React',
					},
				},
				plugins: [
					terser({
						compress: {
							defaults: true,
							drop_console: false,
						},
					}),
				],
			},
		},
		plugins: [
			react({ jsxRuntime: 'classic' }),
			dts({
				include: ['src/exportedTypes.ts'],
			}),
		],
	};
});
