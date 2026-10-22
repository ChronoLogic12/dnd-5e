import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Monsters from '..';

describe('Monsters page', { timeout: 20000 }, () => {
	const renderPage = () =>
		render(
			<MemoryRouter>
				<Monsters />
			</MemoryRouter>
		);

	const waitForMonsters = () =>
		screen.findByText('Results found: 3207', {}, { timeout: 15000 });

	it('loads every monster from the local data file', async () => {
		renderPage();
		expect(await waitForMonsters()).toBeInTheDocument();
		expect(document.querySelectorAll('main ul.collapsible.no-autoinit > li')).toHaveLength(50);
	});

	it('filters by search and challenge rating together', async () => {
		renderPage();
		await waitForMonsters();
		fireEvent.change(screen.getByLabelText('Search:'), { target: { value: 'tarrasque' } });
		fireEvent.change(document.getElementById('cr') as HTMLSelectElement, { target: { value: '30' } });
		const names = [...document.querySelectorAll('main ul.collapsible.no-autoinit > li h6')].map(
			(heading) => heading.textContent
		);
		expect(names).toContain('Tarrasque');
		expect(screen.getByText(`Results found: ${names.length}`)).toBeInTheDocument();
	});

	it('shows a source pill only on monsters that share a name in the results', async () => {
		renderPage();
		await waitForMonsters();
		const search = (text: string) =>
			fireEvent.change(screen.getByLabelText('Search:'), { target: { value: text } });
		const pills = () =>
			[...document.querySelectorAll('main ul.collapsible.no-autoinit span[title]')].map(
				(pill) => pill.textContent
			);

		search('aboleth');
		const abolethCards = [...document.querySelectorAll('main ul.collapsible.no-autoinit > li')].filter(
			(card) => card.querySelector('h6')?.textContent === 'Aboleth'
		);
		expect(abolethCards).toHaveLength(3);
		expect(pills()).toEqual(expect.arrayContaining(['Core', 'Black Flag', 'A5e']));

		search('abominable beauty');
		expect(pills()).toEqual(['ToB', 'ToB 2023']);

		search('a-mi-kuk');
		expect(pills()).toEqual([]);
	});
});
