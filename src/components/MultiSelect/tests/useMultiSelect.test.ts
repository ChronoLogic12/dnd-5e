import { describe, it, expect } from 'vitest';

import { getSummary } from '../useMultiSelect';

const options = [
	{ value: '0', label: 'Cantrip' },
	{ value: '1', label: '1st' },
	{ value: '2', label: '2nd' },
	{ value: '3', label: '3rd' },
];

describe('getSummary', () => {
	it('shows the placeholder when nothing is selected', () => {
		expect(getSummary(options, [], 'Any')).toBe('Any');
	});

	it('lists up to two selections in option order', () => {
		expect(getSummary(options, ['2', '0'], 'Any')).toBe('Cantrip, 2nd');
	});

	it('shortens three or more selections to the first and a count', () => {
		expect(getSummary(options, ['3', '1', '2'], 'Any')).toBe('1st +2');
	});
});
