// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path' // Добавьте этот импорт

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.ts',
		include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
		],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'), // Теперь resolve определен
		},
	},
})
