const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
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
		command: 'node scripts/serve-build.js build 5050',
		url: 'http://localhost:5050',
		reuseExistingServer: !process.env.CI,
	},
});
