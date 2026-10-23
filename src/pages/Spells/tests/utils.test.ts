import { describe, it, expect } from 'vitest';
import { filterSpells, getComponentsLabel, getDisplaySource, getLevelLabel, getMaterialNote, countActiveFilters } from '../utils';
import { makeSpell } from './factories';
import type { Spell } from '../types';

describe('getLevelLabel', () => {
	it('labels cantrips and spell levels', () => {
		expect([0, 1, 2, 3, 4, 9].map(getLevelLabel)).toEqual([
			'Cantrip',
			'1st-level',
			'2nd-level',
			'3rd-level',
			'4th-level',
			'9th-level',
		]);
	});
});

describe('getComponentsLabel', () => {
	it('lists components in V, S, M order', () => {
		expect(getComponentsLabel({ verbal: true, somatic: false, material: true })).toBe('V, M');
	});
});

describe('getMaterialNote', () => {
	it('drops the full stop and lowercases the first letter', () => {
		expect(getMaterialNote('A bit of fleece.')).toBe('a bit of fleece');
		expect(getMaterialNote('a drop of acid')).toBe('a drop of acid');
	});
});

describe('countActiveFilters', () => {
	it('counts filters with a value and ignores the search text', () => {
		expect(countActiveFilters({ search: 'fire', levelFilter: ['1'], classFilter: [], ritualFilter: true, concentrationFilter: false })).toBe(2);
	});
});

describe('getDisplaySource', () => {
	it('shows hand-made Player’s Handbook spells as Core', () => {
		expect(getDisplaySource('phb-2014')).toBe('srd-2014');
		expect(getDisplaySource('a5e-ag')).toBe('a5e-ag');
	});
});

describe('filterSpells', () => {
	const spells = [
		makeSpell({ id: 'srd-2014/fire-bolt', name: 'Fire Bolt', level: 0, castingTime: '1 Action' }),
		makeSpell({ id: 'srd-2014/shield', name: 'Shield', level: 1, castingTime: '1 reaction, which you take when hit' }),
		makeSpell({ id: 'a5e-ag/acid-arrow', source: 'a5e-ag' }),
		makeSpell({ id: 'phb-2014/acid-arrow', source: 'phb-2014', classes: ['Sorcerer'], concentration: true }),
	];
	const ids = (results: Spell[]) => results.map((spell) => spell.id);

	it('searches regardless of letter case', () => {
		expect(ids(filterSpells(spells, { search: 'FIRE bolt' }))).toEqual(['srd-2014/fire-bolt']);
	});

	it('matches casting times regardless of letter case', () => {
		expect(ids(filterSpells(spells, { castingFilter: ['1 action'] }))).toContain('srd-2014/fire-bolt');
	});

	it('matches reactions that have a trigger', () => {
		expect(ids(filterSpells(spells, { castingFilter: ['reaction'] }))).toEqual(['srd-2014/shield']);
	});

	it('filters by class, regardless of letter case', () => {
		expect(ids(filterSpells(spells, { classFilter: ['sorcerer'] }))).toEqual(['phb-2014/acid-arrow']);
	});

	it('filters by document, counting hand-made Player’s Handbook spells as Core', () => {
		expect(ids(filterSpells(spells, { documentFilter: ['a5e-ag'] }))).toEqual(['a5e-ag/acid-arrow']);
		expect(ids(filterSpells(spells, { documentFilter: ['srd-2014'] }))).toContain('phb-2014/acid-arrow');
	});

	it('filters by concentration', () => {
		expect(ids(filterSpells(spells, { concentrationFilter: true }))).toEqual(['phb-2014/acid-arrow']);
	});

	it('sorts by level, then name, then document so same-name spells sit together', () => {
		expect(ids(filterSpells(spells, {}))).toEqual([
			'srd-2014/fire-bolt',
			'srd-2014/shield',
			'phb-2014/acid-arrow',
			'a5e-ag/acid-arrow',
		]);
	});
});
