import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';

import Spells from '..';
import { renderPage, search, selectOptions, resultsList, resultNames } from '../../../test/pageHelpers';

describe('Spells page', () => {
	it('shows only Core spells by default', () => {
		renderPage(Spells);
		expect(screen.getByText('Results found: 368')).toBeInTheDocument();
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

