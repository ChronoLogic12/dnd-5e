import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Spells, Conditions, Feats } from '../pages';

const renderPage = (Page: React.ComponentType) =>
	render(
		<MemoryRouter>
			<Page />
		</MemoryRouter>
	);

const search = (text: string) => fireEvent.change(screen.getByLabelText('Search:'), { target: { value: text } });

const selectOptions = (id: string, values: string[]) => {
	const select = document.getElementById(id) as HTMLSelectElement;
	for (const option of select.options) {
		option.selected = values.includes(option.value);
	}
	fireEvent.change(select);
};

const resultsList = () => {
	const list = document.querySelector<HTMLElement>('main ul.collapsible.no-autoinit');
	if (!list) {
		throw new Error('Results list not found');
	}
	return list;
};

const resultNames = () =>
	[...resultsList().querySelectorAll(':scope > li h6')].map((heading) => heading.textContent);

describe('Spells page', () => {
	it('shows only Core spells by default', () => {
		renderPage(Spells);
		expect(screen.getByText('Results found: 369')).toBeInTheDocument();
	});

	it('shows a source pill only on spells that share a name in the results', () => {
		renderPage(Spells);
		search('acid splash');
		expect(resultNames()).toEqual(['Acid Splash']);
		expect(within(resultsList()).queryByText('Core')).not.toBeInTheDocument();

		selectOptions('document', ['5e Core Rules', 'Level Up Advanced 5e']);
		expect(resultNames()).toEqual(['Acid Splash', 'Acid Splash']);
		expect(within(resultsList()).getByText('Core')).toBeInTheDocument();
		expect(within(resultsList()).getByText('A5e')).toBeInTheDocument();
	});
});

describe('Conditions page', () => {
	it('searches regardless of letter case', () => {
		renderPage(Conditions);
		search('PRONE');
		expect(resultNames()).toContain('Prone');
	});

	it('sets up a new results list after a search with no results', () => {
		renderPage(Conditions);
		search('zzzz');
		expect(screen.getByText('No results found')).toBeInTheDocument();
		search('');
		expect((resultsList() as HTMLElement & { M_Collapsible?: unknown }).M_Collapsible).toBeDefined();
	});
});

describe('Feats page', () => {
	it('searches regardless of letter case', () => {
		renderPage(Feats);
		search('GRAPPLER');
		expect(resultNames()).toEqual(['Grappler']);
	});
});
