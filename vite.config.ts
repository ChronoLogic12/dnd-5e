import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'build',
	},
	server: {
		port: 8080,
		open: true,
	},
	preview: {
		port: 5050,
		strictPort: true,
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
		setupFiles: ['src/test/setup.ts'],
	},
});
