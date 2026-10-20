import React, { useEffect, useState } from 'react';
import materialize from 'materialize-css';

import {
	MonsterCard,
	MonstersPagination,
	MonstersSearch,
	Banner,
	Nav,
	CollapsibleList,
} from '../../components';
import { prepareMonsters, filterMonsters } from '../../utils/monsters';

const MONSTERS_PER_PAGE = 50;

export default () => {
	const [monsters, setMonsters] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [challengeRatingFilter, setChallengeRatingFilter] = useState('');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		import('../../data/monsters.json')
			.then(({ default: data }) => setMonsters(prepareMonsters(data)))
			.catch(() => setError('Monsters could not be loaded. Try refreshing the page.'))
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [search, challengeRatingFilter]);

	useEffect(() => {
		materialize.AutoInit();
	}, []);

	const renderSearchResults = () => {
		const searchResults = filterMonsters(monsters, { search, challengeRatingFilter });
		const indexOfLastMonster = currentPage * MONSTERS_PER_PAGE;
		const currentMonsters = searchResults.slice(
			indexOfLastMonster - MONSTERS_PER_PAGE,
			indexOfLastMonster
		);

		return (
			<>
				<MonstersSearch
					count={searchResults.length}
					search={search}
					setSearch={setSearch}
					challengeRatingFilter={challengeRatingFilter}
					setChallengeRatingFilter={setChallengeRatingFilter}
				/>
				<hr className="rule" />
				{currentMonsters.length ? (
					<>
						<CollapsibleList>
							{currentMonsters.map((monster) => (
								<MonsterCard key={monster.slug} monster={monster} />
							))}
						</CollapsibleList>
						<MonstersPagination
							totalMonsters={searchResults.length}
							paginate={setCurrentPage}
							currentPage={currentPage}
						/>
					</>
				) : error ? (
					<p>{error}</p>
				) : isLoading ? (
					<div className="loader"></div>
				) : (
					<div>No results found</div>
				)}
			</>
		);
	};

	return (
		<>
			<Banner page="Monsters" />
			<main className="container">
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
};
