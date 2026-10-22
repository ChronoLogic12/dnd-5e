import { describe, it, expect } from 'vitest';

import { conditionFromV1, conditionsFromV2 } from '../conditions.ts';

describe('conditionFromV1', () => {
	it('maps a v1 condition to the internal format', () => {
		expect(
			conditionFromV1({ slug: 'prone', name: 'Prone', desc: '* Crawl only.', document__slug: 'wotc-srd' })
		).toEqual({ id: 'srd-2014/prone', name: 'Prone', desc: '* Crawl only.', source: 'srd-2014', edition: '2014' });
	});

	it('rejects unknown v1 documents', () => {
		expect(() => conditionFromV1({ slug: 'x', name: 'X', desc: '', document__slug: 'mystery' })).toThrow(
			'Unknown v1 document: mystery'
		);
	});
});

describe('conditionsFromV2', () => {
	const prone = {
		key: 'core_prone',
		name: 'Prone',
		descriptions: [
			{ desc: '2014 text', document: 'srd-2014' },
			{ desc: '2024 text', document: 'srd-2024' },
			{ desc: 'A5e text', document: 'a5e-ag' },
		],
	};

	it('creates one condition per description, skipping chosen sources', () => {
		expect(conditionsFromV2(prone, ['srd-2014'])).toEqual([
			{ id: 'srd-2024/prone', name: 'Prone', desc: '2024 text', source: 'srd-2024', edition: '2024' },
			{ id: 'a5e-ag/prone', name: 'Prone', desc: 'A5e text', source: 'a5e-ag', edition: '2014' },
		]);
	});

	it('ignores descriptions from sources the site does not know', () => {
		const record = { ...prone, descriptions: [{ desc: 'x', document: 'unknown-book' }] };
		expect(conditionsFromV2(record, [])).toEqual([]);
	});
});
