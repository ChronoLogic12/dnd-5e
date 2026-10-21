import { test, expect } from '@playwright/test';

const pages = ['/', '/spells', '/conditions', '/feats', '/monsters', '/about', '/not-a-page'];

for (const path of pages) {
	test(`${path} renders without errors`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('console', (message) => {
			if (message.type() === 'error') {
				errors.push(message.text());
			}
		});

		await page.goto(path, { waitUntil: 'networkidle' });

		await expect(page.locator('#root')).not.toBeEmpty();
		expect(errors).toEqual([]);
	});
}
