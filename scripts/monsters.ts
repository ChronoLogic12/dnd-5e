import { isSourceKey, sources } from '../src/data/sources.ts';
import type { Ability, Monster, MonsterAbility } from '../src/pages/Monsters/types.ts';
import { slugFromV2Key, sourceFromV1 } from './open5e.ts';
import type { ApiRecord } from './open5e.ts';

export const ABILITIES: Ability[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const abilityList = (value: unknown): MonsterAbility[] =>
	Array.isArray(value) ? value.map(({ name, desc }) => ({ name: String(name), desc: String(desc) })) : [];

export const monsterFromV1 = (record: ApiRecord): Monster => {
	const source = sourceFromV1(record);
	return {
		id: `${source}/${record.slug}`,
		name: String(record.name),
		source,
		edition: sources[source].edition,
		size: String(record.size),
		type: String(record.type),
		alignment: String(record.alignment),
		armorClass: Number(record.armor_class),
		hitPoints: Number(record.hit_points),
		hitDice: String(record.hit_dice),
		speed: record.speed as Monster['speed'],
		abilities: Object.fromEntries(ABILITIES.map((ability) => [ability, Number(record[ability])])) as Monster['abilities'],
		savingThrows: Object.fromEntries(
			ABILITIES.map((ability) => {
				const save = record[`${ability}_save`];
				return [ability, save === null || save === undefined ? null : Number(save)];
			})
		) as Monster['savingThrows'],
		skills: record.skills as Monster['skills'],
		damageVulnerabilities: String(record.damage_vulnerabilities),
		damageResistances: String(record.damage_resistances),
		damageImmunities: String(record.damage_immunities),
		senses: String(record.senses),
		languages: String(record.languages),
		challengeRating: String(record.challenge_rating),
		specialAbilities: abilityList(record.special_abilities),
		actions: abilityList(record.actions),
		bonusActions: abilityList(record.bonus_actions),
		reactions: abilityList(record.reactions),
		legendaryDescription: String(record.legendary_desc ?? ''),
		legendaryActions: abilityList(record.legendary_actions),
	};
};

const FRACTIONS: Record<number, string> = { 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' };

export const challengeRatingLabel = (value: number) => FRACTIONS[value] ?? String(value);

const SENSES: [string, string][] = [
	['blindsight_range', 'blindsight'],
	['darkvision_range', 'darkvision'],
	['tremorsense_range', 'tremorsense'],
	['truesight_range', 'truesight'],
];

export const sensesLabel = (record: ApiRecord) =>
	[
		...SENSES.filter(([field]) => record[field]).map(([field, name]) => `${name} ${record[field]} ft.`),
		`passive Perception ${record.passive_perception}`,
	].join(', ');

interface V2Action extends MonsterAbility {
	action_type: string;
}

export const monsterFromV2 = (record: ApiRecord): Monster | null => {
	const documentKey = (record.document as { key: string }).key;
	if (!isSourceKey(documentKey)) {
		return null;
	}
	const actions = record.actions as V2Action[];
	const actionsOfType = (type: string) => abilityList(actions.filter(({ action_type }) => action_type === type));
	const resistances = record.resistances_and_immunities as Record<string, string>;
	const speed = Object.fromEntries(
		Object.entries(record.speed as Record<string, number | boolean | string>).filter(([key]) => key !== 'unit')
	);
	const savingThrows = (record.saving_throws ?? {}) as Partial<Record<Ability, number>>;
	return {
		id: `${documentKey}/${slugFromV2Key(String(record.key))}`,
		name: String(record.name),
		source: documentKey,
		edition: sources[documentKey].edition,
		size: (record.size as { name: string }).name,
		type: (record.type as { name: string }).name,
		alignment: String(record.alignment),
		armorClass: Number(record.armor_class),
		hitPoints: Number(record.hit_points),
		hitDice: String(record.hit_dice),
		speed,
		abilities: record.ability_scores as Monster['abilities'],
		savingThrows: Object.fromEntries(
			ABILITIES.map((ability) => [ability, savingThrows[ability] ?? null])
		) as Monster['savingThrows'],
		skills: Object.fromEntries(
			Object.entries((record.skill_bonuses ?? {}) as Record<string, number>).map(([skill, bonus]) => [
				skill.replaceAll('_', ' '),
				bonus,
			])
		),
		damageVulnerabilities: resistances.damage_vulnerabilities_display ?? '',
		damageResistances: resistances.damage_resistances_display ?? '',
		damageImmunities: resistances.damage_immunities_display ?? '',
		senses: sensesLabel(record),
		languages: (record.languages as { as_string: string }).as_string,
		challengeRating: challengeRatingLabel(Number(record.challenge_rating)),
		specialAbilities: abilityList(record.traits),
		actions: actionsOfType('ACTION'),
		bonusActions: actionsOfType('BONUS_ACTION'),
		reactions: actionsOfType('REACTION'),
		legendaryDescription: '',
		legendaryActions: actionsOfType('LEGENDARY_ACTION'),
	};
};
