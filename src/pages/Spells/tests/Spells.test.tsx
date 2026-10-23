import { describe, it, expect } from 'vitest';
import { screen, within, fireEvent } from '@testing-library/react';

import Spells from '..';
import { renderPage, search, openFilters, chooseOptions, resultsList, resultNames, switchEdition } from '../../../test/pageHelpers';

describe('Spells page', () => {
	it('shows only Core spells by default', () => {
		renderPage(Spells);
		openFilters();
		expect(screen.getByText('Results found: 368')).toBeInTheDocument();
		expect(screen.getByText('1 active')).toBeInTheDocument();
	});

	it('shows a source pill only on spells that share a name in the results', async () => {
		renderPage(Spells);
		openFilters();
		search('acid splash');
		expect(resultNames()).toEqual(['Acid Splash']);
		expect(within(resultsList()).queryByText('Core')).not.toBeInTheDocument();

		await chooseOptions('Source', ['Level Up Advanced 5e']);
		expect(resultNames()).toEqual(['Acid Splash', 'Acid Splash']);
		expect(within(resultsList()).getByText('Core')).toBeInTheDocument();
		expect(within(resultsList()).getByText('A5e')).toBeInTheDocument();
	});

	it('filters by level and class together', async () => {
		renderPage(Spells);
		openFilters();
		await chooseOptions('Level', ['Cantrip']);
		await chooseOptions('Class', ['Wizard']);
		expect(resultNames()).toContain('Fire Bolt');
		expect(resultNames()).not.toContain('Sacred Flame');
		expect(screen.getByText('3 active')).toBeInTheDocument();
	});

	it('shows only ritual spells when the ritual pill is pressed', () => {
		renderPage(Spells);
		openFilters();
		fireEvent.click(screen.getByRole('button', { name: 'Ritual' }));
		expect(resultNames()).toContain('Detect Magic');
		expect(resultNames()).not.toContain('Fire Bolt');
	});

	it('swaps the core spells and keeps third-party sources in 2024', async () => {
		renderPage(Spells);
		openFilters();
		switchEdition('2024');
		expect(screen.getByText('Results found: 339')).toBeInTheDocument();
		expect(screen.getByRole('combobox', { name: 'Source' })).toHaveTextContent('5e Core Rules (2024)');

		await chooseOptions('Source', ['Level Up Advanced 5e']);
		search('acid splash');
		expect(within(resultsList()).getByText('Core 2024')).toBeInTheDocument();
		expect(within(resultsList()).getByText('A5e')).toBeInTheDocument();
	});

	it('keeps the core source selected alongside other books when the edition changes', async () => {
		renderPage(Spells);
		openFilters();
		await chooseOptions('Source', ['Level Up Advanced 5e']);
		expect(screen.getByText('Results found: 739')).toBeInTheDocument();
		switchEdition('2024');
		expect(screen.getByText('Results found: 710')).toBeInTheDocument();
		switchEdition('2014');
		expect(screen.getByText('Results found: 739')).toBeInTheDocument();
	});
});
