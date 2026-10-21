import { describe, it, expect } from 'vitest';
import { getSharedNames } from '../getSharedNames';

describe('getSharedNames', () => {
	it('returns only names that appear more than once', () => {
		const shared = getSharedNames([{ name: 'Acid Arrow' }, { name: 'Acid Arrow' }, { name: 'Shield' }]);
		expect([...shared]).toEqual(['Acid Arrow']);
	});
});
