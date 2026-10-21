const { test, expect } = require('@playwright/test');

let browserErrors;

test.beforeEach(({ page }) => {
	browserErrors = [];
	page.on('pageerror', (error) => browserErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') {
			browserErrors.push(message.text());
		}
	});
});

test.afterEach(() => {
	expect(browserErrors).toEqual([]);
});

const results = (page) => page.locator('main ul.collapsible.no-autoinit > li');
const resultCount = (page) => page.locator('.results');

const expectFirstCardOpens = async (page) => {
	const firstCard = results(page).first();
	await firstCard.locator('.collapsible-header').click();
	await expect(firstCard.locator('.collapsible-body')).toBeVisible();
};

const selectDocuments = (page, documents) =>
	page.locator('#document').evaluate((select, values) => {
		for (const option of select.options) {
			option.selected = values.includes(option.value);
		}
		select.dispatchEvent(new Event('change', { bubbles: true }));
	}, documents);

test('landing page links to each section', async ({ page }) => {
	await page.goto('/');
	await page.locator('a[href="/feats"]').first().click();
	await expect(page).toHaveURL(/\/feats$/);
	await expect(resultCount(page)).toContainText(/Results found: [1-9]/);
});

test('spells list, opens and shows source pills on same-name spells', async ({ page }) => {
	await page.goto('/spells');
	await expect(resultCount(page)).toContainText(/Results found: [1-9]/);
	await expectFirstCardOpens(page);

	await page.getByLabel('Search:').fill('acid splash');
	await expect(results(page)).toHaveCount(1);
	await selectDocuments(page, ['5e Core Rules', 'Level Up Advanced 5e']);
	await expect(results(page)).toHaveCount(2);
	await expect(results(page).getByText('Core', { exact: true })).toBeVisible();
	await expect(results(page).getByText('A5e', { exact: true })).toBeVisible();
});

test('conditions search and open', async ({ page }) => {
	await page.goto('/conditions');
	await page.getByLabel('Search:').fill('PRONE');
	await expect(results(page).locator('h6', { hasText: 'Prone' })).toBeVisible();
	await expectFirstCardOpens(page);
});

test('feats list and open', async ({ page }) => {
	await page.goto('/feats');
	await expect(resultCount(page)).toContainText(/Results found: [1-9]/);
	await expectFirstCardOpens(page);
});

test('monsters load from local data, search and open', async ({ page }) => {
	await page.goto('/monsters');
	await expect(resultCount(page)).toContainText(/Results found: [1-9]\d{3}/);
	await page.getByLabel('Search:').fill('aboleth');
	await expect(results(page).getByText('Black Flag', { exact: true })).toBeVisible();
	await expectFirstCardOpens(page);
});

test('cards still open after a search with no results', async ({ page }) => {
	await page.goto('/conditions');
	await page.getByLabel('Search:').fill('zzzz');
	await expect(page.getByText('No results found')).toBeVisible();
	await page.getByLabel('Search:').fill('');
	await expectFirstCardOpens(page);
});

test('about page and unknown routes render', async ({ page }) => {
	await page.goto('/about');
	await expect(page.locator('main')).toContainText('Intro');
	await page.goto('/not-a-page');
	await expect(page.getByText('Page not found')).toBeVisible();
});
