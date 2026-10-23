import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import Feats from '..';
import { renderPage, search, resultNames, switchEdition } from '../../../test/pageHelpers';

describe('Feats page', () => {
	it('searches regardless of letter case', () => {
		renderPage(Feats);
		search('GRAPPLER');
		expect(resultNames()).toEqual(['Grappler']);
	});

	it('shows the 2024 feats and hides the 2014 books in 2024', () => {
		renderPage(Feats);
		switchEdition('2024');
		expect(screen.getByText('Results found: 17')).toBeInTheDocument();
		expect(resultNames()).toContain('Boon of Fate');
		expect(resultNames()).not.toContain('Lucky');
	});
});
