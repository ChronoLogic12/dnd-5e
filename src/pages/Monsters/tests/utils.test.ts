import { describe, it, expect } from 'vitest';

import { prepareMonsters, filterMonsters } from '../utils';
import { makeMonster } from './factories';
import type { Monster } from '../types';

const monsters = prepareMonsters([
	makeMonster({ document__title: 'Tome of Beasts' }),
	makeMonster({ name: 'Aboleth', challenge_rating: '10', languages: 'Deep Speech', actions: [] }),
	makeMonster(),
]);
const names = (results: Monster[]) => results.map((monster) => `${monster.name} (${monster.document__title})`);

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
