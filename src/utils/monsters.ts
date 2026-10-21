import type { Monster } from '../types/data';

export interface PreparedMonster {
	monster: Monster;
	searchText: string;
}

export interface MonsterFilters {
	search?: string;
	challengeRatingFilter?: string;
}

export const prepareMonsters = (monsters: Monster[]): PreparedMonster[] =>
	monsters
		.map((monster) => ({ monster, searchText: JSON.stringify(monster).toLowerCase() }))
		.sort(
			(a, b) =>
				a.monster.name.localeCompare(b.monster.name) ||
				a.monster.document__title.localeCompare(b.monster.document__title)
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
				(challengeRatingFilter ? monster.challenge_rating === challengeRatingFilter : true)
		)
		.map(({ monster }) => monster);
};
