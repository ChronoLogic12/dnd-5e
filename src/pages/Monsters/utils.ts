import { sources } from '../../data/sources';
import type { Monster } from './types';

export interface PreparedMonster {
	monster: Monster;
	searchText: string;
}

export interface MonsterFilters {
	search?: string;
	challengeRatingFilter?: string;
}

const getSearchText = (monster: Monster) =>
	[
		monster.name,
		monster.size,
		monster.type,
		monster.alignment,
		monster.languages,
		monster.senses,
		monster.damageVulnerabilities,
		monster.damageResistances,
		monster.damageImmunities,
		monster.legendaryDescription,
		Object.keys(monster.speed).join(' '),
		Object.keys(monster.skills).join(' '),
		...[
			...monster.specialAbilities,
			...monster.actions,
			...monster.reactions,
			...monster.legendaryActions,
		].flatMap(({ name, desc }) => [name, desc]),
		sources[monster.source].title,
	]
		.join(' ')
		.toLowerCase();

export const prepareMonsters = (monsters: Monster[]): PreparedMonster[] =>
	monsters
		.map((monster) => ({ monster, searchText: getSearchText(monster) }))
		.sort(
			(a, b) =>
				a.monster.name.localeCompare(b.monster.name) ||
				sources[a.monster.source].title.localeCompare(sources[b.monster.source].title)
		);

export const filterMonsters = (
	preparedMonsters: PreparedMonster[],
	{ search = '', challengeRatingFilter = '' }: MonsterFilters
): Monster[] => {
	const lowerCaseSearch = search.toLowerCase();
	return preparedMonsters
		.filter(
			({ monster, searchText }) =>
				(lowerCaseSearch ? searchText.includes(lowerCaseSearch) : true) &&
				(challengeRatingFilter ? monster.challengeRating === challengeRatingFilter : true)
		)
		.map(({ monster }) => monster);
};
