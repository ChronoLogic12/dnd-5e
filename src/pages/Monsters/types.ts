export interface MonsterAbility {
	name: string;
	desc: string;
}

export interface Monster {
	slug: string;
	name: string;
	size: string;
	type: string;
	alignment: string;
	armor_class: number;
	hit_points: number;
	hit_dice: string;
	speed: Record<string, number | boolean | string>;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	strength_save: number | null;
	dexterity_save: number | null;
	constitution_save: number | null;
	intelligence_save: number | null;
	wisdom_save: number | null;
	charisma_save: number | null;
	skills: Record<string, number>;
	damage_vulnerabilities: string;
	damage_resistances: string;
	damage_immunities: string;
	senses: string;
	languages: string;
	challenge_rating: string;
	special_abilities: MonsterAbility[] | null;
	actions: MonsterAbility[] | null;
	reactions: MonsterAbility[] | null;
	legendary_desc: string | null;
	legendary_actions: MonsterAbility[] | null;
	document__title: string;
}
