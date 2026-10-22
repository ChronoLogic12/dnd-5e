import React, { useEffect, useState } from 'react';
import materialize from 'materialize-css';

import { Banner, Nav, CollapsibleList } from '../../components';
import MonsterCard from './components/MonsterCard';
import MonstersSearch from './components/MonstersSearch';
import MonstersPagination from './components/MonstersPagination';
import { prepareMonsters, filterMonsters } from './utils';
import type { PreparedMonster } from './utils';
import { getSharedNames } from '../../utils/getSharedNames';
import type { SourceKey } from '../../data/sources';
import type { Monster } from './types';

const SHOWN_SOURCES: SourceKey[] = [
	'srd-2014',
	'a5e-mm',
	'bfrd',
	'ccdx',
	'tdcs',
	'tob',
	'tob-2023',
	'tob2',
	'tob3',
];

const MONSTERS_PER_PAGE = 50;

export default function Monsters() {
	const [monsters, setMonsters] = useState<PreparedMonster[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [challengeRatingFilter, setChallengeRatingFilter] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		import('../../data/monsters.json')
			.then(({ default: data }) =>
				setMonsters(
					prepareMonsters((data as Monster[]).filter((monster) => SHOWN_SOURCES.includes(monster.source)))
				)
			)
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
		const sharedMonsterNames = getSharedNames(searchResults);
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
								<MonsterCard
									key={monster.id}
									monster={monster}
									showSource={sharedMonsterNames.has(monster.name)}
								/>
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
}
