import { describe, it, expect } from 'vitest';

import { prepareMonsters, filterMonsters } from '../utils';
import { makeMonster } from './factories';
import { sources } from '../../../data/sources';
import type { Monster } from '../types';

const monsters = prepareMonsters([
	makeMonster({ id: 'tob/goblin', source: 'tob' }),
	makeMonster({ id: 'srd-2014/aboleth', name: 'Aboleth', challengeRating: '10', languages: 'Deep Speech', actions: [] }),
	makeMonster(),
]);
const names = (results: Monster[]) => results.map((monster) => `${monster.name} (${sources[monster.source].title})`);

describe('filterMonsters', () => {
	it('sorts by name, then document', () => {
		expect(names(filterMonsters(monsters, {}))).toEqual([
			'Aboleth (5e Core Rules)',
			'Goblin (5e Core Rules)',
			'Goblin (Tome of Beasts)',
		]);
	});

	it('searches regardless of letter case', () => {
		expect(names(filterMonsters(monsters, { search: 'DEEP speech' }))).toEqual(['Aboleth (5e Core Rules)']);
	});

	it('filters by challenge rating', () => {
		expect(filterMonsters(monsters, { challengeRatingFilter: '1/4' })).toHaveLength(2);
		expect(filterMonsters(monsters, { challengeRatingFilter: '30' })).toHaveLength(0);
	});
});
