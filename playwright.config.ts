import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: 'http://localhost:5050',
		trace: 'retain-on-failure',
	},
	projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'npm run preview',
		url: 'http://localhost:5050',
		reuseExistingServer: !process.env.CI,
	},
});
