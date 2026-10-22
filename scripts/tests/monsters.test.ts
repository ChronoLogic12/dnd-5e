import { describe, it, expect } from 'vitest';

import { challengeRatingLabel, monsterFromV1, monsterFromV2, sensesLabel } from '../monsters.ts';

const v1Frog = {
	slug: 'frog',
	name: 'Frog',
	size: 'Tiny',
	type: 'Beast',
	alignment: 'unaligned',
	armor_class: 11,
	hit_points: 1,
	hit_dice: '1d4-1',
	speed: { walk: 20, swim: 20 },
	strength: 1,
	dexterity: 13,
	constitution: 8,
	intelligence: 1,
	wisdom: 8,
	charisma: 3,
	strength_save: null,
	dexterity_save: 3,
	constitution_save: null,
	intelligence_save: null,
	wisdom_save: null,
	charisma_save: null,
	skills: { perception: 1 },
	damage_vulnerabilities: '',
	damage_resistances: '',
	damage_immunities: '',
	senses: 'darkvision 30 ft., passive Perception 11',
	languages: '',
	challenge_rating: '0',
	special_abilities: [{ name: 'Amphibious', desc: 'Breathes air and water.' }],
	actions: null,
	bonus_actions: null,
	reactions: null,
	legendary_desc: null,
	legendary_actions: null,
	document__slug: 'wotc-srd',
};

describe('monsterFromV1', () => {
	it('maps a v1 monster to the internal format, turning missing lists into empty ones', () => {
		const frog = monsterFromV1(v1Frog);
		expect(frog).toMatchObject({
			id: 'srd-2014/frog',
			source: 'srd-2014',
			edition: '2014',
			armorClass: 11,
			abilities: { strength: 1, dexterity: 13 },
			savingThrows: { strength: null, dexterity: 3 },
			challengeRating: '0',
			specialAbilities: [{ name: 'Amphibious', desc: 'Breathes air and water.' }],
			actions: [],
			reactions: [],
			legendaryDescription: '',
			legendaryActions: [],
		});
	});
});

describe('challengeRatingLabel', () => {
	it('writes fractional challenge ratings as fractions', () => {
		expect([0, 0.125, 0.25, 0.5, 1, 30].map(challengeRatingLabel)).toEqual(['0', '1/8', '1/4', '1/2', '1', '30']);
	});
});

describe('sensesLabel', () => {
	it('builds the senses line in the same format as v1', () => {
		expect(sensesLabel({ darkvision_range: 120, blindsight_range: null, passive_perception: 20 })).toBe(
			'darkvision 120 ft., passive Perception 20'
		);
	});
});

describe('monsterFromV2', () => {
	const v2Aboleth = {
		key: 'srd-2024_aboleth',
		name: 'Aboleth',
		document: { key: 'srd-2024' },
		size: { name: 'Large' },
		type: { name: 'Aberration' },
		alignment: 'lawful evil',
		armor_class: 17,
		hit_points: 150,
		hit_dice: '20d10+40',
		speed: { walk: 10, swim: 40, unit: 'feet' },
		ability_scores: { strength: 21, dexterity: 9, constitution: 15, intelligence: 18, wisdom: 15, charisma: 18 },
		saving_throws: { dexterity: 3, constitution: 6 },
		skill_bonuses: { history: 12, sleight_of_hand: 1 },
		resistances_and_immunities: {
			damage_vulnerabilities_display: '',
			damage_resistances_display: 'cold',
			damage_immunities_display: '',
		},
		darkvision_range: 120,
		passive_perception: 20,
		languages: { as_string: 'Deep Speech; telepathy 120 ft.' },
		challenge_rating: 10,
		traits: [{ name: 'Amphibious', desc: 'Breathes air and water.' }],
		actions: [
			{ name: 'Tentacle', desc: 'Melee attack.', action_type: 'ACTION' },
			{ name: 'Dominate Mind', desc: 'Charms a creature.', action_type: 'BONUS_ACTION' },
			{ name: 'Lash', desc: 'Legendary lash.', action_type: 'LEGENDARY_ACTION' },
		],
	};

	it('maps a v2 creature to the internal format', () => {
		expect(monsterFromV2(v2Aboleth)).toMatchObject({
			id: 'srd-2024/aboleth',
			source: 'srd-2024',
			edition: '2024',
			size: 'Large',
			type: 'Aberration',
			speed: { walk: 10, swim: 40 },
			savingThrows: { strength: null, dexterity: 3, constitution: 6 },
			skills: { history: 12, 'sleight of hand': 1 },
			damageResistances: 'cold',
			senses: 'darkvision 120 ft., passive Perception 20',
			challengeRating: '10',
			specialAbilities: [{ name: 'Amphibious', desc: 'Breathes air and water.' }],
			actions: [{ name: 'Tentacle', desc: 'Melee attack.' }],
			bonusActions: [{ name: 'Dominate Mind', desc: 'Charms a creature.' }],
			reactions: [],
			legendaryActions: [{ name: 'Lash', desc: 'Legendary lash.' }],
		});
	});

	it('skips creatures from sources the site does not know', () => {
		expect(monsterFromV2({ ...v2Aboleth, document: { key: 'unknown-book' } })).toBeNull();
	});
});
