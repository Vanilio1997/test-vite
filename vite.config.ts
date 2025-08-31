import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const base = mode === 'production' ? '/test-vite/' : '/'

	return {
		plugins: [
			react(),

			svgr({
				svgrOptions: {
					dimensions: true,
					ref: true,
					memo: true,
					svgo: true,
				},
				include: '**/*.svg?react',
			}),
		],
		base,
		build: {
			outDir: 'dist',
			assetsDir: 'assets',
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'index.html'),
				},
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	}
})
