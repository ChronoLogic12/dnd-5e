import { describe, it, expect } from 'vitest';

import { coreSource, isShownInEdition } from '../sources';

describe('isShownInEdition', () => {
	it('shows official books only in their own edition', () => {
		expect(isShownInEdition('srd-2014', '2014')).toBe(true);
		expect(isShownInEdition('srd-2014', '2024')).toBe(false);
		expect(isShownInEdition('xge', '2024')).toBe(false);
		expect(isShownInEdition('srd-2024', '2024')).toBe(true);
		expect(isShownInEdition('srd-2024', '2014')).toBe(false);
	});

	it('shows third-party books in both editions', () => {
		expect(isShownInEdition('a5e-ag', '2014')).toBe(true);
		expect(isShownInEdition('a5e-ag', '2024')).toBe(true);
	});
});

describe('coreSource', () => {
	it('picks the core rules for each edition', () => {
		expect(coreSource('2014')).toBe('srd-2014');
		expect(coreSource('2024')).toBe('srd-2024');
	});
});
