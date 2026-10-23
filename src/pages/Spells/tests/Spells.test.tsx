import { describe, it, expect } from 'vitest';
import { screen, within, fireEvent } from '@testing-library/react';

import Spells from '..';
import { renderPage, search, openFilters, chooseOptions, resultsList, resultNames } from '../../../test/pageHelpers';

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
});
