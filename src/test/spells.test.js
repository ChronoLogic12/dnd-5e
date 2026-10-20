import { getUniqueSpells, filterSpells, getSharedSpellNames } from '../utils/spells';

const makeSpell = (overrides) => ({
	name: 'Acid Arrow',
	level_int: 2,
	school: 'Evocation',
	dnd_class: 'Wizard',
	casting_time: '1 action',
	concentration: 'no',
	ritual: 'no',
	document__title: '5e Core Rules',
	...overrides,
});

describe('getUniqueSpells', () => {
	it('keeps spells with the same name from different documents', () => {
		const spells = getUniqueSpells(
			[makeSpell()],
			[makeSpell({ document__title: 'Level Up Advanced 5e' })]
		);
		expect(spells).toHaveLength(2);
	});

	it('removes a spell that appears twice in the same document', () => {
		expect(getUniqueSpells([makeSpell()], [makeSpell()])).toHaveLength(1);
	});

	it('corrects the sorceror typo in class lists', () => {
		const [spell] = getUniqueSpells([makeSpell({ dnd_class: 'Sorceror, Wizard' })]);
		expect(spell.dnd_class).toBe('Sorcerer, Wizard');
	});
});

describe('filterSpells', () => {
	const spells = [
		makeSpell({ name: 'Fire Bolt', level_int: 0, casting_time: '1 Action' }),
		makeSpell({ name: 'Shield', level_int: 1, casting_time: '1 reaction, which you take when hit' }),
		makeSpell({ name: 'Acid Arrow', document__title: 'Level Up Advanced 5e' }),
		makeSpell({ name: 'Acid Arrow', dnd_class: 'Sorcerer' }),
	];
	const names = (results) => results.map((spell) => `${spell.name} (${spell.document__title})`);

	it('searches regardless of letter case', () => {
		expect(names(filterSpells(spells, { search: 'FIRE bolt' }))).toEqual(['Fire Bolt (5e Core Rules)']);
	});

	it('matches casting times regardless of letter case', () => {
		const results = filterSpells(spells, { castingFilter: ['1 action'] });
		expect(results.map((spell) => spell.name)).toContain('Fire Bolt');
	});

	it('matches reactions that have a trigger', () => {
		const results = filterSpells(spells, { castingFilter: ['reaction'] });
		expect(results.map((spell) => spell.name)).toEqual(['Shield']);
	});

	it('filters by class and document', () => {
		expect(names(filterSpells(spells, { classFilter: ['sorcerer'] }))).toEqual([
			'Acid Arrow (5e Core Rules)',
		]);
		expect(names(filterSpells(spells, { documentFilter: ['Level Up Advanced 5e'] }))).toEqual([
			'Acid Arrow (Level Up Advanced 5e)',
		]);
	});

	it('sorts by level, then name, then document so same-name spells sit together', () => {
		expect(names(filterSpells(spells, {}))).toEqual([
			'Fire Bolt (5e Core Rules)',
			'Shield (5e Core Rules)',
			'Acid Arrow (5e Core Rules)',
			'Acid Arrow (Level Up Advanced 5e)',
		]);
	});
});

describe('getSharedSpellNames', () => {
	it('returns only names that appear more than once', () => {
		const shared = getSharedSpellNames([
			makeSpell(),
			makeSpell({ document__title: 'Level Up Advanced 5e' }),
			makeSpell({ name: 'Shield' }),
		]);
		expect([...shared]).toEqual(['Acid Arrow']);
	});
});
