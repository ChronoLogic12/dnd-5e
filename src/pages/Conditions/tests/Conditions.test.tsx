import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import Conditions from '..';
import { renderPage, search, resultsList, resultNames } from '../../../test/pageHelpers';

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
