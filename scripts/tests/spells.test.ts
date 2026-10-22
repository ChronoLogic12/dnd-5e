import { describe, it, expect } from 'vitest';

import { spellFromV1, spellFromV2 } from '../spells.ts';

const v1Fireball = {
	slug: 'fireball',
	name: 'Fireball',
	desc: 'A bright streak flashes.',
	higher_level: 'Damage increases by 1d6.',
	range: '150 feet',
	components: 'V, S, M',
	material: 'A tiny ball of bat guano and sulfur.',
	ritual: 'no',
	duration: 'Instantaneous',
	concentration: 'no',
	casting_time: '1 action',
	level_int: 3,
	school: 'evocation',
	dnd_class: 'Sorceror, Wizard',
	document__slug: 'wotc-srd',
};

describe('spellFromV1', () => {
	it('maps a v1 spell to the internal format', () => {
		expect(spellFromV1(v1Fireball)).toEqual({
			id: 'srd-2014/fireball',
			name: 'Fireball',
			source: 'srd-2014',
			edition: '2014',
			level: 3,
			school: 'Evocation',
			classes: ['Sorcerer', 'Wizard'],
			castingTime: '1 action',
			range: '150 feet',
			components: { verbal: true, somatic: true, material: true },
			material: 'A tiny ball of bat guano and sulfur.',
			ritual: false,
			concentration: false,
			duration: 'Instantaneous',
			desc: 'A bright streak flashes.',
			higherLevel: 'Damage increases by 1d6.',
		});
	});

	it('uses a given source for hand-made spells and drops empty class names', () => {
		const spell = spellFromV1({ ...v1Fireball, dnd_class: '', document__slug: undefined }, 'phb-2014');
		expect(spell.id).toBe('phb-2014/fireball');
		expect(spell.classes).toEqual([]);
	});
});

describe('spellFromV2', () => {
	const v2Shield = {
		key: 'srd-2024_shield',
		name: 'Shield',
		document: { key: 'srd-2024' },
		school: { name: 'Abjuration' },
		classes: [{ name: 'Sorcerer' }, { name: 'Wizard' }],
		level: 1,
		casting_time: 'reaction',
		reaction_condition: 'which you take when you are hit by an attack roll',
		range_text: 'self',
		verbal: true,
		somatic: true,
		material: false,
		material_specified: '',
		ritual: false,
		concentration: false,
		duration: '1 round',
		desc: 'An imperceptible barrier appears.',
		higher_level: '',
	};

	it('maps a v2 spell to the internal format, spelling out casting time and range', () => {
		expect(spellFromV2(v2Shield)).toMatchObject({
			id: 'srd-2024/shield',
			source: 'srd-2024',
			edition: '2024',
			castingTime: '1 reaction, which you take when you are hit by an attack roll',
			range: 'Self',
			duration: '1 round',
			components: { verbal: true, somatic: true, material: false },
		});
	});

	it('formats concentration durations the same way as v1', () => {
		expect(spellFromV2({ ...v2Shield, concentration: true, duration: '1 minute' })?.duration).toBe('Up to 1 minute');
	});

	it('spells out timed casting times', () => {
		expect(spellFromV2({ ...v2Shield, casting_time: '10minutes' })?.castingTime).toBe('10 minutes');
		expect(spellFromV2({ ...v2Shield, casting_time: '1hour' })?.castingTime).toBe('1 hour');
		expect(spellFromV2({ ...v2Shield, casting_time: '1week' })?.castingTime).toBe('1 week');
	});

	it('fails loudly on casting times it does not recognise', () => {
		expect(() => spellFromV2({ ...v2Shield, casting_time: 'whenever' })).toThrow('Unknown v2 casting time');
	});

	it('skips spells from sources the site does not know', () => {
		expect(spellFromV2({ ...v2Shield, document: { key: 'unknown-book' } })).toBeNull();
	});
});
