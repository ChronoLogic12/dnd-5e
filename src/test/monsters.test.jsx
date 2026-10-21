import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Monsters } from '../pages';
import { prepareMonsters, filterMonsters } from '../utils/monsters';

const monsters = prepareMonsters([
	{ name: 'Goblin', challenge_rating: '1/4', languages: 'Common, Goblin', document__title: 'Tome of Beasts' },
	{ name: 'Aboleth', challenge_rating: '10', languages: 'Deep Speech', document__title: '5e Core Rules' },
	{ name: 'Goblin', challenge_rating: '1/4', languages: 'Common, Goblin', document__title: '5e Core Rules' },
]);
const names = (results) => results.map((monster) => `${monster.name} (${monster.document__title})`);

describe('filterMonsters', () => {
	it('sorts by name, then document', () => {
		expect(names(filterMonsters(monsters, {}))).toEqual([
			'Aboleth (5e Core Rules)',
			'Goblin (5e Core Rules)',
			'Goblin (Tome of Beasts)',
		]);
	});

	it('searches regardless of letter case', () => {
		expect(names(filterMonsters(monsters, { search: 'DEEP speech' }))).toEqual(['Aboleth (5e Core Rules)']);
	});

	it('filters by challenge rating', () => {
		expect(filterMonsters(monsters, { challengeRatingFilter: '1/4' })).toHaveLength(2);
		expect(filterMonsters(monsters, { challengeRatingFilter: '30' })).toHaveLength(0);
	});
});

describe('Monsters page', () => {
	const renderPage = () =>
		render(
			<MemoryRouter>
				<Monsters />
			</MemoryRouter>
		);

	it('loads every monster from the local data file', async () => {
		renderPage();
		expect(await screen.findByText('Results found: 3207')).toBeInTheDocument();
		expect(document.querySelectorAll('main ul.collapsible.no-autoinit > li')).toHaveLength(50);
	});

	it('filters by search and challenge rating together', async () => {
		renderPage();
		await screen.findByText('Results found: 3207');
		fireEvent.change(screen.getByLabelText('Search:'), { target: { value: 'tarrasque' } });
		fireEvent.change(document.getElementById('cr'), { target: { value: '30' } });
		const names = [...document.querySelectorAll('main ul.collapsible.no-autoinit > li h6')].map(
			(heading) => heading.textContent
		);
		expect(names).toContain('Tarrasque');
		expect(screen.getByText(`Results found: ${names.length}`)).toBeInTheDocument();
	});

	it('shows a source pill only on monsters that share a name in the results', async () => {
		renderPage();
		await screen.findByText('Results found: 3207');
		const search = (text) =>
			fireEvent.change(screen.getByLabelText('Search:'), { target: { value: text } });
		const pills = () =>
			[...document.querySelectorAll('main ul.collapsible.no-autoinit span[title]')].map(
				(pill) => pill.textContent
			);

		search('aboleth');
		const abolethCards = [...document.querySelectorAll('main ul.collapsible.no-autoinit > li')].filter(
			(card) => card.querySelector('h6').textContent === 'Aboleth'
		);
		expect(abolethCards).toHaveLength(3);
		expect(pills()).toEqual(expect.arrayContaining(['Core', 'Black Flag', 'A5e']));

		search('abominable beauty');
		expect(pills()).toEqual(['ToB', 'ToB 2023']);

		search('a-mi-kuk');
		expect(pills()).toEqual([]);
	});
});
