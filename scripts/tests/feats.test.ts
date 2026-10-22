import { describe, it, expect } from 'vitest';

import { featFromV2 } from '../feats.ts';

describe('featFromV2', () => {
	const grappler = {
		key: 'srd-2024_grappler',
		name: 'Grappler',
		desc: '',
		prerequisite: 'Level 4+',
		benefits: [{ desc: 'Punch and Grab.' }, { desc: 'Attack Advantage.' }],
		document: { key: 'srd-2024' },
	};

	it('maps a v2 feat to the internal format, listing its benefits in the description', () => {
		expect(featFromV2(grappler)).toEqual({
			id: 'srd-2024/grappler',
			name: 'Grappler',
			prerequisite: 'Level 4+',
			desc: '* Punch and Grab.\n\n* Attack Advantage.',
			source: 'srd-2024',
			edition: '2024',
		});
	});

	it('keeps the description before the benefits', () => {
		expect(featFromV2({ ...grappler, desc: 'You are strong.' })?.desc).toBe(
			'You are strong.\n\n* Punch and Grab.\n\n* Attack Advantage.'
		);
	});

	it('skips feats from sources the site does not know', () => {
		expect(featFromV2({ ...grappler, document: { key: 'unknown-book' } })).toBeNull();
	});
});
