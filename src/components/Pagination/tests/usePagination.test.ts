import { describe, it, expect } from 'vitest';

import { getPageItems } from '../usePagination';

describe('getPageItems', () => {
	it('shows every page when there are seven or fewer', () => {
		expect(getPageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});

	it('collapses the end when near the start', () => {
		expect(getPageItems(2, 13)).toEqual([1, 2, 3, 4, 5, 'gap', 13]);
	});

	it('collapses both sides in the middle', () => {
		expect(getPageItems(7, 13)).toEqual([1, 'gap', 6, 7, 8, 'gap', 13]);
	});

	it('collapses the start when near the end', () => {
		expect(getPageItems(12, 13)).toEqual([1, 'gap', 9, 10, 11, 12, 13]);
	});
});
