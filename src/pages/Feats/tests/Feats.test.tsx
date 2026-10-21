import { describe, it, expect } from 'vitest';

import Feats from '..';
import { renderPage, search, resultNames } from '../../../test/pageHelpers';

describe('Feats page', () => {
	it('searches regardless of letter case', () => {
		renderPage(Feats);
		search('GRAPPLER');
		expect(resultNames()).toEqual(['Grappler']);
	});
});
