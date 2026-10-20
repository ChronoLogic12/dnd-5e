export const prepareMonsters = (monsters) =>
	monsters
		.map((monster) => ({ monster, searchText: JSON.stringify(monster).toLowerCase() }))
		.sort(
			(a, b) =>
				a.monster.name.localeCompare(b.monster.name) ||
				a.monster.document__title.localeCompare(b.monster.document__title)
		);

export const filterMonsters = (preparedMonsters, { search = '', challengeRatingFilter = '' }) => {
	const lowerCaseSearch = search.toLowerCase();
	return preparedMonsters
		.filter(
			({ monster, searchText }) =>
				(lowerCaseSearch ? searchText.includes(lowerCaseSearch) : true) &&
				(challengeRatingFilter ? monster.challenge_rating === challengeRatingFilter : true)
		)
		.map(({ monster }) => monster);
};
