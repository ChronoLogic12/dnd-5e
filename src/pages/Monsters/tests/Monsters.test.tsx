import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import Monsters from '..';
import {
	renderPage,
	search,
	openFilters,
	chooseOptions,
	resultsList,
	resultNames,
	switchEdition,
	currentQuery,
} from '../../../test/pageHelpers';

describe('Monsters page', { timeout: 20000 }, () => {
	const waitForMonsters = () => screen.findByText('Results found: 3207', {}, { timeout: 15000 });

	const pills = () => [...resultsList().querySelectorAll('span[title]')].map((pill) => pill.textContent);

	it('loads every monster from the local data file', async () => {
		renderPage(Monsters);
		expect(await waitForMonsters()).toBeInTheDocument();
		expect(resultNames()).toHaveLength(50);
	});

	it('filters by search and challenge rating together', async () => {
		renderPage(Monsters);
		await waitForMonsters();
		search('tarrasque');
		openFilters();
		await chooseOptions('Challenge rating', ['30']);
		const names = resultNames();
		expect(names).toContain('Tarrasque');
		expect(screen.getByText(`Results found: ${names.length}`)).toBeInTheDocument();
	});

	it('shows a source pill only on monsters that share a name in the results', async () => {
		renderPage(Monsters);
		await waitForMonsters();

		search('aboleth');
		expect(resultNames().filter((name) => name === 'Aboleth')).toHaveLength(3);
		expect(pills()).toEqual(expect.arrayContaining(['Core', 'Black Flag', 'A5e']));

		search('abominable beauty');
		expect(pills()).toEqual(['ToB', 'ToB 2023']);

		search('a-mi-kuk');
		expect(pills()).toEqual([]);
	});

	it('swaps the core monsters in 2024 and keeps third-party ones', async () => {
		renderPage(Monsters);
		await waitForMonsters();
		switchEdition('2024');
		expect(screen.getByText('Results found: 3216')).toBeInTheDocument();
		search('aboleth');
		expect(pills()).toEqual(expect.arrayContaining(['Core 2024', 'Black Flag', 'A5e']));
		expect(pills()).not.toContain('Core');
	});

	it('reads the search and challenge rating from the URL', async () => {
		renderPage(Monsters, '/monsters?q=tarrasque&cr=30');
		await screen.findByText(/^Results found: [1-9]/, {}, { timeout: 15000 });
		expect(resultNames()).toContain('Tarrasque');
		openFilters();
		expect(screen.getByRole('combobox', { name: 'Challenge rating' })).toHaveTextContent('30');
	});

	it('keeps a linked monster open once the data has loaded', async () => {
		renderPage(Monsters, '/monsters?open=srd-2014/aboleth');
		await waitForMonsters();
		await waitFor(() =>
			expect(screen.getAllByRole('button', { name: /^Aboleth/ })[0]).toHaveAttribute('aria-expanded', 'true')
		);
		expect(currentQuery().get('open')).toBe('srd-2014/aboleth');
	});
});
