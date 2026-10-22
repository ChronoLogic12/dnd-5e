import type { Edition, SourceKey } from '../../data/sources';

export type Ability = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface MonsterAbility {
	name: string;
	desc: string;
}

export interface Monster {
	id: string;
	name: string;
	source: SourceKey;
	edition: Edition;
	size: string;
	type: string;
	alignment: string;
	armorClass: number;
	hitPoints: number;
	hitDice: string;
	speed: Record<string, number | boolean | string>;
	abilities: Record<Ability, number>;
	savingThrows: Record<Ability, number | null>;
	skills: Record<string, number>;
	damageVulnerabilities: string;
	damageResistances: string;
	damageImmunities: string;
	senses: string;
	languages: string;
	challengeRating: string;
	specialAbilities: MonsterAbility[];
	actions: MonsterAbility[];
	bonusActions: MonsterAbility[];
	reactions: MonsterAbility[];
	legendaryDescription: string;
	legendaryActions: MonsterAbility[];
}
